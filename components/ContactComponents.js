import React, { Component } from 'react';
import { Text, ScrollView, View, Image, StyleSheet } from 'react-native';
import { Card, Icon,Button } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import {MailComposer} from 'expo';

import { Asset, Audio, Font, Video } from 'expo';


class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Contact Information',
      address: '121, Clear Water Bay Road',
      address1: 'Clear Water Bay, Kowloon',
      address2: 'HONG KONG',
      address3: 'Tel: +852 1234 5678',
      address4: 'Fax: +852 8765 4321',
      address5: 'Email:confusion@food.net'
    }
  }

  sendMail(){
    MailComposer.composeAsync({
      recipients:['maksha19@outlook.com'],
      subject:'Test 1',
      body:'Hello world'
    }).then((resultMail)=> console.log(resultMail.status))
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
            <Button
            title='Send Email'
            buttonStyle={{backgroundColor:'#512DA8'}}
            icon={<Icon name='envelope-o' type='font-awesome' color='white' />}
            onPress={this.sendMail}
            />
          </Card>
        </Animatable.View>

        <Video
          source={{ uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' }}
          rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode="cover"
          shouldPlay          
          style={{ width: 300, height: 300,justifyContent:'center', marginLeft:30}}
        />
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