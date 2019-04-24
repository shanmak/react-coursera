import React, { Component } from 'react';
import { Text, ScrollView, View } from 'react-native';
import { Card, ListItem } from 'react-native-elements';
import {LEADERS} from '../shared/leaders';
import { FlatList } from 'react-native-gesture-handler';


function History(props){
    const history = props.history;
    if(history != null){

        return(
            <Card title={history.title}> 
            
            <Text>{history.line1}</Text>
            <Text>{history.line2}</Text>
            </Card>
        )


    }
    else{
        return(<View>
            <Text style={{color:'red'}}>"Check"</Text>
        </View>);
    }
}

function Leadership(props){

    const LeadershipList = props.leadersList;


  const renderItem= ({item,index})=>{
        return(
        <ListItem
        title={item.name}
        subtitle={item.description}
        hideChevron={true}
        leftAvatar={{source: require('../assets/alberto.png')}}
        
        />)
    }

    if(LeadershipList != null){

        return(

            <FlatList
            keyExtractor={item => item.id.toString()}
            data={LeadershipList}
            renderItem={renderItem}

            /> 

         
        )
    }else{
        return(<View>
            <Text style={{color:'red'}}>"Check"</Text>
        </View>);

    }
}

class About extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            history:{
                title:'Our History',
                line1:'Started in 2010, Ristorante con Fusion quickly established itself as a culinary icon par excellence in Hong Kong. With its unique brand of world fusion cuisine that can be found nowhere else, it enjoys patronage from the A-list clientele in Hong Kong.  Featuring four of the best three-star Michelin chefs in the world, you never know what will arrive on your plate the next time you visit us.',
                line2:'The restaurant traces its humble beginnings to The Frying Pan, a successful chain started by our CEO, Mr. Peter Pan, that featured for the first time the world\'s best cuisines in a pan.'

            },
            Leaders:{
                title:'Corporate Leadership',
                leaders:LEADERS
            }
         }
    }


    render() { 
        return (<View>
            <ScrollView>
            <History history={this.state.history} />  
            <Card title={this.state.Leaders.title}>
            <Leadership leadersList={this.state.Leaders.leaders}></Leadership>
            </Card>   
            </ScrollView>
            </View>);
    }
}
 
export default About;