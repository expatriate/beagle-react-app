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
import { LinearGradient, Svg, Audio } from 'expo';
import Modal from 'react-native-modalbox';

import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';

import TopMenu from '../../blocks/top-menu/';
import CartModal from '../../blocks/cart-modal/';
import ChatModal from '../../blocks/chat-modal/';
import ListModal from '../../blocks/list-modal/';

//import * as ActionCreators from '../../../actions'; //Import your actions
import {navigateToResult, navigateToForget, navigateToSearch, navigateToLanding} from '../../../actions';
import styles from './styles';

class OnplacePage extends Component {

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
        isPlaying: false,
        percentAudio: 0.001,

        item: {}
      }


      this.goToResult = this.goToResult.bind(this);
      this.playBtn = this.playBtn.bind(this);
      this.reloadBtn = this.reloadBtn.bind(this);
      this.stopBtn = this.stopBtn.bind(this);

      /*const soundObject = new Audio.Sound();
      async () => {
        try {
          await soundObject.loadAsync(require('../../../../assets/sounds/hello.mp3'));
          await soundObject.playAsync();
          // Your sound is playing!
        } catch (error) {
          // An error occurred!
        }
      }*/
  }
  async componentDidMount() {
    this.playbackObject = new Audio.Sound();
    Audio.setIsEnabledAsync(true);
    Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      playsInSilentModeIOS: true,
      playThroughEarpieceAndroid: false,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentLockedModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
    });

    await this.loadMusic();

    this.playbackObject.setOnPlaybackStatusUpdate(this._onPlaybackStatusUpdate);
  }

  _onPlaybackStatusUpdate = playbackStatus => {
    if (!playbackStatus.isLoaded) {
      if (playbackStatus.error) {
      }
    } else {
      if (playbackStatus.isPlaying) {
        let percent = ((playbackStatus.positionMillis*100)/playbackStatus.durationMillis)/100;
        if (percent - 0.002 < 0) {
          percent = 0.001
        }
        this.setState({
            percentAudio: percent
        })
      } else {
        // Update your UI for the paused state
      }

      if (playbackStatus.isBuffering) {
      }

      if (playbackStatus.didJustFinish && !playbackStatus.isLooping) {
        // The player has just finished playing and will stop. Maybe you want to play something else?
      }
    }
  };

  async componentWillUnmount() {
    await this.playbackObject.stopAsync();
  }


  componentWillMount() {
    let item = this.props.app.shop.items.find((element) => {return element.id == this.props.app.detail_page.itemId});

    this.setState({
      item: item
    });
  }

  loadMusic = async () => {
    const status = await this.playbackObject.getStatusAsync();

    this.setState({
      isPlaying: false,
      sound: status
    })
    
    if (status.isLoaded) {
      return false;
    } else if (status.isLoaded) {
      if (status.isPlaying) {
        await this.playbackObject.stopAsync();
      }
  
      await this.playbackObject.unloadAsync();
    }
  
    await this.playbackObject.loadAsync(require('../../../../assets/sounds/hello.mp3'), {progressUpdateIntervalMillis: 150.0});
    
    return true;
  }

  stopBtn = async () => {
    if (this.state.isPlaying) {
      await this.playbackObject.stopAsync();
      this.setState({
        isPlaying: false,
        percentAudio: 0.001,
      })
    }
  }

  playMusic = async () => {
    const status = await this.playbackObject.getStatusAsync();

    this.setState({
      isPlaying: true,
      sound: status
    })

    if (!status.isLoaded) {
      return false;
    }
  
    //await this.playbackObject.stopAsync();
    await this.playbackObject.playAsync();
    
    return true;
  }
  
  stopMusic = async () => {

    const status = await this.playbackObject.getStatusAsync();

    this.setState({
      isPlaying: false,
      sound: status
    })

    if (!status.isLoaded) {
      return false;
    }
    
    await this.playbackObject.stopAsync();
    
    return true;
  }

  pauseMusic = async () => {
    const status = await this.playbackObject.getStatusAsync();
    this.setState({
      isPlaying: false,
      sound: status
    })


    if (!status.isLoaded) {
      return false;
    }
    
    await this.playbackObject.pauseAsync();
    
    return true;
  }

  playBtn = async () => {

    if (this.state.isPlaying) {
      await this.pauseMusic();
    } else {
      await this.playMusic();
    }
    
  }

  reloadBtn = async () => {
    await this.stopMusic();
    if (!await this.playMusic()) {
      await this.loadMusic();
      await this.playMusic()
    }
  }

  render() {

    let tips, options;

    if (this.state.item.tips) {
      tips = this.state.item.tips.map((el, index) => {
        return(
          <View key={index} style={styles.onplace_tip}>
            <Text style={styles.onplace_tip_text}>
              { el }
            </Text>
          </View>)
      })
    }

    if (this.state.item.options) {
      options = this.state.item.options.map((el, index) => {
        return(
          <View key={el.type} style={styles.onplace_tip_option}>
            <Text style={styles.onplace_tip_text_option}>
              { el.name }
            </Text>
          </View>)
      });
    }



    return (
      <View style={[styles.container, {flex: 1}]}>
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
              <TouchableHighlight underlayColor="transparent" onPress={() => {this.props.navigateToSearch()}}>
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
            <TopMenu openCart={() => {
              this.stopBtn();this.refs.CART.open()}
            } openList={() => {
              this.stopBtn();this.refs.LIST.open()}
            } openChat={() => {
              this.stopBtn();this.refs.CHAT.open()}
            } />
          </View>
          <View style={styles.content}>
            <View style={styles.nfc}>
              <Text style={styles.title}>
                Мы на месте
              </Text>
              <Text style={styles.subtitle}>
                Найдите интересующий вас товар и поднесите телефон к метке со значком NFC
              </Text>
              <Svg height={100} width={100}>
                <Svg.Defs>
                  <Svg.LinearGradient x1="10.9258" y1="20.6152" x2="100.2183" y2="100.5275" gradientUnits="userSpaceOnUse" id="LinearGradient1">
                    <Svg.Stop stopColor="#EA3F54" offset="0"></Svg.Stop>
                    <Svg.Stop stopColor="#E53349" offset="0.1957"></Svg.Stop>
                    <Svg.Stop stopColor="#E22B42" offset="0.5152"></Svg.Stop>
                    <Svg.Stop stopColor="#E02037" offset="0.9166"></Svg.Stop>
                    <Svg.Stop stopColor="#E10C1C" offset="1"></Svg.Stop>
                  </Svg.LinearGradient>
                </Svg.Defs>
                <Svg.Path
                fill="url(#LinearGradient1)"
                d="M20.444,5.125c-3.222,0.286-6.319,1.505-8.936,3.529c-0.65,0.503-2.23,2.065-2.761,2.739
                  c-0.935,1.175-1.939,2.902-2.475,4.248c-0.479,1.204-0.814,2.452-1.049,3.878l-0.131,0.798L5.075,49.427
                  c-0.012,21.152,0,29.339,0.045,29.939c0.398,5.161,3.131,9.831,7.436,12.71c2.035,1.364,4.437,2.293,6.859,2.658
                  c1.193,0.182,2.304,0.205,8.201,0.188l5.874-0.016l-0.285-0.165c-2.698-1.552-5.133-5.59-6.473-10.723
                  c-0.776-2.97-1.141-5.429-1.493-10.07c-0.052-0.66-0.074-8.913-0.087-32.613L25.136,9.607l0.337,0.309
                  c0.188,0.171,8.267,8.171,17.962,17.786L61.063,45.18v5.474v5.474l-0.953-0.945c-1.574-1.551-20.882-20.74-24.453-24.299
                  l-3.308-3.295l-0.016,17.268c-0.018,17.426,0,19.313,0.194,22.564c0.433,7.351,1.465,12.836,3.182,16.925
                  c0.332,0.787,1.112,2.305,1.545,3.006c0.89,1.43,2.475,3.193,3.696,4.1c2.035,1.518,4.441,2.562,7.527,3.256l1.009,0.234
                  l15.015-0.023c16.503-0.017,15.208,0.012,17.01-0.353c5.481-1.107,10.191-5.094,12.25-10.355c0.49-1.26,0.799-2.453,1.044-4.044
                  c0.091-0.616,0.102-2.354,0.119-29.568c0.012-19.695,0-29.179-0.046-29.749c-0.108-1.585-0.348-2.794-0.821-4.237
                  c-2.133-6.421-7.852-10.915-14.604-11.491c-0.411-0.035-3.165-0.058-6.844-0.058h-6.157l0.329,0.188
                  c0.571,0.321,1.021,0.68,1.694,1.352c2.651,2.641,4.607,7.26,5.584,13.172c0.308,1.876,0.507,3.731,0.7,6.53
                  c0.045,0.712,0.068,9.278,0.086,32.526l0.022,31.553l-0.223-0.188C74.52,90.087,68.521,84.15,61.313,77
                  c-7.208-7.151-15.197-15.067-17.741-17.593l-4.636-4.59v-5.498v-5.492l10.566,10.51c5.805,5.781,12.272,12.22,14.372,14.302
                  l3.802,3.792v-17.25c0-9.974-0.023-17.981-0.057-18.984c-0.325-10.23-1.563-17.062-3.963-21.885
                  c-0.873-1.756-1.774-3.057-2.995-4.311c-1.259-1.295-2.515-2.202-4.19-3.029c-1.517-0.746-3.057-1.272-5.036-1.716l-0.878-0.194
                  L35.754,5.068C27.605,5.073,20.723,5.097,20.444,5.125z"
                />
              </Svg>
              <TouchableHighlight underlayColor="transparent"  onPress={() => {this.goToResult()}}>
                <View style={styles.result_btn}>
                  <Text style={styles.result_btn_text}>
                    Открыть
                  </Text>
                </View>
              </TouchableHighlight>
            </View>
            <View style={[styles.image_wrapper]}>
              <View style={styles.details_image}>
                <Svg width={203.121} height={80.25}>
                  <Svg.Defs>
                    <Svg.LinearGradient x1="0" y1="80.25" x2="203.121" y2="80.25" id="LinearGradient2">
                      <Svg.Stop stopColor="#696969" offset="0"></Svg.Stop>
                      <Svg.Stop stopColor="#696969" offset={parseFloat(this.state.percentAudio)-0.001+''}></Svg.Stop>
                      <Svg.Stop stopColor="#d4d4d4" offset={parseFloat(this.state.percentAudio)-0.0005+''}></Svg.Stop>
                      <Svg.Stop stopColor="#d4d4d4" offset="1"></Svg.Stop>
                    </Svg.LinearGradient>
                  </Svg.Defs>
                  <Svg.Path
                    fill="url(#LinearGradient2)"
                    d="M5.91,60.791c0,0.942-0.763,1.705-1.705,1.705l0,0c-0.942,0-1.705-0.763-1.705-1.705V21.578
                      c0-0.941,0.763-1.705,1.705-1.705l0,0c0.941,0,1.705,0.763,1.705,1.705V60.791z M12.676,11.535c0-0.926-0.752-1.678-1.678-1.678l0,0
                      c-0.927,0-1.678,0.752-1.678,1.678v60.792c0,0.926,0.751,1.678,1.678,1.678l0,0c0.926,0,1.678-0.752,1.678-1.678V11.535z
                       M19.496,1.705C19.496,0.763,18.732,0,17.791,0l0,0c-0.941,0-1.705,0.763-1.705,1.705v77.84c0,0.942,0.764,1.705,1.705,1.705l0,0
                      c0.941,0,1.705-0.763,1.705-1.705V1.705z M26.315,5.594c0-0.941-0.763-1.705-1.705-1.705l0,0c-0.942,0-1.705,0.764-1.705,1.705
                      v68.41c0,0.942,0.763,1.705,1.705,1.705l0,0c0.941,0,1.705-0.763,1.705-1.705V5.594z M39.902,15.291
                      c0-0.941-0.764-1.705-1.705-1.705l0,0c-0.941,0-1.705,0.764-1.705,1.705v50.685c0,0.942,0.764,1.705,1.705,1.705l0,0
                      c0.941,0,1.705-0.763,1.705-1.705V15.291z M46.721,8.471c0-0.941-0.763-1.705-1.705-1.705l0,0c-0.942,0-1.705,0.763-1.705,1.705
                      v63.828c0,0.942,0.763,1.705,1.705,1.705l0,0c0.941,0,1.705-0.763,1.705-1.705V8.471z M60.308,18.701
                      c0-0.941-0.764-1.705-1.705-1.705l0,0c-0.941,0-1.705,0.763-1.705,1.705v44.008c0,0.942,0.764,1.705,1.705,1.705l0,0
                      c0.941,0,1.705-0.763,1.705-1.705V18.701z M67.127,6.979c0-0.941-0.763-1.705-1.705-1.705l0,0c-0.942,0-1.705,0.764-1.705,1.705
                      v65.853c0,0.942,0.763,1.705,1.705,1.705l0,0c0.941,0,1.705-0.763,1.705-1.705V6.979z M73.894,15.291
                      c0-0.941-0.764-1.705-1.705-1.705l0,0c-0.941,0-1.705,0.764-1.705,1.705v50.685c0,0.942,0.764,1.705,1.705,1.705l0,0
                      c0.941,0,1.705-0.763,1.705-1.705V15.291z M80.713,21.578c0-0.941-0.763-1.705-1.705-1.705l0,0c-0.941,0-1.705,0.763-1.705,1.705
                      v38.291c0,0.942,0.764,1.705,1.705,1.705l0,0c0.941,0,1.705-0.763,1.705-1.705V21.578z M87.506,11.562
                      c0-0.941-0.764-1.705-1.705-1.705l0,0c-0.941,0-1.705,0.764-1.705,1.705v58.536c0,0.942,0.764,1.705,1.705,1.705l0,0
                      c0.941,0,1.705-0.763,1.705-1.705V11.562z M94.272,17.218c0-0.927-0.751-1.678-1.678-1.678l0,0c-0.927,0-1.678,0.751-1.678,1.678
                      v47.505c0,0.929,0.751,1.679,1.678,1.679l0,0c0.927,0,1.678-0.75,1.678-1.679V17.218z M101.092,22.004
                      c0-0.941-0.764-1.705-1.705-1.705l0,0c-0.941,0-1.705,0.763-1.705,1.705v37.864c0,0.942,0.763,1.705,1.705,1.705l0,0
                      c0.941,0,1.705-0.763,1.705-1.705V22.004z M107.912,26.16c0-0.941-0.764-1.705-1.705-1.705l0,0c-0.941,0-1.705,0.763-1.705,1.705
                      v29.73c0,0.942,0.764,1.705,1.705,1.705l0,0c0.941,0,1.705-0.763,1.705-1.705V26.16z M114.678,13.666
                      c0-0.927-0.751-1.678-1.678-1.678l0,0c-0.927,0-1.678,0.751-1.678,1.678v54.61c0,0.926,0.751,1.679,1.678,1.679l0,0
                      c0.927,0,1.678-0.753,1.678-1.679V13.666z M121.498,5.062c0-0.941-0.764-1.705-1.705-1.705l0,0c-0.941,0-1.705,0.764-1.705,1.705
                      v72.14c0,0.942,0.764,1.704,1.705,1.704l0,0c0.941,0,1.705-0.762,1.705-1.704V5.062z M128.317,12.733
                      c0-0.941-0.763-1.705-1.705-1.705l0,0c-0.941,0-1.705,0.763-1.705,1.705v58.394c0,0.942,0.764,1.705,1.705,1.705l0,0
                      c0.941,0,1.705-0.763,1.705-1.705V12.733z M135.084,19.42c0-0.926-0.751-1.678-1.678-1.678l0,0c-0.927,0-1.678,0.752-1.678,1.678
                      v45.304c0,0.929,0.751,1.679,1.678,1.679l0,0c0.927,0,1.678-0.75,1.678-1.679V19.42z M141.904,26.16
                      c0-0.941-0.764-1.705-1.705-1.705l0,0c-0.941,0-1.705,0.763-1.705,1.705v31.967c0,0.942,0.764,1.705,1.705,1.705l0,0
                      c0.941,0,1.705-0.763,1.705-1.705V26.16z M148.723,31.168c0-0.941-0.763-1.705-1.705-1.705l0,0c-0.941,0-1.705,0.764-1.705,1.705
                      v20.886c0,0.941,0.764,1.705,1.705,1.705l0,0c0.941,0,1.705-0.764,1.705-1.705V31.168z M155.49,12.707
                      c0-0.927-0.752-1.678-1.678-1.678l0,0c-0.927,0-1.678,0.751-1.678,1.678v55.569c0,0.926,0.751,1.679,1.678,1.679l0,0
                      c0.926,0,1.678-0.753,1.678-1.679V12.707z M162.31,2.611c0-0.942-0.764-1.705-1.705-1.705l0,0c-0.941,0-1.705,0.763-1.705,1.705
                      v75.583c0,0.942,0.764,1.705,1.705,1.705l0,0c0.941,0,1.705-0.763,1.705-1.705V2.611z M169.129,5.062
                      c0-0.941-0.764-1.705-1.705-1.705l0,0c-0.941,0-1.704,0.764-1.704,1.705V75.21c0,0.942,0.763,1.704,1.704,1.704l0,0
                      c0.941,0,1.705-0.762,1.705-1.704V5.062z M175.896,12.104c0-0.927-0.752-1.678-1.679-1.678l0,0c-0.926,0-1.678,0.751-1.678,1.678
                      v57.025c0,0.926,0.752,1.679,1.678,1.679l0,0c0.927,0,1.679-0.753,1.679-1.679V12.104z M182.715,23.922
                      c0-0.942-0.763-1.705-1.705-1.705l0,0c-0.941,0-1.704,0.763-1.704,1.705v34.807c0,0.942,0.763,1.705,1.704,1.705l0,0
                      c0.942,0,1.705-0.763,1.705-1.705V23.922z M189.535,9.714c0-0.942-0.764-1.705-1.705-1.705l0,0c-0.941,0-1.705,0.763-1.705,1.705
                      v60.383c0,0.942,0.764,1.705,1.705,1.705l0,0c0.941,0,1.705-0.763,1.705-1.705V9.714z M196.301,19.42
                      c0-0.926-0.751-1.678-1.678-1.678l0,0c-0.927,0-1.679,0.752-1.679,1.678v42.746c0,0.93,0.752,1.679,1.679,1.679l0,0
                      c0.927,0,1.678-0.749,1.678-1.679V19.42z M203.121,9.146c0-0.941-0.764-1.705-1.705-1.705l0,0c-0.941,0-1.705,0.764-1.705,1.705
                      v63.686c0,0.942,0.764,1.705,1.705,1.705l0,0c0.941,0,1.705-0.763,1.705-1.705V9.146z M53.488,29.969
                      c0-0.927-0.752-1.678-1.678-1.678l0,0c-0.927,0-1.678,0.751-1.678,1.678v24.775c0,0.926,0.751,1.678,1.678,1.678l0,0
                      c0.926,0,1.678-0.752,1.678-1.678V29.969z M33.082,33.192c0-0.941-0.764-1.705-1.705-1.705l0,0c-0.941,0-1.705,0.763-1.705,1.705
                      v17.689c0,0.94,0.763,1.705,1.705,1.705l0,0c0.941,0,1.705-0.765,1.705-1.705V33.192z"
                    />
                </Svg>
              </View>
              { !this.state.isPlaying ? 
                <TouchableHighlight style={styles.voice_play} underlayColor="transparent" onPress={this.playBtn}>
                  <Svg height={64} width={64}>
                    <Svg.Path
                    fill="#E10C1C"
                    d="M32,0C14.355,0,0,14.355,0,32c0,17.645,14.355,32,32,32c17.645,0,32-14.355,32-32C64,14.355,49.645,0,32,0z M48.601,32.881
                      l-23.467,16c-0.18,0.123-0.39,0.186-0.601,0.186c-0.17,0-0.342-0.04-0.498-0.123c-0.35-0.186-0.568-0.548-0.568-0.943V16
                      c0-0.396,0.219-0.758,0.568-0.943c0.35-0.186,0.772-0.16,1.1,0.062l23.467,16c0.29,0.198,0.465,0.527,0.465,0.881
                      S48.892,32.683,48.601,32.881z"
                    />
                  </Svg>
                </TouchableHighlight>
                :
                <TouchableHighlight style={styles.voice_play} underlayColor="transparent" onPress={this.playBtn}>
                  <Svg height={64} width={64}>
                    <Svg.Path
                    fill="#E10C1C"
                    d="M31.947,0C14.376,0,0,14.376,0,31.947c0,17.57,14.376,31.947,31.947,31.947c17.57,0,31.947-14.377,31.947-31.947
                    C63.895,14.376,49.518,0,31.947,0z M28.752,44.726h-6.389V19.168h6.389V44.726z M41.531,44.726h-6.389V19.168h6.389V44.726z"
                    />
                  </Svg>
                </TouchableHighlight> 
              }
              <TouchableHighlight style={styles.voice_play_reload} underlayColor="transparent" onPress={this.reloadBtn}>
                <Svg height={32} width={32}>
                  <Svg.Path
                  fill="#d4d4d4"
                  d="M16.964,5.429V1.535L9.25,7.321l7.715,5.786V9.301c4.34,0.48,7.714,4.159,7.714,8.627
                    c0,4.792-3.887,8.679-8.679,8.679c-4.793,0-8.679-3.887-8.679-8.679c0-0.325,0.02-0.647,0.052-0.964H3.5
                    c-0.023,0.318-0.037,0.641-0.037,0.964c0,6.924,5.613,12.537,12.537,12.537s12.537-5.613,12.537-12.537
                    C28.537,11.329,23.438,5.92,16.964,5.429z"
                  />
                </Svg>
              </TouchableHighlight> 
            </View>
            <View style={[styles.row]}>
              <Text style={styles.onplace_title}>
                Какие характеристики стоит учесть
              </Text>
            </View>
            { options }
            <View style={styles.row}>
              <Text style={styles.onplace_title}>
                Полезная информация
              </Text>
            </View>
            { tips }
            <View style={{height:50}}>
            </View>
          </View>
        </ScrollView>
      </View>);
  }

  goToResult() {
    this.stopBtn();
    this.props.navigateToLanding();
  }
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
      navigateToLanding: navigateToLanding,
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
)(OnplacePage);