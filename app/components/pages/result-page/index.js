import React, { Component } from 'react';
import {
    StyleSheet,
    FlatList,
    View,
    Text,
    ActivityIndicator,
    ImageBackground,
    ScrollView,
    Image,
    TextInput,
    TouchableHighlight,
    Alert,
    KeyboardAvoidingView
} from 'react-native';
import { LinearGradient, Svg } from 'expo';
import Modal from 'react-native-modalbox';

import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';

import TopMenu from '../../blocks/top-menu/';
import CartModal from '../../blocks/cart-modal/';
import ChatModal from '../../blocks/chat-modal/';
import ListModal from '../../blocks/list-modal/';

//import * as ActionCreators from '../../../actions'; //Import your actions
import {login, getData, navigateToRegistration, navigateToForget, navigateToSearch, addToCart, addToList} from '../../../actions';
import styles from './styles';

class ResultPage extends Component {

  static navigationOptions = {
    headerVisible: false,
    header: null
  };

  constructor(props) {
      super(props);
      this.state = {
        modal: undefined, // 'CART', 'LIST', 'CHAT'
        isOpen: false,
        isDisabled: false,
        swipeToClose: false,
        sliderValue: 0.3,
        item: {},
        diag:''
      }

      this.addToCartEvent = this.addToCartEvent.bind(this);
      this.addToListEvent = this.addToListEvent.bind(this);
      this.clickOnLogo = this.clickOnLogo.bind(this);
  }

  componentDidMount() {
    let item = this.props.app.shop.items.find((element) => {return element.id == this.props.app.detail_page.itemId});

    this.setState({
      item: item,
      diag: item.options[3].value,
    })
  }

  render() {

    let options, ratingStyles = ['#f4f4f4','#f4f4f4','#f4f4f4','#f4f4f4','#f4f4f4'];;
    
    if (this.state.item.options) {
      options = this.state.item.options.map((item, index) => {
        return (
          <View key={item.type} style={styles.row}>
            <Text style={styles.options_head}>
              {item.name}
            </Text>
            <Text style={styles.options_value}>
              {item.value}
            </Text>
          </View>
          )
      })
    }
    if (this.state.item.rating) {
      for (let i = 0; i < parseInt(this.state.item.rating); i++) {
        ratingStyles[i] = '#e2be0c';
      }
    }


    let inCart, inList, inListFlag = false, inCartFlag = false;

    for(let i = 0; i < this.props.app.list.items.length; i++) {
      if (this.props.app.list.items[i].itemId === this.state.item.id) {
        inListFlag = true;
      }
    }

    for(let i = 0; i < this.props.app.cart.items.length; i++) {
      if (this.props.app.cart.items[i].itemId === this.state.item.id) {
        inCartFlag = true;
      }
    }

    if (inListFlag) {
      inList = <TouchableHighlight underlayColor="transparent">
                  <View style={styles.list_cart_wrapper}>
                    <LinearGradient
                      colors={['#f4f4f4', '#f4f4f4']}
                      start={[0, 0]}
                      end={[1, 0]}
                      style={styles.tag_grad}>
                      <Text style={[styles.tag_text, {color: '#434343'}]}>В сравнении</Text>
                    </LinearGradient>
                  </View>
                </TouchableHighlight>
    } else {
      inList = <TouchableHighlight underlayColor="transparent" onPress={this.addToListEvent}>
                  <View style={styles.list_cart_wrapper}>
                    <LinearGradient
                      colors={['#E30719', '#E30719']}
                      start={[0, 0]}
                      end={[1, 0]}
                      style={styles.tag_grad}>
                      <Text style={[styles.tag_text, {color: '#ffffff'}]}>Сравнить</Text>
                    </LinearGradient>
                  </View>
                </TouchableHighlight>
    }

    if (inCartFlag) {
      inCart = <TouchableHighlight underlayColor="transparent">
                  <View style={styles.list_cart_wrapper}>
                    <LinearGradient
                      colors={['#f4f4f4', '#f4f4f4']}
                      start={[0, 0]}
                      end={[1, 0]}
                      style={styles.tag_grad}>
                      <Text style={[styles.tag_text, {color: '#434343'}]}>В корзине</Text>
                    </LinearGradient>
                  </View>
                </TouchableHighlight>
    } else {
       inCart = <TouchableHighlight underlayColor="transparent" onPress={this.addToCartEvent}>
                  <View style={styles.list_cart_wrapper}>
                    <LinearGradient
                      colors={['#E30719', '#E30719']}
                      start={[0, 0]}
                      end={[1, 0]}
                      style={styles.tag_grad}>
                      <Text style={[styles.tag_text, {color: '#ffffff'}]}>В корзину</Text>
                    </LinearGradient>
                  </View>
                </TouchableHighlight>
    }


    return (
      <View style={styles.container}>
        <Modal 
          ref={"CART"}
          backdrop={false}
          swipeToClose={this.state.swipeToClose}
          keyboardTopOffset = {0}
          onRequestClose={() => {
            alert('Modal has been closed.');
          }}>
           <CartModal close={() => {this.refs.CART.close()}} />
        </Modal>
        <Modal 
          ref={"LIST"}
          backdrop={false}
          swipeToClose={this.state.swipeToClose}
          keyboardTopOffset = {0}
          onRequestClose={() => {
            alert('Modal has been closed.');
          }}>
           <ListModal close={() => {this.refs.LIST.close()}} />
        </Modal>
        <Modal 
          ref={"CHAT"}
          backdrop={false}
          swipeToClose={this.state.swipeToClose}
          keyboardTopOffset = {0}
          onRequestClose={() => {
            alert('Modal has been closed.');
          }}>
           <ChatModal close={() => {this.refs.CHAT.close()}} />
        </Modal>
        <ScrollView>
          <View style={[styles.head, styles.row]}>
            <View style={styles.head_logo}>
              <TouchableHighlight underlayColor="transparent" onPress={() => {this.clickOnLogo()}}>
                <Svg height={64} width={64}>
                  <Svg.Path 
                    fill-rule="evenodd" clip-rule="evenodd" fill="#E30719" d="M42.689,38.751c-7.417,10.651-23.663,13.425-34.574,4.378
                    C5.313,40.805,5.643,36.87,8.7,34.446c3.286-2.606,7.241-3.601,11.285-4.086c1.999-0.241,4.125-0.978,6.019,1.034
                    c0.573,0.607,1.957-1.004,2.686-1.891c0.842-1.024,0.771-2.209-0.082-3.267c-1.193-1.479-2.847-2.387-4.642-3.583
                    c5.562,0,10.85,0,16.816,0c-1.396-0.682-2.209-1.074-3.018-1.475c-1.554-0.771-2.316-1.977-1.721-3.689
                    c0.585-1.684,1.906-2.355,3.604-1.889c6.197,1.704,12.381,3.46,18.559,5.232c1.126,0.324,1.414,0.999,0.42,1.868
                    c-5.087,4.45-10.156,8.922-15.284,13.325c-1.306,1.122-2.843,1.143-4.079-0.147c-1.229-1.283-1.094-2.734-0.004-4.092
                    c0.34-0.423,0.742-0.797,1.643-1.753c-3.44,0-6.322-0.025-9.203,0.015c-0.989,0.014-1.473,0.871-2.025,1.53
                    c-1.804,2.156-4.006,3.394-6.851,3.906c-3.394,0.611-6.242,2.669-9.153,4.438c-0.916,0.557-1.076,1.297-0.009,2.014
                    c1.064,0.713,2.134,1.4,3.423,1.58c6.944,0.969,13.846,1.614,19.648-3.589c0.734-0.658,1.748-1.734,1.748-1.734
                    S39.774,38.947,42.689,38.751z"
                  />
                  <Svg.Path 
                    fill-rule="evenodd" clip-rule="evenodd" fill="#E10C1C" d="M0.044,18.749C1.651,9.163,10.524,1.482,21.385,0.185
                    c8.714-1.041,19.563,4.684,22.681,12.058c-1.824-0.075-3.516-0.134-3.516-0.134s-0.424-0.636-1.011-1.33
                    C30.407-0.017,13.412,0.93,5.888,12.551c-0.119,0.182-0.179,0.403-0.255,0.58c0.341,0.608,0.891,0.424,1.304,0.379
                    c6.475-0.714,11.836,2.046,17.206,5.185c1.336,0.781,2.551,2.552,2.551,2.552s-3.201,0.254-3.94-0.228
                    C15.594,16.351,7.935,17.51,0.044,18.749z"
                  />
                  <Svg.Path
                    fill-rule="evenodd" clip-rule="evenodd" fill="#E10C1C" d="M21.431,58.135c-1.365,1.835-2.29,3.099-3.237,4.344
                    c-0.76,1-1.646,1.764-3.033,1.275c-1.261-0.445-1.207-1.543-1.212-2.577c-0.014-2.542-0.006-5.085,0.003-7.627
                    c0.004-1.362,0.457-2.326,2.046-2.321c1.633,0.006,1.672,1.079,1.619,2.281c-0.042,0.922-0.042,2.928-0.042,4.003
                    c1.354-1.682,2.009-2.424,2.658-3.335c0.593-0.833,1.115-1.654,1.816-2.404c0.602-0.642,1.426-0.661,2.225-0.428
                    c0.937,0.273,1.099,1.05,1.1,1.888c0.005,2.86-0.017,5.721,0.014,8.581c0.015,1.388-0.644,2.129-1.993,2.079
                    c-1.316-0.048-2-0.816-1.967-2.178C21.45,60.765,21.431,59.813,21.431,58.135z" 
                  />
                  <Svg.Path 
                    fill-rule="evenodd" clip-rule="evenodd" fill="#E10C1C" d="M48.666,57.565c0,1.35-0.018,2.7,0.003,4.049
                    c0.023,1.354-0.636,2.132-1.965,2.166c-1.356,0.035-1.992-0.718-1.961-2.101c0.04-1.825-0.023-3.652,0.016-5.479
                    c0.009-0.425-0.002-1.301-0.002-1.301s-0.693,0.014-1.193,0.008c-0.501-0.006-1.145,0.007-1.145,0.007s-0.025,0.867-0.018,1.292
                    c0.03,1.828,0.007,3.657-0.942,5.319c-0.701,1.227-1.671,2.122-3.08,2.419c-0.83,0.176-1.627,0.002-2.067-0.796
                    c-0.362-0.658-0.466-1.517,0.191-1.967c2.234-1.535,1.933-3.813,1.939-6.02c0.012-3.849,0.08-3.93,3.812-3.927
                    C49.507,51.241,48.626,50.63,48.666,57.565z"
                  />
                  <Svg.Path 
                    fill-rule="evenodd" clip-rule="evenodd" fill="#E10C1C" d="M5.732,55.504c1.312,0.175,2.636,0.286,3.933,0.54
                    c1.923,0.377,3.127,1.523,3.201,3.561c0.079,2.165-1.151,3.398-3.146,3.861c-2.105,0.489-4.265,0.277-6.398,0.197
                    c-1.141-0.043-1.615-0.86-1.614-1.963c0.003-2.775-0.003-5.552,0.007-8.327c0.006-1.385,0.787-2.004,2.107-2.011
                    c2.062-0.012,4.124-0.018,6.186,0.004c1.076,0.012,1.85,0.448,1.909,1.653c0.069,1.426-0.89,1.718-2.015,1.744
                    c-1.374,0.032-2.75,0.008-4.125,0.008C5.763,55.014,5.748,55.259,5.732,55.504z M8.678,59.767c-0.226-1.019-1.029-0.836-1.708-0.841
                    c-0.597-0.005-1.377-0.205-1.323,0.834c0.042,0.806,0.328,1.352,1.294,1.302C7.847,61.017,8.403,60.603,8.678,59.767z"
                  />
                  <Svg.Path 
                    fill-rule="evenodd" clip-rule="evenodd" fill="#E10C1C" d="M27.168,57.631c0.056-6.977-0.934-6.245,6.385-6.279
                    c0.555-0.003,1.112-0.027,1.663,0.023c1.071,0.098,1.833,0.626,1.85,1.77c0.017,1.129-0.715,1.689-1.769,1.875
                    c-0.154,0.027-0.315,0.018-0.474,0.025c-2.097,0.106-3.77,0.108-3.77,0.108s0.053,2.104,0.051,3.875c0,1.03,0.009,2.06-0.023,3.09
                    c-0.04,1.319-0.91,1.805-2.057,1.77c-1.047-0.032-1.831-0.553-1.85-1.74C27.15,60.642,27.168,59.137,27.168,57.631z"
                  />
                  <Svg.Path 
                    fill-rule="evenodd" clip-rule="evenodd" fill="#E10C1C" d="M16.612,22.808c1.803-0.643,2.099-0.638,3.055-0.471
                    c0.592,0.104,1.093,0.149,1.363,0.881c0.305,0.824-0.646,1.359-1.347,1.288C18.491,24.384,17.224,24.157,16.612,22.808z"
                  />
                </Svg>
              </TouchableHighlight>
            </View>
            <TopMenu openCart={() => {this.refs.CART.open()}} openList={() => {this.refs.LIST.open()}} openChat={() => {this.refs.CHAT.open()}} />
          </View>
          <View style={styles.content}>
            <Text style={styles.title}>
              {this.state.item.name}
            </Text>
            <View style={styles.row}>
              <View style={[styles.col, styles.image_wrapper]}>
                <Image
                  source={{uri: this.state.item.image}}
                  style={styles.details_image}
                  resizeMode='contain'
                  />
              </View>
              <View style={styles.col}>
                <Text style={styles.subtitle}>
                  Стоимость
                </Text>
                <Text style={[styles.costtitle, {marginBottom: 20}]}>
                  {this.state.item.cost}
                </Text>
                <View style={{marginBottom:20}}>
                  <Svg height={17} width={93}>
                    <Svg.Polygon
                      fill={ratingStyles[0]} 
                      points="14.239,16.686 8.782,13.861 3.362,16.754 4.362,10.693 -0.065,6.432 6.009,5.51 8.693,-0.017 
                        11.448,5.476 17.534,6.32 13.161,10.637 "
                    />
                    <Svg.Polygon
                      fill={ratingStyles[1]} 
                      points="32.917,16.686 27.46,13.861 22.04,16.754 23.04,10.693 18.613,6.432 24.687,5.51 27.371,-0.017 
                        30.125,5.476 36.211,6.32 31.839,10.637 "
                    />
                    <Svg.Polygon
                      fill={ratingStyles[2]} 
                      points="51.594,16.686 46.137,13.861 40.718,16.754 41.717,10.693 37.291,6.432 43.365,5.51 46.049,-0.017 
                        48.803,5.476 54.89,6.32 50.517,10.637 "
                    />
                    <Svg.Polygon
                      fill={ratingStyles[3]} 
                      points="70.271,16.686 64.815,13.861 59.396,16.754 60.395,10.693 55.969,6.432 62.043,5.51 64.727,-0.017 
                        67.481,5.476 73.567,6.32 69.194,10.637 "
                    />
                    <Svg.Polygon
                      fill={ratingStyles[4]} 
                      points="88.949,16.686 83.493,13.861 78.073,16.754 79.072,10.693 74.646,6.432 80.721,5.51 83.404,-0.017 
                        86.159,5.476 92.245,6.32 87.872,10.637 "
                    />
                  </Svg>
                </View>
                { inCart }
                { inList }
              </View>
            </View>
          </View>
          <View style={[styles.content, styles.content_formated]}>
            <View style={[styles.col, {paddingLeft: 24, paddingRight: 24}]}>
              <View style={styles.row}>
                <Text style={styles.subtitle}>
                  О телевизоре
                </Text>
              </View>
              <View style={[styles.row, styles.pad]}>
                <Text style={styles.text}>
                  Диагональ экрана:
                </Text>
                <Text style={[styles.text, styles.bold]}>
                  {this.state.diag}
                </Text>
              </View>
              <View style={[styles.row, styles.pad]}>
                <Text style={styles.text}>
                  Подходит для комнаты
                </Text>
                <Text style={[styles.text, styles.bold]}>
                  более 20 кв.м
                </Text>
              </View>
              <View style={[styles.row, styles.pad]}>
                <Text style={styles.text}>
                  Купили такой телевизор:
                </Text>
                <Text style={[styles.text, styles.green]}>
                  54 раза в этом месяце
                </Text>
              </View>
              <View style={[styles.row, styles.pad]}>
                <Text style={[styles.text, styles.bold]}>
                  Нравится дизайн, управление и картинка
                </Text>
              </View>
            </View>
{/*            <View style={styles.row}>
              <View style={[styles.col, {paddingLeft: 24, paddingRight: 24}]}>
                <Text style={styles.subtitle}>
                  Важно при выборе
                </Text>
                <View style={styles.row}>
                  <Text style={styles.tag}>
                    Стандарт Full HD
                  </Text>
                  <Text style={styles.tag}>
                    более 70 мгц
                  </Text>
                  <Text style={styles.tag}>
                    Оптимальная диагональ 54
                  </Text>
                </View>
              </View>
            </View>*/}
          </View>
          <View style={[styles.content, {paddingTop: 0}]}>
            <View>
              <Text style={styles.subtitle}>
                Описание
              </Text>
              <Text style={styles.text}>
                { this.state.item.descr }
              </Text>
            </View>
            <View>
              <Text style={styles.subtitle}>
                Характеристики
              </Text>
              { options }
              <View style={{height: 40}}>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>);
  }

  addToCartEvent() {
    this.props.addToCart(this.state.item.id);
  }
  addToListEvent() {
    this.props.addToList(this.state.item.id, this.state.item.type);
  }
  clickOnLogo() {
    this.props.navigateToSearch();
  }
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
      addToCart: (id) => addToCart(id),
      addToList: (id, type) => addToList(id, type),
      navigateToSearch: navigateToSearch,
    }, dispatch);
}

//Connect everything
export default connect(
  state => {
    return {
      app: state.app,
      user: state.user,
    }
  }, mapDispatchToProps
)(ResultPage);