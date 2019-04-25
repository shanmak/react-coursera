import React, { Component } from 'react';
import { Text, ScrollView, View,StyleSheet, Image} from 'react-native';
import { Card, Icon,Avatar } from 'react-native-elements';
import { DISHES } from '../shared/dishes';
import { PROMOTIONS } from '../shared/promotions';
import { LEADERS } from '../shared/leaders';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';

const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      comments: state.comments,
      promotions: state.promotions,
      leaders: state.leaders
    }
  }



function RenderItem(props){

    const item= props.item;
     if(item != null){

        return(
            <Card containerStyle={{borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,
                borderTopRightRadius: 10,
                borderTopLeftRadius: 10,
                overflow: 'hidden'}}
            title={<View style={{flexDirection:'row',flex:1,justifyContent:'space-between'}}>                    
                    <View style={{flexDirection:'row'}}><Avatar containerStyle={style.iconStyle}  rounded icon={{ name: 'home' }} />
                    <Text style={style.titleStyle}>{item.name}</Text></View>
                    <View><Icon name={props.favorite ? 'heart' : 'heart-o'} type='font-awesome' iconStyle={style.cardStyle} 
                    onPress={() =>props.onPress()} /></View></View>}             
            titleStyle={{marginTop:20}}
            featuredTitle={item.name}
            featuredSubtitle={item.designation}
            image={{uri:baseUrl+item.image}}>
          
         
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
            leaders:LEADERS,
            favorite:false
        }
        this.markFavorite = this.markFavorite.bind(this)
    }

    static navigationOptions = {
        title: 'Home'
    };

    markFavorite = (prevState)=>{
        this.setState( prevState=>{return  {favorite : prevState.favorite ? false : true } })
    }

    render() {
        return(
        <ScrollView>
            <RenderItem item={this.props.dishes.dishes.filter((dish)=> dish.featured)[0]} 
               onPress={() => this.markFavorite()}
               favorite={this.state.favorite} />
            <RenderItem item={this.props.promotions.promotions.filter((promo)=> promo.featured)[0]} 
            onPress={() => this.markFavorite()} 
            favorite={this.state.favorite} />
            <RenderItem item={this.props.leaders.leaders.filter((leader)=> leader.featured)[0]}
            onPress={() => this.markFavorite()} 
            favorite={this.state.favorite}  />
        </ScrollView>
        );
    }
}

const style = StyleSheet.create({
    iconStyle:{
        alignContent:'flex-start',
        marginTop:5
        ,marginLeft:5

    },
    cardStyle:{
        alignSelf:'flex-end',
        marginRight:10,
        marginTop:10,
        marginBottom:10,
        fontWeight: 'bold'
    },
    titleStyle:{
        alignSelf:'flex-start',
        marginLeft:7,
        marginTop:10,
        marginBottom:10

    }
})
export default connect(mapStateToProps)(Home);