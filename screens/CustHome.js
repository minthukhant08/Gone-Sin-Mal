import React, { Component } from "react";
import Icon from 'react-native-vector-icons/Ionicons'
import Home from "../components/customer/Home";
import Favourite from "../components/customer/Favourite";
import GoneSin from "../components/customer/GoneSin";
import Notification from "../components/customer/Notification";
import { createBottomTabNavigator,Header, createStackNavigator,View } from 'react-navigation';
import Userprofile from '../components/customer/Userprofile';
import Restaurantdetail from '../components/customer/Restaurantdetail';
import Login from "./Login";

const User = createStackNavigator({
  AppHome : {
    screen:Home,
  },
  Userprofile:{
    screen:Userprofile
  },
  Restaurantdetail:{
    screen:Restaurantdetail
  },

}, {
   headerMode: 'none'
});
export default class CustHome extends Component{
  static navigationOptions = {
    header:null
  }
  render(){
    return(
      <Buttontab/>
    )
  }
}

const Buttontab = createBottomTabNavigator({
  Home: {
    screen: User,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <Icon name="ios-search" color={tintColor} size={24} />
      )
    }
  },
  Favourite: {
    screen: Favourite,
    tabBarLabel: '',
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <Icon name="md-heart" color={tintColor} size={24} />
      )
    }
  },
  GoneSin: {
    screen: GoneSin,
    tabBarLabel: '',
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <Icon name="ios-restaurant" color={tintColor} size={24} />
      )
    }
  },
  Noti: {
    screen: Notification,
    tabBarLabel: '',
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <Icon name="ios-notifications" color={tintColor} size={24} />
      )
    }
  }

}, {//router config
    initialRouteName: 'Home',
    order: ['Home','Favourite','GoneSin', 'Noti'],
    //navigation for complete tab navigator
    navigationOptions: {
      tabBarVisible: true
    },
    tabBarOptions: {
      activeTintColor: 'red',
      inactiveTintColor: 'grey',
    }
  });
