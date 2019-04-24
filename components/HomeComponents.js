import React, { Component } from 'react';
import { Text, ScrollView, View,StyleSheet, Image} from 'react-native';
import { Card, Icon,Avatar } from 'react-native-elements';
import { DISHES } from '../shared/dishes';
import { PROMOTIONS } from '../shared/promotions';
import { LEADERS } from '../shared/leaders';



function RenderItem(props){

    const item= props.item;
    const ima= item.image;
    if(item != null){

        return(
            <Card containerStyle={{borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,
                borderTopRightRadius: 10,
                borderTopLeftRadius: 10,
                overflow: 'hidden'}}
            title={<View style={{flexDirection:'row',flex:1,justifyContent:'space-between'}}>
                    <Avatar avatarStyle={style.avatarStyle} iconStyle={style.iconStyle} rounded icon={{ name: 'home' }} />
                    <Text style={style.titleStyle}>{item.name}</Text>
                    <View><Icon name='heart' type='font-awesome' iconStyle={style.cardStyle}/></View></View>}             
            titleStyle={{marginTop:20}}
            featuredTitle={item.name}
            featuredSubtitle={item.designation}
            image={require('../assets/Pizza01.jpg')}
            imageStyle={{marginTop:0}}>
         
             <Text style={{margin: 10}}>
            {item.description}</Text>
            </Card>
        )

    }else{
        return(
            <View></View>
        );
    }

}

class Home extends Component {

    constructor(props){
        super(props);
        this.state={
            dishes:DISHES,
            promotions:PROMOTIONS,
            leaders:LEADERS
        }
    }

    static navigationOptions = {
        title: 'Home'
    };

    render() {
        return(
        <ScrollView>
            <RenderItem item={this.state.dishes.filter((dish)=> dish.featured)[0]} />
            <RenderItem item={this.state.promotions.filter((promo)=> promo.featured)[0]} />
            <RenderItem item={this.state.leaders.filter((leader)=> leader.featured)[0]} />
        </ScrollView>
        );
    }
}

const style = StyleSheet.create({
    iconStyle:{
        alignContent:'flex-start',marginTop:10
    },avatarStyle:{alignContent:'flex-start'}
    ,cardStyle:{
        alignSelf:'flex-end',
        marginRight:10,
        marginTop:10,
        marginBottom:10,
        fontWeight: 'bold'
    },
    titleStyle:{
        alignSelf:'flex-start',
        marginLeft:20,
        marginTop:10,
        marginBottom:10

    }
})
export default Home;