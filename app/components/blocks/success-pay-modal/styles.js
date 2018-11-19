import {
    StyleSheet,
    Platform,
    Dimensions
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
      fontSize: 16,
      borderRadius: 5,
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
      flexDirection: 'row'
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



    options: {
      flex: 1,
    },
    option: {
      flex: 1,
      backgroundColor: '#f4f4f4',
      textAlign: 'center',
      fontSize: 18,
      color: '#434343',
      fontFamily: 'custom-font',
      paddingVertical: 10,

    },
    active_option: {
      backgroundColor: '#E10C1C',
      color: '#ffffff',
    },
    main_title: {
      fontSize: 24,
      fontFamily: 'custom-font',
      color: '#13A013',
      marginTop: 20,
      marginBottom: 10,
    },
    tip: {
      fontSize: 16,
      fontFamily: 'custom-font',
      color: '#696969',
      paddingTop: 5,
    },
    subtitle: {
      color: '#434343',
      fontFamily: 'custom-font',
      fontSize: 18,
      paddingTop: 30,
      paddingBottom: 10
    },

    small_btn: {
      borderRadius: 5, 
      backgroundColor: '#E10C1C'
    },

    small_btn_disabled: {
      borderRadius: 5, 
      backgroundColor: '#fbfbfb'
    },

    small_title: {
      color: '#ffffff',
      fontSize: 16,
      fontFamily: 'custom-font',
      paddingHorizontal: 10,
      paddingVertical: 10,
      borderRadius: 5,
    },
    small_title_disabled: {
      color: '#434343',
      fontSize: 16,
      fontFamily: 'custom-font',
      paddingHorizontal: 10,
      paddingVertical: 10,
      borderRadius: 5,
    },

    shtrihcode: {
      marginTop: 10,
      width: width - 48,
      height: 60
    },



    delivery: {
      padding: 10,
      backgroundColor: '#f4f4f4',
      marginTop: 10,
    },
    delivery_subtitle: {
      color: '#434343',
      fontFamily: 'custom-font',
      fontSize: 16,
      marginBottom: 10
    },


    input: {
      fontFamily: 'custom-font',
      fontSize: 16,
      paddingLeft: 5,
      borderBottomWidth: 1,
      borderColor: '#696969',
      marginBottom: 10
    },


    docs: {
      alignItems: 'center',
      marginBottom: 10,
    },
    doc_title: {
      color: '#434343',
      fontFamily: 'custom-font',
      fontSize: 16,
      textAlign: 'left',
      marginLeft: 10,
    }



});