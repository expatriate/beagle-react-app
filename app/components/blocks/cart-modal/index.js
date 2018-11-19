import React, { Component } from 'react';
import {
    View,
    Text,
    ScrollView,
    Image,
    Alert,
    Dimensions,
    TouchableHighlight
} from 'react-native';

import { Svg, LinearGradient } from 'expo';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { navigateToCard, removeFromCart, addToList, addToResult, navigateToResult} from '../../../actions';

import styles from './styles';


class CartModal extends Component {
    constructor(props) {
      super(props);

      this.state = {
        fullSum: 0,
        showBills: false,
      }

      this.fullSum = 0;

      this.goToCard = this.goToCard.bind(this);
      this.getHelperText = this.getHelperText.bind(this);
      this.addToListEvent = this.addToListEvent.bind(this);
      this.removeFromCartEvent = this.removeFromCartEvent.bind(this);
      this.addToResultEvent = this.addToResultEvent.bind(this);
    }

    componentDidMount() {
      if (this.props.app.cart.openBillsFirst) {
        this.setState({
          showBills: true
        })
      }
    }

    render() {

      this.fullSum = 0;

      let bills;

      if (this.props.app.cart.bills) {
        bills = this.props.app.cart.bills.map((el, index) => {
          let items = el.items.map((element, index) => {
            return (
              <View style={[styles.row, {flex: 1}]} key={index+'_el'}>
                <View style={[styles.col, {width:'50%'}]}>
                  <View style={[styles.row, { alignItems: 'flex-start', justifyContent: 'flex-start', flex: 1}]}>
                    <Text style={styles.bill_el}>
                      { element.name }
                    </Text>
                  </View>
                </View>
                <View style={[styles.col, {width:'50%'}]}>
                  <View style={[styles.row, { alignItems: 'flex-end', justifyContent: 'flex-end', flex: 1}]}>
                    <Text style={[styles.bill_el, {textAlign: 'right'}]}>
                      { element.cost } Руб.
                    </Text>
                  </View>
                </View>
              </View>)
          });
          return(
            <View key={index+'_row'} style={styles.bill}>
              <View style={[styles.row, {justifyContent: 'center', alignItems: 'center',paddingTop: 10, paddingBottom: 10}]}>
                <Text style={styles.bill_title_status}>
                  { el.status}
                </Text>
                <Svg width={32} height={32} style={{marginLeft: 20}}>
                  <Svg.Path
                    fill="#13A013"
                    d="M16,0C7.178,0,0,7.178,0,16s7.178,16,16,16s16-7.178,16-16S24.822,0,16,0z M16,30.401c-7.941,0-14.401-6.46-14.401-14.401
                      S8.059,1.599,16,1.599S30.401,8.059,30.401,16S23.941,30.401,16,30.401z "
                    />
                  <Svg.Path
                    fill="#13A013"
                    d="M20.189,12.104l-6.134,6.101l-2.238-2.251c-0.313-0.313-0.816-0.313-1.129-0.007c-0.313,0.307-0.313,0.816-0.007,1.129
                      l2.8,2.819c0.156,0.157,0.359,0.235,0.567,0.235c0.202,0,0.405-0.078,0.562-0.235l6.701-6.662c0.313-0.313,0.313-0.815,0.007-1.129
                      C21.005,11.791,20.502,11.791,20.189,12.104z"
                    />
                </Svg>
                
              </View>
              <View>
                <Image
                  source={require('../../../../assets/images/shtrihcode.png')}
                  style={styles.shtrihcode}
                  resizeMode='contain'
                />
              </View>
              <View style={{paddingHorizontal: 24}}>
                <Text style={styles.bill_title}>
                  Товары в чеке:
                </Text>
                { items }
                <Text style={styles.bill_title_bottom}>
                  Общая сумма: { el.sum} Руб.
                </Text>
              </View>
            </View>)
        });
      }

      let items;
      
      if (this.props.app.cart.items) {
        items = this.props.app.cart.items.map((el, index) => {
          let item = this.props.app.shop.items.find((element) => {return element.id == el.itemId});

          let ratingStyles = ['#f4f4f4','#f4f4f4','#f4f4f4','#f4f4f4','#f4f4f4'];
          for (let i = 0; i < parseInt(item.rating); i++) {
            ratingStyles[i] = '#e2be0c';
          }

          this.fullSum += parseInt(item.cost.replace(' ',''));


          let inList, flag = false;
          for (let i = 0; i < this.props.app.list.items.length; i++) {
            if (this.props.app.list.items[i].itemId === item.id) {
              flag = true
            }
          }
          if (flag) {
            inList = <TouchableHighlight underlayColor="transparent">
                      <View style={[styles.buttonWrapper]}>
                        <LinearGradient
                          colors={['#fbfbfb', '#fbfbfb']}
                          start={[0, 0]}
                          end={[1, 0]}
                          style={[styles.cart_el_button_grad, styles.row]}>
                          <Text style={[styles.cart_el_button_text, {color: '#999999'}]}>В сравнении</Text>
                        </LinearGradient>
                      </View>
                    </TouchableHighlight>

          } else {
            inList = <TouchableHighlight underlayColor="transparent" onPress={() => {this.addToListEvent(item.id, item.type)}}>
                      <View style={[styles.buttonWrapper]}>
                        <LinearGradient
                          colors={['#E30719', '#E30719']}
                          start={[0, 0]}
                          end={[1, 0]}
                          style={[styles.cart_el_button_grad, styles.row]}>
                          <Text style={[styles.cart_el_button_text, {color: '#ffffff'}]}>Сравнить</Text>
                        </LinearGradient>
                      </View>
                    </TouchableHighlight>
          }

          return(
            <View key={item.id} style={styles.cart_el}>
              <View style={[styles.row, {alignItems: 'center'}]}>
                <Text style={styles.cart_el_name}>
                  {item.name}
                </Text>
                <TouchableHighlight underlayColor="transparent" onPress={() => {this.removeFromCartEvent(item.id)}}>
                  <View style={styles.buttonWrapper}>
                    <Svg height={32} width={32}>
                      <Svg.Path fill="#E30719" d="M16,29.584c-7.491,0-13.583-6.094-13.583-13.585C2.417,8.509,8.51,2.416,16,2.416
                      c7.49,0,13.582,6.093,13.582,13.583C29.584,23.49,23.49,29.584,16,29.584z M16,3.967c-6.635,0-12.032,5.398-12.032,12.032
                      c0,6.636,5.397,12.03,12.032,12.03c6.634,0,12.029-5.395,12.029-12.03C28.029,9.366,22.635,3.967,16,3.967z"/>
                      <Svg.Path fill="#E30719" d="M20.355,12.785l-7.617,7.532c-0.305,0.301-0.797,0.301-1.099-0.004c-0.302-0.307-0.299-0.797,0.006-1.1
                        l7.618-7.532c0.305-0.301,0.795-0.298,1.098,0.006C20.662,11.993,20.66,12.483,20.355,12.785z"/>
                      <Svg.Path fill="#E30719" d="M20.313,20.357c-0.305,0.303-0.797,0.301-1.098-0.006l-7.533-7.615c-0.301-0.305-0.299-0.797,0.006-1.099
                        c0.305-0.301,0.798-0.298,1.099,0.007l7.532,7.615C20.621,19.568,20.619,20.057,20.313,20.357z"/>
                    </Svg>
                  </View>
                </TouchableHighlight>
              </View>
              <View style={styles.row}>
                <View style={styles.col}>
                  <Image
                    source={{uri: item.image}}
                    style={styles.cart_el_image}
                    resizeMode='contain'
                    />
                    <Text style={styles.cart_el_cost}>
                      {item.cost} Руб.
                    </Text>
                </View>
                <View style={[styles.col, styles.flex]}>
                  <Text style={styles.cart_el_text_title}>
                    О товаре
                  </Text>
                  <Text style={styles.cart_el_text} numberOfLines={3} ellipsizeMode='tail'>
                    {item.descr}
                  </Text>
                  <Text style={styles.cart_el_text_title}>
                    Рейтинг
                  </Text>
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
              </View>
              <View style={styles.row}>
                <View style={[styles.row, styles.cart_el_other_btns]}>
                  { inList }
                  <TouchableHighlight underlayColor="transparent" onPress={() => {this.addToResultEvent(item.id)}}>
                    <View style={[styles.buttonWrapper]}>
                      <LinearGradient
                        colors={['#f4f4f4', '#f4f4f4']}
                        start={[0, 0]}
                        end={[1, 0]}
                        style={[styles.cart_el_button_grad, styles.row]}>
                        <Text style={styles.cart_el_button_text}>
                          Подробнее
                          </Text>
                      </LinearGradient>
                    </View>
                  </TouchableHighlight>          
                </View>
              </View>
            </View>)
        });
      }
      
      return (
        <View style={[styles.modal]}>
          <LinearGradient
            colors={['#E30719', '#E30719']}
            start={[0, 0]}
            end={[1, 0]}>
            <View style={[styles.row, styles.modal_header]}>
              <Text style={styles.modal_title}>
                Моя корзина
              </Text>
              <TouchableHighlight style={styles.modal_close} underlayColor="transparent" onPress={this.props.close}>
                <Svg height={32} width={32}>
                  <Svg.Path 
                    fill="#ffffff" 
                    d="M27.137,4.863C24.16,1.887,20.209,0.25,16,0.25c-4.209,0-8.16,1.637-11.137,4.613C1.887,7.84,0.25,11.79,0.25,16
                      s1.637,8.161,4.613,11.136C7.84,30.112,11.791,31.749,16,31.749c4.209,0,8.16-1.637,11.137-4.613
                      C30.112,24.16,31.75,20.209,31.75,16S30.112,7.84,27.137,4.863z M25.87,25.87c-2.639,2.638-6.146,4.089-9.87,4.089
                      c-3.725,0-7.232-1.451-9.87-4.089c-5.442-5.443-5.442-14.298,0-19.74C8.768,3.492,12.275,2.04,16,2.04
                      c3.725,0,7.231,1.452,9.87,4.09C31.313,11.572,31.313,20.427,25.87,25.87z"
                    />
                  <Svg.Path 
                    fill="#ffffff" 
                    d="M22.94,9.059c-0.352-0.351-0.915-0.351-1.266,0L16,14.733l-5.675-5.674c-0.351-0.351-0.914-0.351-1.266,0
                      c-0.351,0.352-0.351,0.915,0,1.266L14.734,16L9.06,21.674c-0.351,0.351-0.351,0.914,0,1.267c0.172,0.172,0.404,0.265,0.629,0.265
                      c0.226,0,0.458-0.086,0.63-0.265l5.674-5.675l5.675,5.675c0.172,0.172,0.404,0.265,0.63,0.265c0.231,0,0.457-0.086,0.629-0.265
                      c0.352-0.353,0.352-0.916,0-1.267L17.266,16l5.675-5.675C23.291,9.974,23.291,9.411,22.94,9.059z"
                    />
                </Svg>
              </TouchableHighlight>
            </View>
          </LinearGradient>
          <View style={styles.modal_content}>
            <View style={[styles.row, {marginTop: 10}]}>
              <TouchableHighlight underlayColor="transparent" onPress={() => {this.setState({showBills: false})}}>
                <View style={[styles.buttonWrapper]}>
                  <LinearGradient
                    colors={!this.state.showBills ? ['#E30719', '#E30719'] :  ['#f4f4f4', '#f4f4f4']}
                    start={[0, 0]}
                    end={[1, 0]}
                    style={[styles.cart_el_button_grad, styles.row]}>
                    <Text style={!this.state.showBills ? [styles.cart_el_button_text, {color: '#ffffff'}] : [styles.cart_el_button_text, {color: '#434343'}]}>Список товаров</Text>
                  </LinearGradient>
                </View>
              </TouchableHighlight>
              <TouchableHighlight underlayColor="transparent" onPress={() => {this.setState({showBills: true})}}>
                <View style={[styles.buttonWrapper]}>
                  <LinearGradient
                    colors={this.state.showBills ? ['#E30719', '#E30719'] :  ['#f4f4f4', '#f4f4f4']}
                    start={[0, 0]}
                    end={[1, 0]}
                    style={[styles.cart_el_button_grad, styles.row]}>
                    <Text style={this.state.showBills ? [styles.cart_el_button_text, {color: '#ffffff'}] : [styles.cart_el_button_text, {color: '#434343'}]}>Чеки</Text>
                  </LinearGradient>
                </View>
              </TouchableHighlight>
            </View>
            <ScrollView>
              { !items.length && !this.state.showBills ? 
                <Text style={[styles.empty_text]}>
                В вашей корзине пока пусто
                </Text> : 
                undefined
              }
              { items.length && !this.state.showBills ? 
                items : 
                undefined
              }

              { bills.length && this.state.showBills ? 
                bills : 
                undefined
              }

              { !bills.length && this.state.showBills ? 
                <Text style={[styles.empty_text]}>
                  У вас пока нет чеков
                </Text> : 
                undefined
              }
              
            </ScrollView>
          </View>
          <View style={[styles.modal_footer, styles.row]}>
            <View style={styles.col, {flex: 1}}>
              <View style={styles.row}>
                <Text style={styles.modal_footer_text}>
                  В корзине {this.props.app.cart.items.length} {this.getHelperText()}
                </Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.modal_footer_text}>
                  Сумма: {this.fullSum} руб.
                </Text>
              </View>
            </View>
            <TouchableHighlight underlayColor="transparent" onPress={this.goToCard}>
              <View style={styles.buttonWrapper}>
                <LinearGradient
                  colors={this.props.app.cart.items.length ? ['#E30719', '#E30719'] : ['#d4d4d4', '#d4d4d4']}
                  start={[0, 0]}
                  end={[1, 0]}
                  style={styles.cart_el_button_grad}>
                  <Text style={this.props.app.cart.items.length ? [styles.cart_el_button_next, {color: '#ffffff'}] : [styles.cart_el_button_next, {color: '#696969'}]}>Продолжить</Text>
                </LinearGradient>
              </View>
            </TouchableHighlight>
          </View>
        </View>
      );
    }

    getHelperText() {
      let count = this.props.app.cart.items.length
      if (count == 1) {
        return 'товар'
      } else if ([2,3,4].indexOf(count) >= 0 || [2,3,4].indexOf(count % 10) >= 0) {
        return 'товара';
      } else {
        return 'товаров';
      }
    }

    goToCard() {
      if (this.props.app.cart.items.length) {
        this.props.navigateToCard();
      }
    }

    addToListEvent(id, type) {
      //Alert.alert('test', JSON.stringify(this.state))
      this.props.addToList(id, type);
    }

    removeFromCartEvent(id) {
      //Alert.alert('test', JSON.stringify(this.state))
      this.props.removeFromCart(id);
    }

    addToResultEvent(id) {

      /*if (this.props.nav.index == 4) {
        if (this.props.app.detail_page.itemId == parseInt(id)) {
          this.props.close()
        } else {
          this.props.addToResult(id);
          this.props.navigateToResult();
        }
      } else {
        this.props.addToResult(id);
        this.props.navigateToResult();
      }*/
      this.props.addToResult(id);
      this.props.navigateToResult();
    }
};


function mapDispatchToProps(dispatch) {
    return bindActionCreators({
      getUserData: (user_id) => getUserData(user_id),
      navigateToCard: navigateToCard,
      addToList: (id, type) => addToList(id, type),
      removeFromCart: (id) => removeFromCart(id),
      addToResult: (id) => addToResult(id),
      navigateToResult: navigateToResult,
    }, dispatch);
}

//Connect everything
export default connect(
  state => {
    return {
      app: state.app,
      nav: state.nav
    }
  }, mapDispatchToProps
)(CartModal);