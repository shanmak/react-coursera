import React from 'react';
import { Text, View, ScrollView, FlatList, Modal, Alert, PanResponder,Share,StyleSheet } from 'react-native';
import { Card, Icon, Rating, AirbnbRating, Input, Button } from 'react-native-elements';
import { DISHES } from '../shared/dishes';
import { COMMENTS } from '../shared/comments';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postComment } from '../redux/ActionCreators'
import * as Animatable from 'react-native-animatable';

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments
    }
}  

const mapDispatchToProps = (dispatch) => ({
    postComment: (comment) => dispatch(postComment(comment))
})


function RenderDish(props) {

    const dish = props.dish;

    handleViewRef = (ref) => { this.view = ref };

    const recognizeDrag = ({ MoveX, MoveY, dx, dy }) => {

        if(dx < -200){
            return 'LTR';
        }
        else if(dx > 200){
            return 'RTL';
        }else{
            return false;
        }
        
    }

    const panResponder = PanResponder.create({

        onStartShouldSetPanResponder: (e, gestureState) => {
            return true;
        },
        onPanResponderEnd: (e, gestureState) => {

            switch (recognizeDrag(gestureState)) {
                case 'LTR':
                    Alert.alert(
                        'Alert to Favorires ?',
                        'Are you sure you wish to add' + dish.name + 'to favorite?',
                        [{ text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                        { text: 'OK', onPress: () => console.log('Added to favorite') },
                        ], { cancelable: false }
                    );
                    break;
                case 'RTL':
                         props.onPress(); break;                        
                default:
                        return true;

            }
        },
        onPanResponderGrant: () => {
            this.view.pulse(3000).then(endState => console.log(endState.finished ? 'finished' : 'Cancelled'));
        }
    })

    const shareDish = (title, message, url) => {
        Share.share({
            title: title,
            message: title + ': ' + message + ' ' + url,
            url: url
        },{
            dialogTitle: 'Share ' + title
        })
    }



    if (dish != null) {
        return (
            <Animatable.View animation="fadeInDown" duration={2000} delay={1000} {...panResponder.panHandlers} ref={this.handleViewRef} >
                <Card
                    featuredTitle={dish.name}
                    image={{ uri: baseUrl + dish.image, cache: 'reload' }}>
                    <Text style={{ margin: 10 }}>
                        {dish.description}
                    </Text>
                    <Icon raised reverse name='pencil' type='font-awesome' color='#5dade2' onPress={() => props.onPress()} />
                    <Icon
                            raised
                            reverse
                            name='share'
                            type='font-awesome'
                            color='#51D2A8'
                            onPress={() => shareDish(dish.name, dish.description, baseUrl + dish.image)} />
                </Card>
            </Animatable.View>
        );
    }
    else {
        return (<View></View>);
    }
}



function RenderComments(props) {

    const comments = props.comments;

    const renderCommentItem = ({ item, index }) => {

        return (
            <View key={index} style={{ margin: 10 }}>
                <Text style={{ fontSize: 14 }}>{item.comment}</Text>
                <Text style={{ fontSize: 12 }}>{item.rating} Stars</Text>
                <Rating readonly imageSize={25} startingValue={item.rating}></Rating>
                <Text style={{ fontSize: 12 }}>{'-- ' + item.author + ', ' + item.date} </Text>
            </View>
        );
    };

    return (
        <Animatable.View animation="fadeInUp" duration={2000} delay={1000}>
            <Card title='Comments' >
                <FlatList
                    data={comments}
                    renderItem={renderCommentItem}
                    keyExtractor={item => item.id.toString()}
                />
            </Card>
        </Animatable.View>
    );
}


class Dishdetail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            modalShow: false,
            id: 20,
            dishId: 0,
            Rating: 0,
            Author: '',
            Comment: '',
            Date: ''

        }
        this.submitForm = this.submitForm.bind(this);
    }

    static navigationOptions = {
        title: 'Dish Details'
    };

    toggleModel() {
        this.setState({ modalShow: !this.state.modalShow })
    }

    setDishesIDandDate(dishId) {
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        this.setState({ dishId: dishId, Date: date })
        setTimeout(() => {
            console.log('dishID ' + this.state.dishId)
            console.log('Date ' + this.state.Date)
        }, 1000)


    }

    ratingCompleted(rating) {


        this.setState({ Rating: rating })

        console.log("Rating is: " + typeof (rating) + rating)
    }

    setRating(valueRating) {

    }

    resetForm() {
        this.setState({
            Author: '',
            Comment: '',
            Rating: 0
        })
        // this.resetForm();
        console.log('Form resting')
    }

    submitForm(dishId) {



        setTimeout(() => {
            console.log('ID ' + this.state.id)
            console.log('dishID ' + this.state.dishId)
            console.log('Rating ' + this.state.Rating)
            console.log('Author ' + this.state.Author)
            console.log('Comment ' + this.state.Comment)
            console.log('Date ' + this.state.Date)
        }, 2000)


        var comment = {
            id: this.state.id,
            dishId: this.state.dishId,
            rating: this.state.Rating,
            comment: this.state.Comment,
            author: this.state.Author,
            date: this.state.Date
        }

        setTimeout(() => {
            this.props.postComment(comment);
        }, 3000)


        setTimeout(() => {
            this.toggleModel()
        }, 5000)



    }

    onAuthorFoucous(name) {
        this.setState({ Author: name })
        console.log('testing Form auhtor ' + name)
    }

    onCommentFoucous(comment) {
        this.setState({ Comment: comment })
        console.log('testing Form commet ' + comment)
    }



    render() {
        const dishId = this.props.navigation.getParam('dishId', '');



        return (
            <ScrollView>
                <RenderDish dish={this.props.dishes.dishes[+dishId]}
                    onPress={() => this.toggleModel()}
                />
                <RenderComments comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId)} />

                <Modal visible={this.state.modalShow} onRequestClose={() => this.toggleModel()} onShow={() => this.setDishesIDandDate(dishId)}>

                    <Rating
                        type='star'
                        ratingCount={5}
                        imageSize={30}
                        showRating
                        fractions={1}
                        startingValue={3}
                        onFinishRating={(ratingCount) => this.ratingCompleted(ratingCount)}
                    />
                    <View style={{ flexDirection: 'row' }}>
                        <Input leftIcon={<Icon name='user-o' type='font-awesome' ></Icon>} onChangeText={(nameAuthor) => this.onAuthorFoucous(nameAuthor)} placeholder='Author'></Input>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Input leftIcon={<Icon containerStyle={{ marginRight: 5 }} name='comment-o' type='font-awesome' ></Icon>} onChangeText={(commetsData) => this.onCommentFoucous(commetsData)} placeholder='Comment'></Input>
                    </View>
                    <View>
                        <Button buttonStyle={{ marginBottom: 20, backgroundColor: '#303f9f', marginLeft: 10, marginRight: 10 }} onPress={() => { this.submitForm() }} title='Submit' color='#303f9f' />
                        <Button buttonStyle={{ backgroundColor: '#9c9a96', marginLeft: 10, marginRight: 10 }} onPress={() => { this.toggleModel(); this.resetForm() }} title='Close' color='#9c9a96' />
                    </View>
                </Modal>

            </ScrollView>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail);