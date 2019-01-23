import React, { Component } from 'react';
import { View, Image, Modal, AsyncStorage, StyleSheet, AppRegistry } from 'react-native';
import { Container, Badge, H3, Header, Content, Row,Grid, Col, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import { MaterialCommunityIcons,Ionicons } from '@expo/vector-icons';
import QRCode from 'react-native-qrcode';
import {widthPercentageToDP as wp, heightPercentageToDP as hp, listenOrientationChange as lor,
  removeOrientationListener as rol} from 'react-native-responsive-screen';
import User from './Userprofile';
import { BlurView } from 'expo';

export default class GoneSin extends Component {
  componentDidMount() {
    lor(this);
    let that = this;
    setInterval(() => {
        that.setState({GoneSinList: global.GoneSinList});
    }, 1000);
  }

  componentWillUnmount() {
    rol();
  }
  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  };
  setModalVisibleGoneSin(visible) {
    this.setState({modalVisibleGoneSin: visible});
  };
  state = {
    text: '1000 points',
    modalVisible: false,
    modalVisibleGoneSin: false,
    GoneSinList:[],
  };

  render() {
    return(
      <Container>
        <Header style = {{height: 70,backgroundColor: '#a3080c' , paddingBottom: 0, paddingTop: 0}}>
        <Button transparent style={{height:55, width:'100%', backgroundColor: '#a3080c', justifyContent: 'flex-start'}} onPress={() => {this.setModalVisible(true);}}>
          <Thumbnail style = {{  borderColor: 'white', borderWidth: 2}}  source={{uri: 'https://graph.facebook.com/'+ global.Profile.id + '/picture?type=normal'}} />
          <Text >{global.Profile.name}</Text>
        </Button>
          <Modal
            animationType="slide"
            transparent={false}
            onRequestClose={()=>{this.setModalVisible(!this.state.modalVisible);}}
            visible={this.state.modalVisible}>
            <Header style = {{height: 40,backgroundColor: '#a3080c' , color: 'orange', paddingBottom: 0, paddingTop: 0}}>
            <Right>
              <Button transparent onPress={()=>{this.setModalVisible(!this.state.modalVisible);}}>
                  <Icon name="close"/>
              </Button>
              </Right>
            </Header>
            <User/>
          </Modal>
        </Header>
        <Grid>
          <Row style={{height: 50}}>
                <Col style={{ height: 50, paddingTop: 15 }}>
                   <H3 style={{ fontWeight: "bold", paddingTop: 0, paddingLeft: 8 }}>Gone Sin List!</H3>
                </Col>
          </Row>
          <Content style={{ backgroundColor: '#dfdfdf'}}>
            {
              this.state.GoneSinList.map((item, key)=>
              (
                <View style={{flex: 1,flexDirection: 'row',paddingBottom:0,marginBottom:0}} key={key}>
                  <View style={{width: '50%', height: '100%', paddingTop:0, paddingBottom:0,backgroundColor: '#dfdfdf',}}>
                  <Card style={{flex: 0, marginLeft: 12}}>
                                <CardItem>
                                <Left>
                                    <Thumbnail source={{uri : 'https://myanimelist.cdn-dena.com/images/anime/1536/93863l.jpg'}} />
                                    <Body>
                                    <Text>{item.Rest_id}</Text>
                                    <Text note>{item.User_id}</Text>
                                    </Body>
                                </Left>
                                </CardItem>
                                <CardItem>
                                <Left>
                                  <Modal
                                    animationType="slide"
                                    transparent={true}
                                    onRequestClose={()=>{this.setModalVisibleGoneSin(!this.state.modalVisibleGoneSin);}}
                                    visible={this.state.modalVisibleGoneSin}>

                                   <View tint="light" intensity={50} style={{
                                      flex: 1,
                                      flexDirection: 'column',
                                      justifyContent: 'center',
                                      alignItems: 'center',
                                      shadowColor: '#000000',
                                      shadowOffset: {
                                        width: 0,
                                        height: 0,
                                      },
                                      shadowRadius: 3,
                                      shadowOpacity: 0.5
                                      }}>
                                      <View style={{
                                        width: '80%',
                                        height: 40, borderColor: 'white', borderWidth: 1, borderTopLeftRadius: 5, borderTopRightRadius: 5}}>
                                      <Header style = {{height: 40,backgroundColor: 'white' , color: 'orange', paddingBottom: 0, paddingTop: 0}}>
                                        <Right>
                                        <Button transparent onPress={()=>{this.setModalVisibleGoneSin(!this.state.modalVisibleGoneSin);}}>
                                            <MaterialCommunityIcons name="window-close" size={20} color="#959595" />
                                        </Button>
                                        </Right>
                                      </Header>
                                      </View>
                                      <View style={{width: '80%', height: '50%',justifyContent: 'center',alignItems: 'center',backgroundColor: 'white', borderColor: 'white' ,borderWidth: 1, borderBottomLeftRadius: 5, borderBottomRightRadius: 5, borderTopWidth:0, padding: 10 }}>
                                      <QRCode
                                      value={item.User_promotion_amount}
                                      size={200}
                                      bgColor='purple'
                                      fgColor='white'/>
                                      </View>
                                  </View>
                                  </Modal>
                                    <Button transparent textStyle={{color: '#87838B'}} onPress={() => {this.setModalVisibleGoneSin(true);}}>
                                    {/* <Ionicons name="ios-restaurant" size={30} color="black" />  */}
                                    <Badge style={{ backgroundColor: 'black' }}>
                                        <Text style={{ color: 'white', fontSize: 10 }}>{item.User_promotion_amount}</Text>
                                    </Badge>
                                    <Text style={{paddingBottom: 17, color: 'orange',fontWeight: "bold" }}>{item.gonesin}</Text>
                                    </Button>
                                </Left>

                                </CardItem>
                          </Card>
                  </View>
                  <View style={{width: '50%', height: '100%', paddingTop:0, paddingBottom:0,backgroundColor: '#dfdfdf',}}>
                  <Card style={{flex: 0, marginRight: 12 }}>
                                <CardItem>
                                <Left>
                                    <Thumbnail source={{uri : item.img}} />
                                    <Body>
                                    <Text>{item.name}</Text>
                                    <Text note>{item.date}</Text>
                                    </Body>
                                </Left>
                                </CardItem>
                                <CardItem>
                                <Left>
                                    <Button transparent textStyle={{color: '#87838B'}}>
                                    {/* <Ionicons name="ios-restaurant" size={30} color="black" />  */}
                                    <Badge style={{ backgroundColor: 'black' }}>
                                        <Text style={{ color: 'white', fontSize: 10 }}>{item.point}</Text>
                                    </Badge>
                                    <Text style={{paddingBottom: 17, color: 'orange',fontWeight: "bold" }}>{item.gonesin}</Text>
                                    </Button>
                                </Left>

                                </CardItem>
                          </Card>
                  </View>
                </View>
              )
              )
            }
          </Content>
        </Grid>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      // width: wp('70%'),
      // height: hp('80%'),
  },
  textWrapper: {
    height: hp('86.5%'),
    paddingTop: hp('30%'),
  },
});

AppRegistry.registerComponent('HelloWorld', () => GoneSin);

module.exports = GoneSin;
