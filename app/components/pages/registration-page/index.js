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
    TouchableHighlight,
    Alert,
    Button,
    TextInput,
    KeyboardAvoidingView
} from 'react-native';
import { LinearGradient, Svg } from 'expo';

import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';

//import * as ActionCreators from '../../../actions'; //Import your actions
import {registration} from '../../../actions';
import styles from './styles';

class RegistrationPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      first_name: '',
      second_name: '',
      email: '',
      password: '',
      sex: 1
    }

    this.tryToRegister = this.tryToRegister.bind(this);
  }

  componentDidMount() {
      //this.props.getData(); //call our action
  }

  render() {
    return (
      <View style={styles.registrationContainer}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <KeyboardAvoidingView behavior="padding" enabled style={styles.contentAtCenter}>
            <TouchableHighlight style={{width: '100%'}} onPress={this.goToRegistration} underlayColor="transparent">
              <View style={styles.buttonSociallogin}>
                <Text style={styles.buttonSocialloginText}>Войти через Вконтакт</Text>
                <Svg style={styles.buttonSocialloginIcon} height={30} width={30}>
                  <Svg.Path 
                    fill="#D8DFE5" 
                    d="M28.295,21.496c-0.031-0.073-0.063-0.131-0.093-0.179c-0.476-0.859-1.386-1.912-2.73-3.16l-0.028-0.029l-0.016-0.014
                      l-0.013-0.014h-0.013c-0.61-0.582-1-0.974-1.159-1.173c-0.297-0.382-0.36-0.769-0.201-1.16c0.115-0.293,0.542-0.919,1.286-1.873
                      c0.394-0.504,0.703-0.91,0.93-1.214c1.651-2.193,2.366-3.595,2.146-4.205l-0.086-0.142c-0.058-0.085-0.204-0.165-0.44-0.236
                      c-0.239-0.072-0.546-0.084-0.917-0.036L22.842,8.09c-0.064-0.024-0.16-0.021-0.284,0.008c-0.125,0.029-0.186,0.042-0.186,0.042
                      l-0.073,0.038l-0.058,0.042c-0.048,0.03-0.099,0.079-0.156,0.15c-0.058,0.072-0.105,0.155-0.144,0.25
                      c-0.447,1.154-0.958,2.227-1.53,3.217c-0.352,0.591-0.674,1.104-0.971,1.538c-0.297,0.435-0.546,0.753-0.744,0.958
                      c-0.201,0.205-0.38,0.369-0.543,0.493c-0.163,0.124-0.287,0.177-0.373,0.157c-0.087-0.018-0.166-0.038-0.243-0.057
                      c-0.134-0.086-0.242-0.203-0.322-0.35c-0.08-0.148-0.135-0.334-0.163-0.558c-0.028-0.225-0.045-0.417-0.051-0.58
                      c-0.004-0.162-0.004-0.391,0.009-0.687c0.007-0.296,0.014-0.495,0.014-0.601c0-0.362,0.006-0.755,0.019-1.179
                      c0.017-0.426,0.029-0.762,0.038-1.009c0.01-0.248,0.014-0.51,0.014-0.787c0-0.277-0.017-0.493-0.052-0.65
                      c-0.032-0.157-0.08-0.31-0.146-0.458c-0.067-0.148-0.166-0.262-0.295-0.343c-0.128-0.081-0.287-0.146-0.478-0.193
                      c-0.506-0.115-1.149-0.177-1.931-0.186c-1.773-0.02-2.912,0.095-3.417,0.342c-0.201,0.105-0.382,0.249-0.544,0.43
                      c-0.171,0.209-0.195,0.324-0.072,0.342c0.572,0.085,0.978,0.292,1.216,0.616l0.086,0.171c0.067,0.124,0.133,0.344,0.199,0.659
                      c0.067,0.313,0.11,0.663,0.129,1.043c0.047,0.695,0.047,1.292,0,1.788c-0.048,0.495-0.093,0.881-0.136,1.157
                      c-0.042,0.277-0.106,0.501-0.192,0.672c-0.086,0.172-0.143,0.276-0.172,0.314c-0.029,0.039-0.053,0.063-0.072,0.071
                      c-0.124,0.048-0.253,0.073-0.386,0.073c-0.134,0-0.296-0.067-0.486-0.201c-0.191-0.133-0.389-0.316-0.594-0.549
                      c-0.205-0.235-0.436-0.562-0.693-0.98c-0.258-0.419-0.524-0.916-0.802-1.487l-0.228-0.415c-0.143-0.266-0.339-0.655-0.586-1.164
                      c-0.247-0.51-0.467-1.004-0.658-1.481C6.708,8.547,6.594,8.396,6.441,8.29L6.371,8.247C6.322,8.21,6.247,8.169,6.141,8.125
                      C6.037,8.083,5.927,8.052,5.813,8.032L1.895,8.061c-0.4,0-0.673,0.091-0.816,0.271L1.022,8.419
                      C0.993,8.467,0.979,8.543,0.979,8.647c0,0.105,0.028,0.233,0.085,0.386c0.572,1.345,1.194,2.641,1.867,3.891
                      c0.672,1.249,1.256,2.253,1.751,3.017c0.496,0.762,1,1.483,1.515,2.159c0.515,0.677,0.856,1.109,1.023,1.301
                      c0.167,0.192,0.298,0.334,0.393,0.429l0.358,0.343C8.2,20.4,8.536,20.677,8.979,20.994c0.443,0.32,0.934,0.634,1.473,0.946
                      c0.538,0.31,1.166,0.559,1.88,0.757c0.715,0.194,1.411,0.274,2.088,0.236h1.644c0.333-0.028,0.586-0.134,0.758-0.316l0.057-0.07
                      c0.039-0.058,0.074-0.146,0.105-0.265c0.035-0.118,0.052-0.249,0.052-0.393c-0.01-0.412,0.022-0.78,0.092-1.107
                      c0.074-0.331,0.153-0.578,0.243-0.746c0.093-0.166,0.194-0.307,0.31-0.421c0.112-0.114,0.195-0.183,0.243-0.206
                      c0.048-0.024,0.086-0.042,0.114-0.05c0.228-0.077,0.499-0.003,0.809,0.221c0.31,0.223,0.601,0.501,0.872,0.83
                      c0.271,0.327,0.597,0.697,0.979,1.108c0.381,0.409,0.716,0.713,1,0.914l0.287,0.172c0.192,0.115,0.438,0.218,0.744,0.316
                      c0.304,0.093,0.572,0.118,0.802,0.07l3.659-0.058c0.36,0,0.642-0.061,0.843-0.179c0.198-0.121,0.319-0.249,0.357-0.393
                      c0.039-0.145,0.039-0.307,0.007-0.489C28.362,21.694,28.33,21.566,28.295,21.496z"
                    />
                </Svg>
              </View>
            </TouchableHighlight>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.textInput}
                placeholder="Имя"
                textContentType="username"
                onChangeText={(text) => this.writing('first_name', text)}
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.textInput}
                placeholder="Фамилия"
                textContentType="username"
                onChangeText={(text) => this.writing('second_name', text)}
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.textInput}
                placeholder="Email"
                textContentType="email"
                onChangeText={(text) => this.writing('email', text)}
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.textInput}
                placeholder="Пароль"
                secureTextEntry={true}
                textContentType="password"
                onChangeText={(text) => this.writing('password', text)}
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.textInput}
                placeholder="Повторите пароль"
                secureTextEntry={true}
                textContentType="password"
                onChangeText={(text) => this.writing('password2', text)}
              />
            </View>
            <TouchableHighlight style={{width: '100%'}} underlayColor="transparent">
              <View style={styles.buttonWrapper}>
                <LinearGradient
                  colors={['#1b489d', '#00a9b6']}
                  start={[0, 0]}
                  end={[1, 0]}
                  style={styles.buttonBig}>
                  <Text style={styles.buttonBigText}>Зарегистрироваться</Text>
                </LinearGradient>
              </View>
            </TouchableHighlight>
            <Text style={styles.privacyText}>
                Регистрируясь вы принимаете условия
            </Text>
            <Text style={styles.privacyLink}
                onPress={() => {Alert.alert('Пользовательское соглашение');}}>
                пользовательского соглашения
            </Text>
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    );
  }

  // Отлавливаем изменения инпутов и пишем их в стейт
  writing(type, text){
    switch(type) {
      case 'first_name':
        this.setState({
          first_name : text
        });
      break;
      case 'second_name':
        this.setState({
          second_name : text
        });
      case 'email':
        this.setState({
          email : text
        });
      case 'password':
        this.setState({
          password : text
        });
      case 'password2':
        this.setState({
          password2 : text
        });
      break;
    }
  }

  tryToRegister() {
    //Alert.alert('test', JSON.stringify(this.state))
    this.props.registration(this.state);
  }
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
      registration: (data) => registration(data),
    }, dispatch);
}

export default connect(
  state => {
    return {
      app: state.app,
      user: state.user,
    }
  }, mapDispatchToProps
)(RegistrationPage);