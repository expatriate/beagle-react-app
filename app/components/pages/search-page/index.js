import React, { Component } from 'react';
import {
    View,
    Text,
    ScrollView,
    Image,
    Alert,
    Dimensions,
    TextInput,
    TouchableHighlight,
    Animated,
} from 'react-native';

import { LinearGradient, Svg } from 'expo';
import Modal from 'react-native-modalbox';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
const { width } = Dimensions.get('window');

import { navigateToResult, navigateToPath, navigateToOnplace, addToResult, addTags } from '../../../actions';
import TopMenu from '../../blocks/top-menu/';
import CartModal from '../../blocks/cart-modal/';
import ChatModal from '../../blocks/chat-modal/';
import ListModal from '../../blocks/list-modal/';
import SuccessPayModal from '../../blocks/success-pay-modal/'; 

import styles from './styles';

class SearchPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modal: undefined, // 'CART', 'LIST', 'CHAT'
      isOpen: false,
      isDisabled: false,
      swipeToClose: false,
      sliderValue: 0.3,
      search: '',
      results: [],
      dirty: false,
      tips: [],
      displayTips: false,
      hideAnim: new Animated.Value(1),
      showAnim: new Animated.Value(0),
      topOffset: 0,
      displayResults: true
    }

    this.goToResult = this.goToResult.bind(this);
    this.goToPath = this.goToPath.bind(this);
    this.goToOnplace = this.goToOnplace.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.onTyping = this.onTyping.bind(this);
    this.applySearch = this.applySearch.bind(this);
    this.onAddTags = this.onAddTags.bind(this);
    this.clearSearch = this.clearSearch.bind(this);

    this.calculateSeachPanTopOffset = this.calculateSeachPanTopOffset.bind(this);
  }

  componentDidMount() {
    //this.props.getUserData(this.props.user.user_id);
    let tags = [];
    if (this.props.app.shop.items.length) {
      for (let i = 0; i < this.props.app.shop.items.length; i++) {
        let product = this.props.app.shop.items[i]; 
        for (let j = 0; j < product.tags.length; j++) {
          let tag = product.tags[j];
          if (tags.indexOf(tag) < 0) {
            tags.push(tag.toLowerCase());
          }
        }
      }
    }

    this.onAddTags(tags);
  }

  setModalVisible(modal) {
    if (modal) {
      this.setState({modal: modal, isOpen: true});
    } else {
      this.setState({modal: undefined, isOpen: false});
    }
  }

  applySearch(text) {
    this.setState({
      search: text.trim(),
      hideAnim: new Animated.Value(1),
    });

    this.searchInput.blur();

    Animated.timing(
      this.state.hideAnim,
      {
        toValue: 0,
        duration: 5000,
      }
    ).start();

    this.onSearch(text);
  }

  onSearch(text, reset) {
    let results;
    let data = text ? text : this.state.search;
    if (data.length > 0 && !reset) {
      results = this.props.app.shop.items.filter((item) => {
        for (let i = 0; i < item.tags.length; i++) {
          if (item.tags[i].toLowerCase().indexOf(data.toLowerCase()) >= 0) {
            return true;
          }
        }
        return false
      })
    } else {
      results = [];
    }

    if (reset) {
      this.setState({
        dirty: false,
        displayResults: false,
        displayTips: false,
        results: []
      })
    } else {
      if (data.length > 0 && !results.length) {
        this.setState({
          dirty: true,
          displayResults: true,
          results: []
        })
      } else {
        this.setState({
          results: results,
          displayTips: false,
          displayResults: true,
        })
      }
    }


  }

  clearSearch() {
    this.setState({
      search: '',
      dirty: false,
      displayResults: false,
    });
    this.onSearch('', true);
    this.searchInput.focus();
  }

  onTyping(text) {
    let testtext = text.trim();
    if (testtext.length == 0) {
      text = testtext;
    }
    this.setState({search:text});

    let tips;

    if (this.props.app.tags.length) {
      tips = this.props.app.tags.filter((item) => {
        return item.indexOf(text.toLowerCase()) >= 0;
      });
    }

    this.setState({
      tips: tips,
      displayTips: true
    });
  }

  calculateSeachPanTopOffset(event) {
    let {x, y, width, height} = event.nativeEvent.layout;

    this.setState({
      topOffset: height
    });
  }


  render() {

    let results;

    if (this.state.results.length) {
      results = this.state.results.map((item, index) => {
        let stylestemp = [styles.result];
        /*if (index == 0) {
          stylestemp.push(styles.result_first)
        }
        if (index == this.state.results.length - 1) {
          stylestemp.push(styles.result_last)
        }*/
        return(<View style={stylestemp} key={index+'_result'}>
          <Image
            source={{uri: item.image}}
            style={styles.result_image}
            resizeMode='contain'
            />
          <Text style={styles.result_name}>
            { item.name }
          </Text>                
          <TouchableHighlight underlayColor="transparent"  onPress={() => {this.goToPath(item.id)}}>
            <View style={[styles.result_btn, styles.row]}>
              <Text style={styles.result_btn_text}>
                Вперед!
              </Text>
              <Svg width={32} height={32}>
                <Svg.Path
                fill="#ffffff"
                  d="M15.999,5.125c-6.123,0-7.995,4.768-7.995,8.76c0,5.784,6.464,14.119,7.995,14.119c1.627,0,7.998-8.398,7.998-14.119
                    C23.996,9.893,22.122,5.125,15.999,5.125z M16,16.582c-1.976,0-3.579-1.602-3.579-3.578c0-1.977,1.603-3.579,3.579-3.579
                    c1.976,0,3.577,1.602,3.577,3.579C19.577,14.98,17.976,16.582,16,16.582z"/>
              </Svg>
            </View>
          </TouchableHighlight>
        </View>)
      })
    }


    let tips;

    if (this.state.tips.length) {
      tips = this.state.tips.map((item,index) => {
        if (index < 5) {
          return (
            <TouchableHighlight key={item} underlayColor="transparent" style={styles.tip} onPress={() => {this.applySearch(item)}}>
              <View style={{zIndex: 9, backgroundColor: '#ffffff'}}>
                <Text style={styles.tips_text}>
                  {item}
                </Text>
              </View>
            </TouchableHighlight>)
        } else {
          return false
        }
      })
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

        <View style={[styles.head, styles.row]}>
          <View style={styles.head_logo}>
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
          </View>
          <TopMenu hideBack={true} 
            openCart={() => {this.refs.CART.open(); this.setState({displayTips: false}); this.searchInput.blur();}} 
            openList={() => {this.refs.LIST.open(); this.setState({displayTips: false}); this.searchInput.blur();}} 
            openChat={() => {this.refs.CHAT.open(); this.setState({displayTips: false}); this.searchInput.blur();}} />
        </View>
        <View style={[styles.content]}>
          <View style={[styles.inputContainer]}>
            <View style={[styles.row, styles.textInput_wrap]}>
              <TextInput
                style={[styles.textInput, {flex: 1}]}
                placeholder="Что ищем?"
                ref={e => this.searchInput = e}
                onChangeText={(text) => this.onTyping(text)}
                onSubmitEditing={() => this.onSearch()}
                value={this.state.search}
                onBlur={() => this.setState({displayTips: false})}
                onFocus={() => this.setState({displayResults: false})}
              />
              { this.state.search.length ? 
              <View style={{top: 10}}>
                <TouchableHighlight underlayColor="transparent" onPress={() => {this.clearSearch()}}>
                  <Svg height={32} width={32}>
                    <Svg.Path 
                      fill="#E10C1C" 
                      d="M22.94,9.059c-0.352-0.351-0.915-0.351-1.266,0L16,14.733l-5.675-5.674c-0.351-0.351-0.914-0.351-1.266,0
                        c-0.351,0.352-0.351,0.915,0,1.266L14.734,16L9.06,21.674c-0.351,0.351-0.351,0.914,0,1.267c0.172,0.172,0.404,0.265,0.629,0.265
                        c0.226,0,0.458-0.086,0.63-0.265l5.674-5.675l5.675,5.675c0.172,0.172,0.404,0.265,0.63,0.265c0.231,0,0.457-0.086,0.629-0.265
                        c0.352-0.353,0.352-0.916,0-1.267L17.266,16l5.675-5.675C23.291,9.974,23.291,9.411,22.94,9.059z"
                      />
                  </Svg>
                </TouchableHighlight>
              </View>
              : null }
            </View>
            { this.state.displayTips && this.state.tips.length ? 
              <View onLayout={(e) => this.calculateSeachPanTopOffset(e)} style={styles.tips_container}>
                { tips }
              </View> :
              undefined
            }
          </View>
        </View>
        {/*<Text onPress={this.goToPath}>
          Go to video
        </Text>
        <Text onPress={this.goToResult}>
          Go to result
        </Text>
        <Text onPress={this.goToOnplace}>
          Go to ONPLACE
        </Text>*/}
        <View style={{flex: 1}}>
          {this.state.results.length && this.state.displayResults ? 
            <View style={{flex:1}}>
              <Text style={styles.results_title}>
                Посмотри что я нашел:
              </Text>
              <ScrollView 
                horizontal={true} 
                showsHorizontalScrollIndicator={false}
                decelerationRate={0}
                snapToInterval={width}
                snapToAlignment={"center"}>
                { results }
              </ScrollView>
            </View>
          : undefined }
          {!this.state.results.length && this.state.dirty && this.state.displayResults ? 
            <Text style={[styles.results_title]}>
              К сожалению я ничего не нашел :(
            </Text> :
            undefined}
        </View>
        { !this.state.results.length ? 
          <View style={[styles.footer]}>
            <View style={styles.footer_wrapper}>
              <Svg height={320} width={320} onPress={() => {Alert.alert('ACTION', 'voice')}}>
                <Svg.Defs>
                  <Svg.RadialGradient cx="160" cy="160" r="159.9995" gradientUnits="userSpaceOnUse" id="RadialGradient1">
                    <Svg.Stop stopColor="#B3B3B3" offset="0"></Svg.Stop>
                    <Svg.Stop stopColor="#FFFFFF" offset="1"></Svg.Stop>
                  </Svg.RadialGradient>
                  <Svg.RadialGradient cx="159.5713" cy="159.5713" r="136" gradientUnits="userSpaceOnUse" id="RadialGradient2">
                    <Svg.Stop stopColor="#B3B3B3" offset="0"></Svg.Stop>
                    <Svg.Stop stopColor="#FFFFFF" offset="1"></Svg.Stop>
                  </Svg.RadialGradient>
                  <Svg.RadialGradient  cx="159.5713" cy="159.5708" r="115.6003" gradientUnits="userSpaceOnUse" id="RadialGradient3">
                    <Svg.Stop stopColor="#B3B3B3" offset="0"></Svg.Stop>
                    <Svg.Stop stopColor="#FFFFFF" offset="1"></Svg.Stop>
                  </Svg.RadialGradient>
                  <Svg.LinearGradient x1="111.9258" y1="73.6152" x2="207.2183" y2="245.5275" gradientUnits="userSpaceOnUse" id="LinearGradient1">
                    <Svg.Stop stopColor="#EA3F54" offset="0"></Svg.Stop>
                    <Svg.Stop stopColor="#E53349" offset="0.1957"></Svg.Stop>
                    <Svg.Stop stopColor="#E22B42" offset="0.5152"></Svg.Stop>
                    <Svg.Stop stopColor="#E02037" offset="0.9166"></Svg.Stop>
                    <Svg.Stop stopColor="#E10C1C" offset="1"></Svg.Stop>
                  </Svg.LinearGradient>
                </Svg.Defs>
                <Svg.Circle
                  fill="url(#RadialGradient1)" 
                  cx="160" cy="160" r="160"
                />
                <Svg.Circle
                  fill="url(#RadialGradient2)" 
                  cx="159.571" cy="159.571" r="136"
                />
                <Svg.Circle
                  fill="url(#RadialGradient3)" 
                  cx="159.572" cy="159.571" r="115.6"
                />
                <Svg.Circle
                  fill="url(#LinearGradient1)" 
                  cx="159.572" cy="159.571" r="98.26"
                />
              </Svg>
            </View>
            <View style={styles.footer_btn_wrapper}>
              <View style={styles.footer_btn}>
                <Svg height={64} width={64} onPress={() => {Alert.alert('ACTION', 'voice')}}>
                  <Svg.Path 
                    fill="#ffffff"
                    d="M32.06,47.477c6.425-0.01,11.631-5.216,11.641-11.641V11.702c0-6.429-5.211-11.641-11.641-11.641
                      c-6.429,0-11.641,5.211-11.641,11.641v24.134C20.428,42.261,25.635,47.467,32.06,47.477z M23.363,11.702
                      c0-4.803,3.894-8.697,8.697-8.697c4.804,0,8.698,3.895,8.698,8.697v24.134c0,4.803-3.895,8.697-8.698,8.697
                      c-4.803,0-8.697-3.895-8.697-8.697V11.702z"
                    />
                  <Svg.Path 
                    fill="#ffffff"
                    d="M48.129,31.922c-0.811,0.002-1.469,0.659-1.472,1.471c0,8.153-2.957,16.997-14.598,17.026
                      c-11.641,0.029-14.716-8.873-14.716-17.026c0-0.813-0.659-1.471-1.472-1.471c-0.813,0-1.472,0.658-1.472,1.471
                      c0,9.301,3.994,19.176,16.188,19.926v7.667h-5.65c-0.813,0-1.472,0.658-1.472,1.472c0,0.813,0.659,1.471,1.472,1.471h14.229
                      c0.813,0,1.473-0.658,1.473-1.471c0-0.813-0.659-1.472-1.473-1.472h-5.636v-7.682c11.821-0.735,16.069-10.626,16.069-19.927
                      C49.593,32.571,48.936,31.922,48.129,31.922z"
                    />
                </Svg>
                <Text style={styles.footer_text}>
                  Найти
                </Text>
              </View>
            </View>
          </View>
          : 
          undefined
        }
      </View>
    );
  }

  changeTab(index){
    this.setState({
      index: index
    });
  }
  onAddTags(tags) {
    this.props.addTags(tags);
  }
  goToPath(id) {
    this.props.addToResult(id);
    this.props.navigateToPath();
  }
  goToResult() {
    this.props.navigateToResult();
  }
  goToOnplace() {
    this.props.navigateToOnplace();
  }
};


function mapDispatchToProps(dispatch) {
    return bindActionCreators({
      navigateToResult: (itemid) => navigateToResult(itemid),
      navigateToPath: navigateToPath,
      navigateToOnplace: navigateToOnplace,
      addToResult: (itemid) => addToResult(itemid),
      addTags: (tags) => addTags(tags),
    }, dispatch);
}

export default connect(
  state => {
    return {
      user: state.user,
      app: state.app
    }
  }, mapDispatchToProps
)(SearchPage);