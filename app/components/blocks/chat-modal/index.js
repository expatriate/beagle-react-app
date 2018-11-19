import React, { Component } from 'react';
import {
    View,
    Text,
    ScrollView,
    Image,
    Alert,
    Dimensions,
    TouchableHighlight,
    TextInput,
    KeyboardAvoidingView,
    Platform
} from 'react-native';

import Modal from 'react-native-modalbox';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { sendUserMessage, sendBotMessage, navigateToPath, addToResult} from '../../../actions';

import { Svg, LinearGradient } from 'expo';

import styles from './styles';

class ChatModal extends Component {
    constructor(props) {
      super(props);

      this.state = {
        message: '',
        botShouldAnswer: false,
        applied: [],
      };

      this.onSend = this.onSend.bind(this);
      this.onTyping = this.onTyping.bind(this);
      this.botAnswer = this.botAnswer.bind(this);
      this.onBotAnswer = this.onBotAnswer.bind(this); 
    }

    componentWillMount() {
      if (!this.props.app.chat.items.length) {
        this.onBotAnswer('Привет! 🙋‍♂️ Давай найдем нужный нам товар. Напиши его название.', []);
      }
    }

    onSend() {
      if (this.state.message.length) {
        this.props.sendUserMessage(this.state.message)
      }

      this.setState({
        message: '',
        botShouldAnswer: true,
        /*lastVariants: [],*/
      });

      this.goToPath = this.goToPath.bind(this);

      setTimeout(() => {
        this.botAnswer();
      }, 500);
    }

    onBotAnswer(text, vars) {
      this.props.sendBotMessage(text, vars)
    }

    botAnswer() {
      if (this.props.app.chat.items.length && this.props.app.chat.items[this.props.app.chat.items.length - 1].type == 'user') {
        let lastUserAnswer = this.props.app.chat.items[this.props.app.chat.items.length - 1].text;

        let words = lastUserAnswer.split(' ');
        let applied = [];

        for (let i = 0; i < this.props.app.tags.length; i++) {
          for (let j = 0; j < words.length; j++) {
            if (this.props.app.tags[i].indexOf(words[j].toLowerCase()) >= 0 && words[j] != '') {
              applied.push(words[j].toLowerCase());
            }
          }
        }

        let appliedSorted = [];

        for (let k = 0; k < applied.length; k++) {
          if (appliedSorted.indexOf(applied[k]) < 0) {
            appliedSorted.push(applied[k]);
          }
        }
        this.setState({
          applied: appliedSorted
        });

        let variants = [];

        for (let m = 0; m < this.props.app.shop.items.length; m++) {
          let product = this.props.app.shop.items[m];
          for (let n = 0; n < product.tags.length; n++) {
            for (let o = 0; o < appliedSorted.length; o++) {
              if (product.tags[n].indexOf(appliedSorted[o]) >= 0 && variants.indexOf(product) < 0) {
                variants.push(product)
              }
            }
          }
        }
/*
        this.setState({
          lastVariants: {
            messageId: this.props.app.chat.items.length,
            items: variants
          }
        })*/
        if (variants.length) {
          this.onBotAnswer('Вот что я смог найти:', variants);
        } else {
          this.onBotAnswer('К сожалению, я ничего не нашел 🤷‍♂️ попробуйте спросить что либо еще.', []);
        }
      }
    }

    onTyping(text) {
      this.setState({
        message: text
      })
    }

    goToPath(id) {
      this.props.addToResult(id);
      this.props.navigateToPath();
    }

    render() {

      let variants = [];

      let items = this.props.app.chat.items.map((el, index) => {
        if (el.type == 'bot') {
          variants = el.variants.map((vars, index) => {
            return(
              <View key={index+'_variant'} style={styles.variant}>
                <View style={styles.col}>
                  <Image
                    source={{uri: vars.image}}
                    style={styles.variant_image}
                    resizeMode='contain'
                    />
                </View>
                <View style={[styles.col, {marginLeft: 20}]}>
                  <Text style={styles.variant_name}>
                    { vars.name }
                  </Text>                
                  <TouchableHighlight underlayColor="transparent" onPress={() => {this.goToPath(vars.id)}}>
                    <View style={[styles.result_btn]}>
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
                </View>
              </View>)
          });
          return(
            <View key={el.id} style={[styles.bot]}>
              <View style={[styles.row]}>
                <View style={styles.bot_avatar}>
                  <Svg height={32} width={32}>
                    <Svg.Path 
                      fill="#E10C1C" 
                      fill-rule="evenodd" clip-rule="evenodd"
                      d="M21.955,23.522c-0.495,1.008-1.354,1.662-2.205,2.288
                        c-3.875,2.857-9.34,2.854-13.233,0.025c-1.765-1.282-1.826-3.276-0.044-4.521c2.014-1.404,4.333-1.865,6.756-1.864
                        c0.179,0,0.428,0.019,0.526,0.132c0.853,0.984,1.352,0.13,1.813-0.392c0.617-0.697,0.348-1.386-0.283-1.94
                        c-0.471-0.415-0.983-0.784-1.65-1.31c2.649,0,5.126,0,7.736,0c-0.425-0.522-0.904-0.489-1.298-0.646
                        c-0.779-0.31-1.282-0.814-1.026-1.7c0.251-0.862,0.888-1.138,1.744-0.897c2.818,0.792,5.637,1.583,8.452,2.38
                        c0.62,0.175,0.695,0.472,0.191,0.912c-2.324,2.024-4.634,4.063-6.966,6.078c-0.607,0.524-1.32,0.596-1.906-0.002
                        c-0.579-0.594-0.485-1.276,0.024-1.909c0.154-0.191,0.432-0.301,0.411-0.861c-1.307,0-2.622-0.012-3.938,0.005
                        c-0.504,0.007-0.767,0.421-1.048,0.758c-0.817,0.977-1.808,1.563-3.098,1.787c-1.595,0.276-2.918,1.24-4.288,2.046
                        c-0.54,0.318-0.561,0.718,0.01,1.108c0.628,0.429,1.304,0.696,2.057,0.773c2.978,0.303,5.946,0.582,8.456-1.608
                        C19.936,23.475,20.838,23.133,21.955,23.522z"
                      />
                    <Svg.Path 
                      fill="#E10C1C" 
                      fill-rule="evenodd" clip-rule="evenodd"
                      d="M4.727,11.523c0.471,0.283,0.892,0.198,1.277,0.167
                        c2.963-0.245,5.381,1.107,7.751,2.606c0.238,0.15,0.604,0.304,0.515,0.647c-0.099,0.381-0.491,0.234-0.768,0.239
                        c-0.257,0.004-0.576,0.052-0.763-0.074c-3.135-2.095-6.526-1.721-9.951-1.079c-0.141,0.026-0.286,0.023-0.551,0.043
                        c0.326-1.688,1.083-3.091,2.088-4.363c4.557-5.76,13.422-5.626,17.804,0.274c0.209,0.283,0.798,0.679,0.393,0.979
                        c-0.393,0.291-1.072,0.295-1.502-0.244c-0.162-0.203-0.326-0.405-0.498-0.599C16.479,5.555,9.165,5.752,5.384,10.533
                        C5.141,10.839,4.949,11.186,4.727,11.523z"
                      />
                    <Svg.Path 
                      fill="#E10C1C" 
                      fill-rule="evenodd" clip-rule="evenodd"
                      d="M10.813,15.634c0.51,0.068,1.059,0,1.137,0.578
                        c0.054,0.396-0.335,0.596-0.685,0.522c-0.489-0.104-1.171-0.181-1.231-0.754C9.974,15.408,10.625,15.843,10.813,15.634z"
                      />
                  </Svg>
                </View>
                <View style={[styles.bot_message]}>
                  <View style={styles.bot_message_content}>
                    <Text style={styles.bot_message_text}>
                      { el.text }
                    </Text>
                    <View style={styles.variants_wrapper}>
                      { variants }
                    </View>
                  </View>
                  <Text style={styles.bot_time}>
                    { el.time }
                  </Text>
                </View>
              </View>
            </View>)
        }
        if (el.type == 'user')
          return(
            <View key={el.id} style={[styles.row, styles.user]}>
              <View style={styles.user_message}>
                <LinearGradient
                    colors={['#EA3F54', '#E10C1C']}
                    start={[0, 0]}
                    end={[1, 0]}
                    style={styles.user_message_content}>
                    <Text style={styles.user_message_text}>
                      { el.text }
                    </Text>
                </LinearGradient>
                <Text style={styles.user_time}>
                  { el.time }
                </Text>
              </View>
            </View>)
      });
      
      return (
        <KeyboardAvoidingView 
          style={styles.modal} 
          behavior={"padding"} 
          keyboardVerticalOffset={
          Platform.select({
             ios: () => 5,
             android: () => 5
          })()}>
          <LinearGradient
            colors={['#E10C1C', '#E10C1C']}
            start={[0, 0]}
            end={[1, 0]}>
            <View style={[styles.row, styles.modal_header]}>
              <Text style={styles.modal_title}>
                Чат
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
            <ScrollView 
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={{alignSelf: 'flex-start', justifyContent: 'flex-start', paddingTop: 20,}}
              ref={ref => this.scrollView = ref}
              onContentSizeChange={(contentWidth, contentHeight)=>{        
                  this.scrollView.scrollToEnd({animated: true});
              }}>
              { items }
            </ScrollView>
          </View>
          <View style={[styles.modal_footer, styles.row]}>
            <TextInput 
              style={styles.textInput}
              placeholder="Введите сообщение"
              onSubmitEditing={() => this.onSend()}
              onChangeText={(text) => this.onTyping(text)}
              value={this.state.message}
            />
            <TouchableHighlight underlayColor="transparent" onPress={() => {this.onSend()}}>
              <Svg height={32} width={32} style={styles.modal_enter}>
                <Svg.Path 
                  fill="#E10C1C" 
                  d="M19.249,10.071V2.957l11.793,11.857L19.249,26.672v-7.114c0,0-10.471-2.535-17.625,9.485
                    c0,0-1.782-9.174,6.207-15.822C7.831,13.221,11.45,9.836,19.249,10.071z"
                  />
              </Svg>
            </TouchableHighlight>
          </View>
        </KeyboardAvoidingView>
      );
    }
};


function mapDispatchToProps(dispatch) {
    return bindActionCreators({
      sendUserMessage: (text) => sendUserMessage(text),
      sendBotMessage: (text, vars) => sendBotMessage(text, vars),
      navigateToPath: navigateToPath,
      addToResult: (itemid) => addToResult(itemid),
    }, dispatch);
}

//Connect everything
export default connect(
  state => {
    return {
      app: state.app,
    }
  }, mapDispatchToProps
)(ChatModal);