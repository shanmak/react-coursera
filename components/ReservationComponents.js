import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet, Picker, Switch, Button,Modal,Alert} from 'react-native';
import { Card } from 'react-native-elements';
import DatePicker from 'react-native-datepicker';
import * as Animatable from 'react-native-animatable';

class Reservation extends Component{

    constructor(props) {
        super(props);

        this.state = {
            guests: 1,
            smoking: false,
            date: '',
            showModal:false
        }
    }

    static navigationOptions = {
        title: 'Reserve Table',
    };

    toggleModel(){
        this.setState({showModal: !this.state.showModal})
    }

    resetForm(){
        this.setState({
            guests: 2,
            smoking: false,
            date: ''
        });
    }

    handleReservation() {
        console.log(JSON.stringify(this.state));
        this.toggleModel();
    }
 
    bookingReservation(){

        Alert.alert(
            'Your Reservation OK ?',
            'Number of Guest '+this.state.guests+'\n'+'Smoking '+ this.state.smoking +'\n' + 'Date '+this.state.date,
            [
                {text:'Cancel',style:'cancel', onPress: () => console.log('Not Rerserved')},
                {text:'OK',onPress:()=>this.handleReservation()}
        ]
        )
    }

    render(){
        return(
     <Animatable.View animation='zoomIn' duration={2000}>
                <View style={styles.formRow} > 
                <Text style={styles.formLabel}>Number Of Guests</Text>
                <Picker
                style={styles.formItem}
                selectedValue={this.state.guests}
                onValueChange={(itemValue,itemIndex)=> this.setState({guests:itemValue})}
                >
                <Picker.Item label='1' value='1'/>
                <Picker.Item label='2' value='2'/>
                <Picker.Item label='3' value='3'/>
                <Picker.Item label='4' value='4'/>
                <Picker.Item label='5' value='5'/>
                <Picker.Item label='6' value='6'/>
                </Picker>
                </View>

                <View style={styles.formRow} >
                <Text style={styles.formLabel}>Smoking/Non-Smoking</Text>
                <Switch 
                style={styles.formItem}
                value={this.state.smoking}
                trackColor={'#512DA8'}
                onValueChange={(value)=> this.setState({smoking:value})}
                ></Switch>
                 </View>

                 <View style={styles.formRow}>
                <Text style={styles.formLabel}>Date and Time</Text>
                <DatePicker 
                    style={{flex:2,marginRight:20}}
                    date={this.state.date}
                    format='YYYY-MM-DD'
                    mode='date'
                    placeholder='Select date and time'
                    minDate='2019-01-01'
                    confirmBtnText='Confirm'
                    cancelBtnText='Cancel'
                    customStyles={{  dateIcon: {
                        position: 'absolute',
                        left: 0,
                        top: 4,
                        marginLeft: 0
                    },
                    dateInput: {
                        marginLeft: 36
                    }
                }}
                onDateChange={(date)=> this.setState({date:date})}
                />
                </View>
                <View style={styles.formRow}>
                <Button
                    onPress={() => this.bookingReservation()}
                    title="Reserve"
                    color="#512DA8"
                    accessibilityLabel="Learn more about this purple button"
                    />
                </View>


                <Modal
                    animationType={'slide'}
                    transparent={false}
                    visible={this.state.showModal}
                    onDismiss={()=> {this.toggleModel();this.resetForm()}}
                    onRequestClose={()=> {this.toggleModel();this.resetForm()}}
               >
               <View style={styles.modal}>
               <Text style={styles.modalTitle}>Your Reservation</Text>
                <Text style={styles.modalText}>Number of Guests: {this.state.guests}</Text>
                <Text style={styles.modalText}>Smoking: {this.state.smoking ? 'YES' : 'NO'}</Text>                
                <Text style={styles.modalText}>Date: {this.state.date}</Text> 
                <Button onPress={()=> {this.toggleModel();this.resetForm()}} title='Close' color='#512DA8' />                               
               </View>
               </Modal>
               </Animatable.View>
          
        );
    }

}


const styles = StyleSheet.create({
    formRow: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      flexDirection: 'row',
      margin: 20
    },
    formLabel: {
        fontSize: 18,
        flex: 2
    },
    formItem: {
        flex: 1
    },
    modal:{
        justifyContent:'center',
        margin:20
    },modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        backgroundColor: '#512DA8',
        textAlign: 'center',
        color: 'white',
        marginBottom: 20
    },
    modalText: {
        fontSize: 18,
        margin: 10
    }
});

export default Reservation;