import React, { Component } from 'react';
import {
    View,
    Text,
    ScrollView,
    Image,
    Alert,
    Dimensions,
    Modal,
    TouchableHighlight,
    PanResponder
} from 'react-native';

import { Svg, LinearGradient } from 'expo';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {addToCart, removeFromList} from '../../../actions';

import styles from './styles';

class ListModal extends Component {
    constructor(props) {
      super(props);

      this.state = {
        activeType: 'all',
        types: [],
        meme: {
          'phone': 'Телефоны',
          'tv': 'Телевизоры',
        }
      }
      this.findProp = this.findProp.bind(this);
      this.setFilter = this.setFilter.bind(this);
      this.addToCartEvent = this.addToCartEvent.bind(this);
      this.removeFromListEvent = this.removeFromListEvent.bind(this);
    }

    componentDidMount() {

      if (this.props.app.list.items.length) {
        this.setState({
          activeType: this.props.app.list.items[0].type
        });

        let types = [];

        for (let i = 0; i < this.props.app.list.items.length; i++) {
          let item = this.props.app.list.items[i];
          if (types.indexOf(item.type) < 0) {
            types.push(item.type);
          }
        }

        this.setState({
          types: types
        });
      }
    }

    findProp(els, prop) {
      for (let i = 0; i < els.length; i++) {
        if (els[i].type == prop) {
          return els[i].value
        }
      }
      return false;
    }

    setFilter(tag) {
      if (this.state.activeType != tag) {
        this.setState({
          activeType: tag
        })
      }
    }

    render() {
      let tags = this.state.types.map((el, index) => {
        return(
          <TouchableHighlight key={index} underlayColor="transparent" onPress={() => {this.setFilter(el)}}>
            <View style={styles.tag_wrapper}>
              <LinearGradient
                colors={this.state.activeType == el ? ['#E30719', '#E30719'] : ['#f4f4f4', '#f4f4f4']}
                start={[0, 0]}
                end={[1, 0]}
                style={styles.tag_grad}>
                <Text style={this.state.activeType == el ? [styles.tag_text,{color:'#ffffff'}] :  [styles.tag_text,{color:'#434343'}]}>{this.state.meme[el]}</Text>
              </LinearGradient>
            </View>
          </TouchableHighlight>)
      });

      let elementOptions = ['Модель', ''], firstEl = -1;
      let elementTypes = [];

      let items1 = this.props.app.list.items.map((el, index) => {
        let item1 = this.props.app.shop.items.find((element) => {
          if (this.state.activeType == 'all') {
            return element.id == el.itemId
          } else {
            return element.id == el.itemId && this.state.activeType == element.type
          }
        }) || {options: []};
        if (item1.options.length) {
          for (let i = 0; i < item1.options.length; i++) {
            let option = item1.options[i];
            if (elementOptions.indexOf(option.name) < 0) {
              elementOptions.push(option.name);
              elementTypes.push(option.type);
            }
          }
        }
      })

      let items = this.props.app.list.items.map((el, index) => {
        let item = this.props.app.shop.items.find((element) => {
          if (this.state.activeType == 'all') {
            return element.id == el.itemId
          } else {
            return element.id == el.itemId && this.state.activeType == element.type
          }
        }) || {options: []};

        if (item.options.length) {

          firstEl = firstEl < 0 ? index : firstEl;

          let types = elementTypes.map((el) => {
            return(
              <View style={styles.list_head} key={el}>
                <Text style={styles.list_item_text}>
                  {this.findProp(item.options, el) || ' - '}
                </Text>
              </View>)
          });

          let toCart, flag = false;

          for(let i = 0; i < this.props.app.cart.items.length; i++) {
            if (this.props.app.cart.items[i].itemId === item.id) {
              flag = true;
            }
          }

          if (!flag) {
            toCart = <TouchableHighlight key={index} underlayColor="transparent" onPress={() => {this.addToCartEvent(item.id)}}>
                    <View style={styles.list_cart_wrapper}>
                      <LinearGradient
                        colors={['#E30719', '#E30719']}
                        start={[0, 0]}
                        end={[1, 0]}
                        style={styles.tag_grad}>
                        <Text style={[styles.tag_text]}>В корзину</Text>
                      </LinearGradient>
                    </View>
                  </TouchableHighlight>
          } else {
            toCart = <TouchableHighlight key={index} underlayColor="transparent">
                    <View style={styles.list_cart_wrapper}>
                      <LinearGradient
                        colors={['#fbfbfb', '#fbfbfb']}
                        start={[0, 0]}
                        end={[1, 0]}
                        style={styles.tag_grad}>
                        <Text style={[styles.tag_text, {color: '#999999'}]}>В корзине</Text>
                      </LinearGradient>
                    </View>
                  </TouchableHighlight>
          }
          return(
            <View style={[styles.col, styles.list_item , index == firstEl ? styles.list_right_first: undefined]} key={item.id}>
              <View style={{height: 20}}>
              </View>
              <View style={styles.list_head}>
                <Text style={styles.list_item_text}>
                  {item.name}
                </Text>
              </View>
                <Image
                  source={{uri: item.image}}
                  style={styles.list_image}
                  resizeMode='contain'
                  />
                {types}
                <View style={[styles.row, {alignItems: 'center'}]}>
                  { toCart }

                  <TouchableHighlight underlayColor="transparent" onPress={() => {this.removeFromListEvent(item.id)}}>
                    <View style={styles.buttonWrapper, {marginLeft: 15}}>
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
                <View style={{height: 20}}>
                </View>
            </View>)
        } else {
          return undefined
        }
      });

      let options = elementOptions.map((el, index) => {
        return (
          <View style={[styles.list_head, index == 1 ? styles.list_head_img : undefined]} key={index}>
            <Text style={styles.list_head_text}>
              {el}
            </Text>
          </View>)
      })
      
      if (!items.length) {
        return (
        <View style={[styles.modal]}>
          <LinearGradient
            colors={['#E30719', '#E30719']}
            start={[0, 0]}
            end={[1, 0]}>
            <View style={[styles.row, styles.modal_header]}>
              <Text style={styles.modal_title}>
                Сравнение товаров
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
              <Text style={[styles.empty_text]}>
                В вашем списке сравнения пока пусто
              </Text>
          </View>
        </View>);
      } else {
        return (
          <View style={[styles.modal]}>
            <LinearGradient
              colors={['#E30719', '#E30719']}
              start={[0, 0]}
              end={[1, 0]}>
              <View style={[styles.row, styles.modal_header]}>
                <Text style={styles.modal_title}>
                  Сравнение товаров
                </Text>
                <Svg height={32} width={32} style={styles.modal_close} onPress={this.props.close}>
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
              </View>
            </LinearGradient>
            <View style={[styles.modal_content]}>
              {/*<Text style={styles.list_title}>
                Выберите тип товаров для сравнения
              </Text>
              <View style={styles.tags_wrapper}>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                <TouchableHighlight underlayColor="transparent" onPress={() => {this.setFilter('all')}}>
                  <View style={{marginLeft: 20}}>
                    <LinearGradient
                      colors={this.state.activeType == 'all' ? ['#E30719', '#E30719'] : ['#f4f4f4', '#f4f4f4']}
                      start={[0, 0]}
                      end={[1, 0]}
                      style={styles.tag_grad}>
                      <Text style={this.state.activeType == 'all' ? [styles.tag_text,{color:'#ffffff'}] :  [styles.tag_text,{color:'#434343'}]}>Все</Text>
                    </LinearGradient>
                  </View>
                </TouchableHighlight>
                  {tags}
                </ScrollView>
              </View>
              <View style={styles.tags_wrapper}>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                  <TouchableHighlight underlayColor="transparent">
                    <View style={{marginLeft: 20}}>
                      <LinearGradient
                        colors={['#E30719', '#E30719']}
                        start={[0, 0]}
                        end={[1, 0]}
                        style={styles.tag_grad}>
                        <Text style={styles.tag_text}>Показывать общее</Text>
                      </LinearGradient>
                    </View>
                  </TouchableHighlight>
                </ScrollView>
              </View>*/}
              <ScrollView contentContainerStyle={{alignSelf: 'flex-start', justifyContent: 'flex-start'}}>
                <Text style={styles.list_title}>
                  Список сравнения
                </Text>
                <View style={[styles.row, styles.list]}>
                  <View style={[styles.col, styles.list_left]}>
                    <View style={{height: 20}}>
                    </View>
                    {options}
                  </View>
                  <View style={[styles.col, styles.list_right]}>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} nestedScrollEnabled>
                      {items}
                    </ScrollView>
                  </View>
                </View>
              </ScrollView>
            </View>
          </View>
        );
      }
    }

    addToCartEvent(id) {
      this.props.addToCart(id);
    }
    removeFromListEvent(id) {
      this.props.removeFromList(id);
    }
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
      addToCart: (id) => addToCart(id),
      removeFromList: (id) => removeFromList(id),
    }, dispatch);
}

//Connect everything
export default connect(
  state => {
    return {
      app: state.app,
    }
  }, mapDispatchToProps
)(ListModal);