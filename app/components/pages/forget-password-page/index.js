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
    Button,
    KeyboardAvoidingView
} from 'react-native';
import { LinearGradient, Svg } from 'expo';

import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';

import {registration} from '../../../actions';
import styles from './styles';

class ForgetPasswordPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
    }

    this.tryToRegister = this.tryToRegister.bind(this);
  }

  componentDidMount() {
      //this.props.getData(); //call our action
  }

  render() {
    return (
      <View style={styles.restoreContainer}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <KeyboardAvoidingView behavior="padding" enabled style={styles.contentAtCenter}>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.textInput}
                placeholder="Email"
                textContentType="email"
                onChangeText={(text) => this.writing('email', text)}
              />
            </View>
            <TouchableHighlight style={{width: '100%'}} underlayColor="transparent">
              <View style={styles.buttonWrapper}>
                <LinearGradient
                  colors={['#1b489d', '#00a9b6']}
                  start={[0, 0]}
                  end={[1, 0]}
                  style={styles.buttonBig}>
                  <Text style={styles.buttonBigText}>Восстановить пароль</Text>
                </LinearGradient>
              </View>
            </TouchableHighlight>
            <Text style={styles.restoreText}>
                Пройдите по ссылке, высланной вам на почту, чтобы сбросить пароль и установите его заново
            </Text>
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    );
  }

  // Отлавливаем изменения инпутов и пишем их в стейт
  writing(type, text){
    switch(type) {
      case 'email':
        this.setState({
          email : text
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
)(ForgetPasswordPage);