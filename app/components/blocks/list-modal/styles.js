import {
    StyleSheet,
    Platform
} from 'react-native';

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
      flex: 1,
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
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

    list_title: {
      fontSize: 16,
      lineHeight: 20,
      paddingLeft: 20,
      paddingTop: 20,
      paddingBottom: 10,
      color: '#696969',
      textAlign: 'left',
      fontFamily: 'custom-font',
    },
    tag_text: {
      color: '#ffffff',
      padding: 7,
      fontFamily: 'custom-font',
    },
    tag_grad: {
      borderRadius: 5,
    },
    tag_wrapper: {
      marginLeft: 10
    },
    tags_wrapper: {
      height: 40,
    },
    list: {
      marginTop: 10,
    },
    list_head: {
      height: 40,
    },
    list_item_text: {
      textAlign: 'center',
      fontFamily: 'custom-font',
    },
    list_head_text: {
      color: '#434343',
      fontSize: 12,
      fontFamily: 'custom-font',
    },
    list_item: {
      width: 170,
      alignItems: 'center',
      borderRadius: 10,
      borderColor: '#dedede',
      borderWidth: 1,
      borderStyle:'dashed',
      marginRight: 10,
    },
    list_head_img: {
      height: 120,
    },
    list_left: {
      width: '30%',
      paddingLeft: 20,
      paddingRight: 5,
      borderRightWidth: 1,
      borderRightColor: '#dedede',
    },
    list_right: {
      width: '70%',
    },
    list_right_first: {
      marginLeft: 10
    },
    list_image: {
      width: 100,
      height: 120,
    }

});