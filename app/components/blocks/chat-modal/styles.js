import {
    StyleSheet,
    Platform,
    Dimensions,
} from 'react-native';

let {height, width} = Dimensions.get('window');

export default StyleSheet.create({
    modal: {
      flex: 1,
      width: '100%',
      backgroundColor: "#ffffff",
      position:'relative',
      zIndex: 10
    },
    modal_header: {
      alignItems: 'center',
      height: 60,
      padding: 20
    },
    modal_content: {
      flex: 1
    },
    modal_footer: {
      padding: 20,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f4f4f4',
    },
    modal_footer_text: {
      color: '#999999',
      fontSize: 16,
      fontFamily: 'custom-font',
    },
    modal_title: {
      fontSize: 20,
      flex: 1,
      color: '#ffffff',
      fontFamily: 'custom-font-bold',
    },
    modal_close: {
      width: 32,
      height: 32,
    },
    modal_enter: {
      width: 32,
      height: 32,
    },
    textInput: {
      backgroundColor: '#ffffff',
      padding: 4,
      paddingLeft: 14,
      fontSize: 16,
      borderRadius: 15,
      borderColor: '#E10C1C',
      borderWidth: 1,
      flex: 1,
      marginRight: 12,
      fontFamily: 'custom-font',
    },
    empty_text: {
      fontSize: 16,
      textAlign: 'center',
      width: '100%',
      paddingLeft: 20,
      paddingRight: 20,
      paddingTop: 80,
      color: '#ababab',
      fontFamily: 'custom-font',
    },
    row: {
      flexDirection: 'row',
      alignContent: 'flex-start',
      justifyContent: 'flex-start',
      alignSelf: 'flex-start',
    },
    hrLine: {
      left: '5%',
      width:'90%',
      height:2,
      backgroundColor: '#e8e9e9',
      marginTop: 5,
      marginBottom:5
    },
    contentAtCenter: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    contentSpaceAround: {
      flex: 1,
      justifyContent: 'space-around',
      alignItems: 'center',
    },



    variants_wrapper: {
      flexWrap: 'wrap',
    },
    variant: {
      width: '100%',
      flexDirection: 'row',
      padding: 8,
      borderRadius: 5,
      backgroundColor: '#ffffff',
      marginTop: 10,
    },
    variant_image: {
      width: 80,
      height: 80,
    },
    variant_name: {
      fontSize: 16,
      textAlign: 'left',
      marginTop: 4,
      marginBottom: 4,
      paddingRight: 8,
      fontFamily: 'custom-font',
    },
    result_btn:{
      width: 100,
      backgroundColor: '#E10C1C',
      borderRadius: 5,
      padding: 2,
      marginTop: 8,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row'
    },
    result_btn_text: {
      color: '#ffffff',
      paddingLeft: 10,
      fontFamily: 'custom-font',
    },





    bot: {
      width: width - 20,
    },
    bot_avatar: {
      marginTop: 10,
      width: 32,
      height: 32,
      marginLeft: 10,
      marginRight: 5,
    },
    bot_message_text: {
      fontSize: 16, 
      lineHeight: 20,
      color: '#343434',
      fontFamily: 'custom-font',
      
    },
    bot_message_content: {
      padding: 12,
      borderRadius: 5,
      backgroundColor:'#ececec'      
    },
    bot_message: {
      flex: 1
    },
    bot_time: {
      fontSize:12,
      color: '#ababab',
      marginTop: 5,
      fontFamily: 'custom-font',
    },


    user: {
      justifyContent: 'flex-end',
      width: '100%',
    },
    user_message_text: {
      fontSize: 16, 
      lineHeight: 20,
      color: '#ffffff',
      fontFamily: 'custom-font',
    },
    user_message_content: {
      padding: 12,
      borderRadius: 5,      
    },
    user_message: {
      marginTop: 5,
      marginRight: 20,
      marginBottom: 5,
      marginLeft: 10,
    },
    user_time: {
      fontSize:12,
      color: '#ababab',
      textAlign: 'right',
      marginTop: 5,
      fontFamily: 'custom-font',
    },




});