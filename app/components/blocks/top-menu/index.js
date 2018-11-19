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
} from 'react-native';
import Modal from 'react-native-modalbox';

import { LinearGradient, Svg } from 'expo';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import CartModal from '../cart-modal/';
import ChatModal from '../chat-modal/';
import ListModal from '../list-modal/';

import { navigateToSearch, navigateToOnplace } from '../../../actions';
import { NavigationActions } from "react-navigation";

import styles from './styles';

class TopMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modal: undefined, // 'CART', 'LIST', 'CHAT'
      isOpen: false,
      isDisabled: false,
      swipeToClose: false,
      sliderValue: 0.3,
      showBack: true
    }

    this.goToSearch = this.goToSearch.bind(this);
    this.onBack = this.onBack.bind(this);
  }

  componentDidMount() {
    if (this.props.hideBack) {
      this.setState({
        showBack: false
      })
    }
    //this.props.getUserData(this.props.user.user_id);
  }

  setModalVisible(modal) {
    if (modal) {
      this.setState({modal: modal, isOpen: true});
    } else {
      this.setState({modal: undefined, isOpen: false});
    }
  }

  onBack() {
    if (this.props.nav.routes.length > 4) {
      this.props.navigateToOnplace();
    } else {
      this.props.navigateToSearch();
    }
  }


  render() {

    let backBtn, cartcounter, listcounter;

    if (this.state.showBack) {
      backBtn = 
        <TouchableHighlight underlayColor="transparent" onPress={this.onBack} style={styles.head_icon_wrapper}>
          <Svg height={32} width={32} style={styles.head_icon} disabled>
          <Svg.Path 
            fill="#E30719" 
            d="M24.313,14.531l0.029,0.007H11.808l3.941-3.949c0.192-0.192,0.299-0.455,0.299-0.728c0-0.274-0.105-0.534-0.299-0.727
              l-0.614-0.613c-0.192-0.193-0.45-0.3-0.724-0.3S13.88,8.327,13.687,8.52l-6.754,6.753c-0.194,0.194-0.3,0.452-0.299,0.727
              c-0.001,0.275,0.105,0.534,0.299,0.727l6.754,6.754c0.193,0.193,0.45,0.299,0.725,0.299c0.274,0,0.531-0.105,0.724-0.299
              l0.614-0.613c0.192-0.191,0.299-0.448,0.299-0.723c0-0.273-0.105-0.519-0.299-0.711l-3.985-3.971h12.563
              c0.566,0,1.039-0.486,1.039-1.05v-0.868C25.365,14.98,24.879,14.531,24.313,14.531z"
            disabled/>
          </Svg>
        </TouchableHighlight>
    }

    if (this.props.app.cart.items.length) {
      cartcounter = <View style={styles.counter}>
        <Text style={styles.counter_text}>
          {this.props.app.cart.items.length}
        </Text>
      </View>
    }

    if (this.props.app.list.items.length) {
      listcounter = <View style={styles.counter}>
        <Text style={styles.counter_text}>
          {this.props.app.list.items.length}
        </Text>
      </View>
    }
    
    return (
      <View style={[styles.head_icons, styles.row]}>
        
        {backBtn}
        
        <TouchableHighlight underlayColor="transparent" onPress={this.props.openCart} style={styles.head_icon_wrapper}>
          <View style={styles.head_icon_relative}>
            { cartcounter }
            <Svg height={32} width={32} style={styles.head_icon} disabled>
              <Svg.Path 
                disabled
                fill="#E30719" 
                d="M22.535,20.873c-1.539,0-2.793,1.253-2.793,2.793c0,1.541,1.254,2.793,2.793,2.793c1.541,0,2.793-1.252,2.793-2.793
                  C25.328,22.126,24.076,20.873,22.535,20.873z M22.535,24.783c-0.615,0-1.117-0.501-1.117-1.117c0-0.615,0.502-1.117,1.117-1.117
                  c0.617,0,1.117,0.502,1.117,1.117C23.652,24.282,23.152,24.783,22.535,24.783z"
                />
              <Svg.Path 
                fill="#E30719"
                disabled 
                d="M27.022,10.079c-0.159-0.203-0.401-0.321-0.661-0.321H9.973L9.218,6.602c-0.09-0.377-0.427-0.644-0.815-0.644H5.637
                  C5.175,5.958,4.8,6.334,4.8,6.797c0,0.462,0.375,0.838,0.837,0.838h2.103l2.724,11.395c0.091,0.377,0.428,0.644,0.815,0.644
                  h13.045c0.385,0,0.72-0.263,0.813-0.637l2.039-8.24C27.236,10.546,27.182,10.281,27.022,10.079z M23.668,17.996H11.941
                  l-1.568-6.563h14.918L23.668,17.996z"
                />
              <Svg.Path 
                fill="#E30719" 
                disabled
                d="M12.397,20.873c-1.541,0-2.793,1.253-2.793,2.793c0,1.541,1.253,2.793,2.793,2.793c1.54,0,2.792-1.252,2.792-2.793
                  C15.189,22.126,13.938,20.873,12.397,20.873z M12.397,24.783c-0.616,0-1.118-0.501-1.118-1.117c0-0.615,0.502-1.117,1.118-1.117
                  c0.616,0,1.117,0.502,1.117,1.117C13.515,24.282,13.013,24.783,12.397,24.783z"
                />
            </Svg>
          </View>
        </TouchableHighlight>

        <TouchableHighlight underlayColor="transparent" onPress={this.props.openList} style={styles.head_icon_wrapper}>
          <View>
            { listcounter }
            <Svg height={32} width={32} style={styles.head_icon} disabled>
              <Svg.Path 
                fill="#E30719" 
                disabled
                d="M7.758,4.653c-1.642,0-2.972,1.332-2.972,2.976s1.331,2.976,2.972,2.976c1.641,0,2.972-1.332,2.972-2.976
                  C10.729,5.985,9.398,4.653,7.758,4.653z M7.758,9.03c-0.771,0-1.399-0.628-1.399-1.401s0.627-1.4,1.399-1.4s1.398,0.628,1.398,1.4
                  S8.529,9.03,7.758,9.03z M13.701,8.417h12.63c0.435,0,0.786-0.353,0.786-0.787c0-0.437-0.352-0.789-0.786-0.789h-12.63
                  c-0.435,0-0.787,0.352-0.787,0.789C12.914,8.064,13.266,8.417,13.701,8.417z M7.758,12.532c-1.642,0-2.972,1.333-2.972,2.977
                  c0,1.644,1.331,2.977,2.972,2.977c1.641,0,2.972-1.333,2.972-2.977C10.729,13.865,9.398,12.532,7.758,12.532z M7.758,16.91
                  c-0.771,0-1.399-0.628-1.399-1.401s0.627-1.401,1.399-1.401s1.398,0.629,1.398,1.401S8.529,16.91,7.758,16.91z M26.331,14.721
                  h-12.63c-0.435,0-0.787,0.353-0.787,0.788c0,0.435,0.353,0.788,0.787,0.788h12.63c0.435,0,0.786-0.354,0.786-0.788
                  C27.117,15.074,26.766,14.721,26.331,14.721z M7.758,20.41c-1.642,0-2.972,1.334-2.972,2.979c0,1.643,1.331,2.977,2.972,2.977
                  c1.641,0,2.972-1.334,2.972-2.977C10.73,21.744,9.398,20.41,7.758,20.41z M7.758,24.79c-0.771,0-1.399-0.629-1.399-1.401
                  c0-0.773,0.627-1.401,1.399-1.401s1.398,0.628,1.398,1.401C9.156,24.161,8.529,24.79,7.758,24.79z M26.331,22.6h-12.63
                  c-0.435,0-0.787,0.354-0.787,0.789c0,0.435,0.353,0.787,0.787,0.787h12.63c0.435,0,0.786-0.353,0.786-0.787
                  C27.117,22.953,26.766,22.6,26.331,22.6z"
                />
            </Svg>
          </View>
        </TouchableHighlight>

        <TouchableHighlight underlayColor="transparent" onPress={this.props.openChat} style={styles.head_icon_wrapper}>
          <Svg height={32} width={32} style={styles.head_icon} disabled>
            <Svg.Path 
              fill="#E30719" 
              disabled
              d="M21.309,10.908c-0.867,0-1.572,0.694-1.572,1.551s0.705,1.551,1.572,1.551s1.572-0.694,1.572-1.551
                C22.881,11.602,22.176,10.908,21.309,10.908z M16.068,10.908c-0.868,0-1.572,0.694-1.572,1.551s0.704,1.551,1.572,1.551
                c0.867,0,1.572-0.694,1.572-1.551C17.641,11.602,16.936,10.908,16.068,10.908z M10.829,10.908c-0.868,0-1.572,0.694-1.572,1.551
                s0.703,1.551,1.572,1.551s1.572-0.694,1.572-1.551C12.401,11.602,11.698,10.908,10.829,10.908z M27.148,7.031
                c-0.018-0.073-0.045-0.188-0.096-0.32c-0.326-0.846-0.951-1.384-1.845-1.595l-0.031-0.01L24.971,5.05H7.085L6.873,5.11l-0.038,0.01
                L6.772,5.138c-0.931,0.255-1.608,0.877-1.87,1.791l-0.01,0.025L4.8,7.208v10.164l0.012,0.034c0.003,0.113,0.006,0.26,0.009,0.396
                c0.013,0.564,0.014,0.597,0.049,0.758c0.229,1.041,1.095,1.89,2.153,2.051c0.165,0.025,0.356,0.031,0.852,0.031h0.202h0.085
                c0.073,0.002,0.073,0.002,0.272,0.004c0.002,0.902,0.003,2.389,0.006,4.383c0,0.848,0.75,1.605,1.575,1.845
                c0.178,0.05,0.362,0.075,0.547,0.075c0.667,0,1.279-0.328,1.639-0.883c2.318-3.563,3.182-4.826,3.52-5.373l4.285,0.001l4.612-0.001
                c0.882,0,1.608-0.48,2.123-1.197c0.14-0.193,0.246-0.395,0.322-0.604l0.139-0.195V7.226L27.148,7.031z M25.67,18.291
                c-0.004,0.008-0.012,0.014-0.013,0.02c-0.016,0.141-0.075,0.264-0.157,0.374c-0.217,0.302-0.512,0.458-0.887,0.458
                c-1.609,0-3.001,0-4.611,0c-1.57,0-3.137,0-4.706,0c-0.353,0-0.602,0.156-0.756,0.469c-0.132,0.267-2.471,3.779-3.665,5.615
                c-0.071,0.109-0.191,0.172-0.316,0.172c-0.036,0-0.245-0.006-0.279-0.016c-0.161-0.045-0.271-0.19-0.271-0.355
                c-0.001-1.922-0.005-5.277-0.01-5.3c-0.086-0.339-0.387-0.575-0.747-0.585c-0.186-0.005-0.875-0.004-1.062-0.008
                c-0.023,0-0.064,0-0.115,0h-0.2c-0.239,0-0.53-0.001-0.613-0.014c-0.422-0.064-0.765-0.394-0.855-0.804
                c-0.007-0.032-0.022-1.097-0.033-1.128v-9.71c0.011-0.031,0.026-0.062,0.033-0.093c0.106-0.415,0.368-0.682,0.788-0.796
                C7.23,6.58,7.268,6.568,7.305,6.559h17.451c0.025,0.006,0.049,0.014,0.074,0.019c0.389,0.088,0.656,0.315,0.797,0.684
                c0.021,0.053,0.029,0.111,0.045,0.167v10.863H25.67z"
              />
          </Svg>
        </TouchableHighlight>
      </View>
    );
  }

  goToSearch() {
    this.props.navigateToSearch();
  }
};


function mapDispatchToProps(dispatch) {
    return bindActionCreators({
      navigateToSearch: navigateToSearch,
      navigateToOnplace: navigateToOnplace,
    }, dispatch);
}

export default connect(
  state => {
    return {
      user: state.user,
      app: state.app,
      nav: state.nav
    }
  }, mapDispatchToProps
)(TopMenu);