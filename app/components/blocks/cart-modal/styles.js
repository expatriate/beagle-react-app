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
      fontSize: 18,
      borderRadius: 5,
      flex: 1,
      marginRight: 12,
      fontFamily: 'custom-font',
    },
    empty_text: {
      fontSize: 18,
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
    col: {
      flexDirection: 'column',
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


    shtrihcode: {
      marginTop: 10,
      width: width - 48,
      height: 60
    },


    cart_el: {
      flex: 1,
      margin: 10,
      padding: 14,
      borderRadius: 10,
      borderColor: '#dedede',
      borderWidth: 1,
      borderStyle:'dashed',
    },
    flex: {
      flex: 1,
    },
    cart_el_image: {
      width: 110,
      height: 120,
      marginRight: 20,
    },
    cart_el_name: {
      fontSize: 20,
      lineHeight: 22,
      marginBottom: 10,
      color: '#000000',
      flex: 1,
      textAlign: 'left',
      marginRight: 20,
      fontFamily: 'custom-font-bold',
    },
    cart_el_text: {
      fontSize: 14,
      lineHeight: 14,
      marginBottom: 20,
      color: '#999999',
      fontWeight: '100',
      fontFamily: 'custom-font',
    },
    cart_el_text_title: {
      fontSize: 16,
      fontWeight: '300',
      lineHeight: 18,
      marginBottom: 10,
      color: '#555555',
      fontFamily: 'custom-font',
    },
    cart_el_cost: {
      textAlign: 'center',
      color: '#000000',
      lineHeight: 18,
      fontSize: 18,
      marginTop: 10,
      paddingRight: 20,
      fontFamily: 'custom-font',
    },

    cart_el_other_btns: {
      flex: 1,
      justifyContent: 'flex-end',
      marginTop: 10,
    },
    cart_el_button_text: {
      padding: 8,
      textAlign: 'center',
      color: '#696969',
      fontSize: 16,
      fontFamily: 'custom-font',
    },
    cart_el_button_next: {
      padding: 12,
      textAlign: 'center',
      color: '#ffffff',
      fontSize: 16,
      fontFamily: 'custom-font',
    },
    cart_el_button_grad: {
      borderRadius: 5,
      marginLeft: 10
    },
    cart_el_button_grad_nomg: {
      borderRadius: 5,
    },


    bill: {
      flex: 1,
      margin: 10,
      padding: 14,
      borderRadius: 10,
      borderColor: '#dedede',
      borderWidth: 1,
      borderStyle:'dashed',
    },
    bill_title: {
      fontSize: 16,
      lineHeight: 18,
      textAlign: 'center',
      color: '#434343',
      marginTop: 10,
      marginBottom: 10,
      paddingBottom: 10,
      fontFamily: 'custom-font',
      borderColor: '#e4e4e4',
      borderBottomWidth: 1,
    },
    bill_title_bottom: {
      fontSize: 16,
      lineHeight: 18,
      textAlign: 'center',
      color: '#434343',
      borderColor: '#e4e4e4',
      borderTopWidth: 1,
      marginTop: 10,
      paddingTop: 10,
      marginBottom: 10,
      fontFamily: 'custom-font',
    },
    bill_el: {
      fontSize: 18,
      textAlign: 'left',
      color: '#434343',
      fontFamily: 'custom-font-bold',
    },
    bill_title_status: {
      color: '#13A013',
      fontSize: 22,
      lineHeight: 24,
      fontFamily: 'custom-font-bold',
    }


});