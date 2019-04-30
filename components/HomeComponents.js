import React, { Component } from 'react';
import { Text, ScrollView, View, StyleSheet, Image, Animated, Easing } from 'react-native';
import { Card, Icon, Avatar } from 'react-native-elements';
import { DISHES } from '../shared/dishes';
import { PROMOTIONS } from '../shared/promotions';
import { LEADERS } from '../shared/leaders';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite } from '../redux/ActionCreators'

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        promotions: state.promotions,
        leaders: state.leaders,
        favorites: state.favorites
    }
}

const mapDispatchToProps = (dispatch) => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId))
})



function RenderItem(props) {

    const item = props.item;
    if (item != null) {

        return (
            <Card containerStyle={{
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,
                borderTopRightRadius: 10,
                borderTopLeftRadius: 10,
                overflow: 'hidden'
            }}
                title={<View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row' }}><Avatar containerStyle={style.iconStyle} rounded icon={{ name: 'home' }} />
                        <Text style={style.titleStyle}>{item.name}</Text></View>
                    <View><Icon name={props.favorite ? 'heart' : 'heart-o'} type='font-awesome' iconStyle={style.cardStyle}
                        onPress={() => props.onPress(item.id)} /></View></View>}

                titleStyle={{ marginTop: 20 }}
                featuredTitle={item.name}
                featuredSubtitle={item.designation}
                image={{ uri: baseUrl + item.image }}>


                <Text style={{ margin: 10 }}>
                    {item.description}</Text>
            </Card>
        )

    } else {
        return (
            <View></View>
        );
    }

}

class Home extends Component {

    constructor(props) {
        super(props);
        this.AnimatedValue = new Animated.Value(0);
        this.state = {
            dishes: DISHES,
            promotions: PROMOTIONS,
            leaders: LEADERS,
            favorite1: 0,
            favorite2: 1,
            favorite3: 3
        }

       
        this.markFavorite = this.markFavorite.bind(this)
    }

    static navigationOptions = {
        title: 'Home'
    };

    componentDidMount() {
        this.animate();
    }

    animate() {
        this.AnimatedValue.setValue(0);
        Animated.timing(
            this.AnimatedValue,
            { toValue: 8, duration: 8000, easing: Easing.linear }
        ).start(() => this.animate());

    }



    markFavorite = (dishId) => {
        // this.setState( prevState=>{return  {favorite : prevState.favorite ? false : true } })

        this.props.postFavorite(dishId)
        console.log('id..' + dishId);
        console.log('id..' + this.props.favorites);
    }

    render() {

        const xPos1 = this.AnimatedValue.interpolate({
            inputRange: [0, 1, 3, 5, 8],
            outputRange: [1200, 600, 0, -600, -1200]
        })

        const xPos2 = this.AnimatedValue.interpolate({
            inputRange: [0, 2, 4, 6, 8],
            outputRange: [1200, 600, 0, -600, -1200]
        })

        const xPos3 = this.AnimatedValue.interpolate({
            inputRange: [0, 3, 5, 7, 8],
            outputRange: [1200, 600, 0, -600, -1200]
        })


        return (
            <ScrollView>
            <View>
                {/* <Animated.View style={{ width: '100%', transform: [{ translateX: xPos1 }] }}> */}
                    <RenderItem item={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
                        onPress={(id) => this.markFavorite(id)}
                        favorite={this.props.favorites.some(el => el === this.state.favorite1)} />

                {/* </Animated.View> */}
                {/* <Animated.View style={{ width: '100%', transform: [{ translateX: xPos2 }] }}> */}
                    <RenderItem item={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
                        onPress={(id) => this.markFavorite(id)}
                        favorite={this.props.favorites.some(el => el === this.state.favorite2)} />
                {/* </Animated.View> */}
                {/* <Animated.View style={{ width: '100%', transform: [{ translateX: xPos3 }] }}> */}
                    <RenderItem item={this.props.leaders.leaders.filter((leader) => leader.featured)[0]}
                        onPress={(id) => this.markFavorite(id)}
                        favorite={this.props.favorites.some(el => el === this.state.favorite3)} />
                {/* </Animated.View> */}
            </View>
            </ScrollView>
        );
    }
}

const style = StyleSheet.create({
    iconStyle: {
        alignContent: 'flex-start',
        marginTop: 5
        , marginLeft: 5

    },
    cardStyle: {
        alignSelf: 'flex-end',
        marginRight: 10,
        marginTop: 10,
        marginBottom: 10,
        fontWeight: 'bold'
    },
    titleStyle: {
        alignSelf: 'flex-start',
        marginLeft: 7,
        marginTop: 10,
        marginBottom: 10

    }
})
export default connect(mapStateToProps, mapDispatchToProps)(Home);