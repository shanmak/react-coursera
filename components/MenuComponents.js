import React from 'react';
import { View, FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';
import {DISHES} from '../shared/dishes';

import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import * as Animatable from 'react-native-animatable';

const mapStateToProps = state => {
    return {
      dishes: state.dishes
    }
  }

class Menu extends React.Component {

    constructor(props){
        super(props);
        this.state={
            dishes:DISHES
        };
    }

    static navigationOptions = {
        title: 'Menu'
    };

    render(){
    const renderMenuItem = ({item, index}) => {

        return (
            <Animatable.View animation="fadeInRightBig" duration={2000}>  
                <ListItem
                    key={index}
                    title={item.name}
                    subtitle={item.description}
                    hideChevron={true}
                    onPress={()=> navigate('Dishdetail',{ dishId: item.id })}
                    leftAvatar={{source:{uri:baseUrl+item.image}}}

                  />
                </Animatable.View>
        );
    };

    const { navigate } = this.props.navigation;
    return (
            <FlatList 
                data={this.props.dishes.dishes}
                renderItem={renderMenuItem}
                keyExtractor={item => item.id.toString()}
                />
    );
    }
}


export default connect(mapStateToProps)(Menu);
