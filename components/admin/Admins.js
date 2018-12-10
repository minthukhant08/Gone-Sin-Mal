import React, { Component } from 'react';
import {View, Image, StyleSheet, ImageBackground, ScrollView, Switch, Modal, AsyncStorage, TextInput } from "react-native";
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Container,List, Left, Header, ListItem, H1,H2,H3, H4,Title,Right, Item, Input, Icon, Thumbnail, Content, Button, Footer, FooterTab, Badge, Card, CardItem, Body, Text } from 'native-base';

export default class Admins extends Component {
  state = {
    value:'',
    Users:[],
  };
  handleChange(e) {

       this.setState({
         value: e.nativeEvent.text,
       });
       console.log(this.state.value);
     }

  handleSearch(){
    return fetch(global.HostURL + '/api/User/search?name=' + this.state.value)
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson);
      this.setState({
         Users: responseJson,
       }, function(){

       });
    })
    .catch((error) => {
      console.error(error);
    });
  }

  Userbar(id,type){
    if(type=="admin"){
      return <Button rounded small onPress={this.Demote.bind(this,id)}><Icon name='ios-remove-circle' /></Button>

    }else{
      return <Button rounded small onPress={this.Promote.bind(this,id)}><Icon name='ios-person-add' /></Button>
    }
  }

  Promote(id){
    try {
      fetch(global.HostURL + '/api/user/promote', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({
          User_id : id,
        }),
      }).then((response) => response.json())
        .then((responsejson)=>{
          this.handleSearch();
        });
    } catch (e) {
      console.log('promote failed');
    }
  }

  Demote(id){
    try {
      fetch(global.HostURL + '/api/user/demote', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({
          User_id : id,
        }),
      }).then((response) => response.json())
        .then((responsejson)=>{
          this.handleSearch();
        });
    } catch (e) {
      console.log('demote failed');
    }
  }
  render() {
    return (
      <Container>
      <Header style = {{height: 50,backgroundColor: '#a3080c', color: 'orange', paddingBottom: 0, paddingTop: 0}}>
      <Body>
        <Text style = {{color: 'white'}}>Add or remove Admin</Text>
      </Body>
      </Header>
        <View style={styles.searchBar}>
        <Icon name="ios-search" style={{padding:10}} />
          <TextInput style={{flex:1}}
          underlineColorAndroid = "transparent"
          placeholder = " Search "
          placeholderTextColor = "#3f3f3f"
          autoCapitalize = "none"
          returnKeyType="search"
          onChange={this.handleChange.bind(this)}
          onSubmitEditing={this.handleSearch.bind(this)}
          />
        </View>
        <Content>
          {
            this.state.Users.map((item, key)=>
              (
                <List key={key}>
                  <ListItem thumbnail>
                    <Left>
                      <Thumbnail source={{ uri: 'https://graph.facebook.com/'+ item.User_id + '/picture?type=normal' }} />
                    </Left>
                    <Body>
                      <Text>{item.User_name}</Text>
                      <Text note>{item.User_type}</Text>
                    </Body>
                    <Right>
                      {this.Userbar(item.User_id, item.User_type)}
                    </Right>
                  </ListItem>
                </List>
              )
            )
          }
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({

  searchBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ff7d21',
    height: 40,
    borderRadius: 5,
    margin: 10,
  },
});
