import React, { Component } from 'react';
import { Text, ScrollView, View,Image,StyleSheet } from 'react-native';
import { Card,Icon } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';

class Contact extends Component {
    constructor(props) {
        super(props);
        this.state = { 
        title: 'Contact Information',
        address:'121, Clear Water Bay Road',
        address1:'Clear Water Bay, Kowloon', 
        address2:'HONG KONG',
        address3 :'Tel: +852 1234 5678',
        address4 :'Fax: +852 8765 4321',
        address5:'Email:confusion@food.net'
         }
    }

    render() { 
        return ( 
            <View>
              <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
            <Card title={this.state.title}
            >
            <Text>{this.state.address}</Text>
            <Text>{this.state.address1}</Text>
            <Text>{this.state.address2}</Text>
            <Text>{this.state.address3}</Text>
            <Text>{this.state.address4}</Text>
            <Text>{this.state.address5}</Text>
            </Card>
            </Animatable.View>
            </View>
         );
    }
}
 
export default Contact;


const styles = StyleSheet.create({

    icon: {
  
      width: 24,
  
      height: 24,
  
    },
  
  });