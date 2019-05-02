import React,{Component} from 'react';
import {DISHES} from '../shared/dishes';
import { View,Platform,Text,Image,StyleSheet,ScrollView} from 'react-native';
import Menu from './MenuComponents';
import Dishdetail from './DishdetailComponents';
import Home from './HomeComponents';
import { Icon } from 'react-native-elements';
import Contact from './ContactComponents';
import About from './AboutComponent';
import Reservation from './ReservationComponents'
import Favorites from './FavoriteComponent';
import Login from './LoginComponent';
import {createStackNavigator,createAppContainer,createDrawerNavigator,DrawerItems,SafeAreaView}from 'react-navigation';

import { connect } from 'react-redux';
import { fetchDishes, fetchComments, fetchPromos, fetchLeaders } from '../redux/ActionCreators';

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}

const mapDispatchToProps = dispatch => ({
  fetchDishes: () => dispatch(fetchDishes()),
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos()),
  fetchLeaders: () => dispatch(fetchLeaders()),
})

const MainNavigation = new createStackNavigator({

    Menu : {screen:Menu,
        navigationOptions: ({ navigation }) => ({
            headerLeft: <Icon name="menu" size={30} iconStyle={styles.menuItem}
            color= 'white'
            onPress={ () => navigation.toggleDrawer() } />,
            headerTitle:<View ><Text style={{color:'white',alignContent:"center"} }>MENU</Text></View>,                   
          })
    },
    Dishdetail:{screen:Dishdetail}
},{

    initialRouteName:'Menu',
    defaultNavigationOptions:{
        headerStyle:{
            backgroundColor:'#800080',
            borderBottomColor:'#4B0082'
        }
        ,headerTintColor:'white',
        headerTitleStyle:{
            color:'#800080'
        }

    }
});

const HomeNavigation= new createStackNavigator({

    Home : {screen:Home}

},{
    defaultNavigationOptions:({navigation})=>({
        headerStyle:{
            backgroundColor:'#800080',
            borderBottomColor:'#4B0082'
        }
        ,headerTintColor:'white',
        headerTitleStyle:{
            color:'#800080'
        },
        headerTitle:<View ><Text style={{color:'white',alignContent:"center"} }>Home</Text></View>,
        headerLeft: <Icon name="menu" size={30} iconStyle={styles.menuItem}
            color= 'white'
            onPress={ () => navigation.toggleDrawer() } 
            />
           

                    
    })
});

const ContactNavigation= new createStackNavigator({

    Contact : {screen:Contact}

},{
    defaultNavigationOptions:({navigation})=> ({
        title:'Contact Us',
        headerStyle:{
            backgroundColor:'#800080',
            borderBottomColor:'#4B0082'
        }
        ,
        headerTintColor:'#FFFFFF',
        headerTitle:<View ><Text style={{color:'white',alignContent:"center"} }>Contact</Text></View>,
        headerTitleStyle:{
            color:'#800080'
        },headerLeft: <Icon name="menu" size={30} iconStyle={styles.menuItem}
        color= 'white'
        onPress={ () => navigation.toggleDrawer() } />   
        
    })
});

const AboutNavigation= new createStackNavigator({

    About : {screen:About}

},{
    defaultNavigationOptions:({navigation})=>({
        title:'About Us',
        headerStyle:{
            backgroundColor:'#800080',
            borderBottomColor:'#4B0082'
        }
        ,headerTintColor:'#FFFFFF',
        headerTitle:<View ><Text style={{color:'white',alignContent:"center"} }>About</Text></View>,
        headerTitleStyle:{
            color:'#800080'
        },headerLeft: <Icon name="menu" size={30} iconStyle={styles.menuItem}
        color= 'white'
        onPress={ () => navigation.toggleDrawer() } />   
    })
});


const ReservationNavigation= new createStackNavigator({

    Reservation : {screen:Reservation}

},{
    defaultNavigationOptions:({navigation})=> ({
        title:'Reservation',
        headerStyle:{
            backgroundColor:'#800080',
            borderBottomColor:'#4B0082'
        }
        ,
        headerTintColor:'#FFFFFF',
        headerTitle:<View ><Text style={{color:'white',alignContent:"center"} }>Reserve Table</Text></View>,
        headerTitleStyle:{
            color:'#800080'
        },headerLeft: <Icon name="menu" size={30} iconStyle={styles.menuItem}
        color= 'white'
        onPress={ () => navigation.toggleDrawer() } />   
        
    })
});

const FavoritesNavigation= new createStackNavigator({

    Favorites : {screen:Favorites}

},{
    defaultNavigationOptions:({navigation})=> ({
        title:'Favorites',
        headerStyle:{
            backgroundColor:'#800080',
            borderBottomColor:'#4B0082'
        }
        ,
        headerTintColor:'#FFFFFF',
        headerTitle:<View ><Text style={{color:'white',alignContent:"center"} }>Favorites</Text></View>,
        headerTitleStyle:{
            color:'#800080'
        },headerLeft: <Icon name="menu" size={30} iconStyle={styles.menuItem}
        color= 'white'
        onPress={ () => navigation.toggleDrawer() } />   
        
    })
});

const LoginNavigation= new createStackNavigator({

    Login : {screen:Login}

},{
    defaultNavigationOptions:({navigation})=> ({
        title:'Favorites',
        headerStyle:{
            backgroundColor:'#800080',
            borderBottomColor:'#4B0082'
        }
        ,
        headerTintColor:'#FFFFFF',
        headerTitle:<View ><Text style={{color:'white',alignContent:"center"} }>Favorites</Text></View>,
        headerTitleStyle:{
            color:'#800080'
        },headerLeft: <Icon name="menu" size={30} iconStyle={styles.menuItem}
        color= 'white'
        onPress={ () => navigation.toggleDrawer() } />   
        
    })
});


const CustomDrawerContentComponent = (props) => (
    <ScrollView>
      <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
        <View style={styles.drawerHeader}>
          <View style={{flex:1}}>
          <Image source={require('../assets/logo.png')} style={styles.drawerImage} />
          </View>
          <View style={{flex: 2}}>
            <Text style={styles.drawerHeaderText}>Ristorante Con Fusion</Text>
          </View>
        </View>
        <DrawerItems {...props} />
      </SafeAreaView>
    </ScrollView>
  );

const MainDrawNavigation= new createDrawerNavigator({
    
    Login: {
        screen:LoginNavigation,
        navigationOptions:{
            title:'LOGIN',
            drawerLable:'LOGIN',
            drawerIcon: ({ tintColor, focused }) => (
                <Icon
                  name='sign-in'
                  type='font-awesome'            
                  size={24}
                  color={tintColor}
                />
              )
                     
        }
    },
    Home: {
        screen:HomeNavigation,
        navigationOptions:{
            title:'Home',
            drawerLable:'Home',
            drawerIcon: ({ tintColor, focused }) => (
                <Icon
                  name='home'
                  type='font-awesome'            
                  size={24}
                  color={tintColor}
                />
              )
                     
        }
    },
    Menu:{
        screen:MainNavigation,
        navigationOptions:{
            title:'Menu',
            drawerLable:'Menu',
            drawerIcon:({tintColor})=>(
                <Icon name='list'
                type='font-awesome'
                size={24}
                color={tintColor} />
            )          
        
        }
    },
    Contact:{
        screen:ContactNavigation,
        navigationOptions:{
            title:'Contact Us',
            drawerLable:'Contact Us',
            drawerIcon:({tintColor})=>(
                <Icon name='address-card'
                type='font-awesome'
                size={24}
                color={tintColor} />
            )         
        }
    },
    About:{
        screen:AboutNavigation,
        navigationOptions:{
            title:'About Us',
            drawerLable:'About Us',
            drawerIcon:({tintColor})=>(
                <Icon name='info-circle'
                type='font-awesome'
                size={24}
                color={tintColor} />
            )          
            
            
        }   
    },
    Reservation:{
        screen:ReservationNavigation,
        navigationOptions:{
            title:'Reserve Table',
            drawerLable:'Reserve Table',
            drawerIcon:({tintColor})=>(
                <Icon name='cutlery'
                type='font-awesome'
                size={24}
                color={tintColor} />
            )          
            
            
        }   
    },

    Favorites:{
        screen:FavoritesNavigation,
        navigationOptions:{
            title:'My Favorites',
            drawerLable:'My Favorites',
            drawerIcon:({tintColor})=>(
                <Icon name='heart'
                type='font-awesome'
                size={24}
                color={tintColor} />
            )          
            
            
        }   
    }
},{ 
    initialRouteName:'Home',
    drawerBackgroundColor:'#FFFFFF',
    contentComponent:CustomDrawerContentComponent
    
    
})

const AppContainer = createAppContainer(MainDrawNavigation);


class Main extends Component {

    componentDidMount() {
        this.props.fetchDishes();
        this.props.fetchComments();
        this.props.fetchPromos();
        this.props.fetchLeaders();
      }

render(){
 
    return(
        <View style={{flex:1,paddingTop:Platform.OS==='ios' ? 0: Expo.Constants.StatusBarHeight }}>
            <AppContainer/>
     </View>
    );
}

}


const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    drawerHeader: {
      backgroundColor: '#512DA8',
      height: 140,
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      flexDirection: 'row'
    },
    drawerHeaderText: {
      color: 'white',
      fontSize: 20,
      fontWeight: 'bold'
    },
    drawerImage: {
      margin: 10,
      width: 80,
      height: 60
    },menuItem:{
        marginLeft:15
    }
  });

export default connect(mapStateToProps, mapDispatchToProps)(Main);
