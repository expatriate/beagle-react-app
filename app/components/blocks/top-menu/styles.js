import {
    StyleSheet,
    Platform
} from 'react-native';

export default StyleSheet.create({
    container: {
      backgroundColor: "#ffffff",
      flex: 1
    },
    row: {
      flexDirection: 'row'
    },
    col: {
      flexDirection: 'column'
    },
    head: {
      height: 64,
      width: '100%',
      marginTop: 30,
      paddingLeft: 24,
      paddingRight: 24,
    },
    head_icons: {
      alignItems: 'center',
      justifyContent: 'flex-end',
      flex: 1,
    },
    head_icon_wrapper: {
      width: 42,
      height: 42,
      borderRadius: 21,
      marginLeft: 12,
      backgroundColor: '#f4f4f4',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
    },
    head_icon_wrapper_active: {
      backgroundColor: '#E10C1C',
    },
    head_icon_relative: {
      position: 'relative',
    },
    head_icon: {
      
    },
    counter: {
      position: 'absolute',
      borderRadius: 8,
      backgroundColor: '#E10C1C',
      //left: 22,
      top: 25,
      right: -8,
    },
    counter_text: {
      
      fontSize: 10,
      lineHeight: 15,
      color: '#ffffff',
      borderRadius: 8,
      paddingHorizontal: 5,
      paddingVertical: 0,
      fontFamily: 'custom-font',
    },


    content: {
      flex: 1,
      paddingLeft: 24,
      paddingRight: 24,
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 36,
    },
    inputContainer: {
      width: '100%',
    },
    textInput: {
      width: '100%',
      textAlign: 'left',
      borderWidth: 2,
      borderRadius: 15,
      borderColor: '#efefef',
      color: '#465155',
      fontSize: 18,
      padding:12,
      fontFamily: 'custom-font',
    },
    results_wrapper: {
      flex: 1,
      marginTop: 16,
      width: '100%',
    },
    result: {
      width: '100%',
      height: 50,
      borderRadius: 15,
      marginBottom: 8,
      borderColor: '#efefef',
      borderWidth: 1,
      borderStyle:'dashed'
    },





    footer: {
      height: 180,
      width: '100%',
      alignItems: 'center',
    },
    footer_wrapper: {
      position: 'relative',
    },
    footer_btn_wrapper: {
      position: 'absolute',
      width: '100%',
      left: 0,
      alignItems: 'center',
      top: 80,
    },
    footer_text: {
      textAlign: 'center',
      fontSize:18,
      color:'#ffffff',
    },


















































    profileTop: {
      paddingTop: 40,
      paddingBottom: 80
    },
    profileTop__title: {
      fontSize: 20,
      fontWeight: '600',
      color: '#ffffff',
      lineHeight: 20,
      textAlign: 'center',
    },
    profileInfo: {
      position: 'relative',
    },
    borderedLeftRight: {
      borderLeftWidth: 2,
      borderColor: '#ecf0f2',
      borderRightWidth: 2,
    },
    userPanel: {
      width: '96%',
      left: '2%',
      bottom: -40,
      position: 'absolute',
      padding: 14,
      backgroundColor: '#ffffff',
      borderRadius: 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.6,
      shadowRadius: 2,  
      ...Platform.select({
        ios: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.8,
          shadowRadius: 2,
        },
        android: {
          elevation: 5,
        }
      }),
    },
    profileScroll: {
    },
    profileFriends: {
      paddingTop:54,
    },
    profilePhotos: {
      paddingTop:8,
      paddingBottom: 10,
    },
    whatsNew: {
      marginRight: 20
    },
    bordered: {
      borderBottomWidth: 2,
      borderColor: "#aaa",
    },
    topLinear: {
      alignItems: 'center'
    },
    
    col3: {
      width: '33%',
    },
    whiteBlock: {
      backgroundColor: '#ffffff',
      marginBottom: 15
    },
    tabHeader: {
      marginTop: 10,
    },
    tabHeader__item: {
      
    },
    hrLine: {
      left: '5%',
      width:'90%',
      height:2,
      backgroundColor: '#e8e9e9',
      marginTop: 5,
      marginBottom:5
    },
    roundEl: {
      borderRadius: 30,
      padding: 15,
      marginTop: 3,
      marginBottom: 3,
      backgroundColor: '#f4f6f5'
    },
    contentSpaceAround: {
      flex: 1,
      justifyContent: 'space-around',
      alignItems: 'center',
    },
    profileInfo__name: {
      textAlign: 'center',
      fontSize: 18,
      fontWeight: '600',
      color: '#ffffff'
    },
    profileInfo__largeLabel: {
      fontSize: 28,
      fontWeight: '200',
      textAlign: 'center',
      color: '#455054'
    },
    profileInfo__userstatus: {
      fontWeight: '300',
      fontSize: 14,
      textAlign: 'center',
      color: '#ffffff'
    },
    profileInfo__userpanelstatus: {
      fontWeight: '300',
      fontSize: 14,
      textAlign: 'center',
      color: '#455054'
    },
    profileInfo__wrapper: {
      position: 'relative',
    },
    profileFriends__wrapper: {
      position: 'relative',
      marginRight: 16,
    },
    profilePhotos__wrapper: {
      marginRight: 8,
      marginTop: 10,
    },
    profileFriends__wrapper__marginleft: {
      marginLeft: 20
    },
    profileInfo__status: {
      position: 'absolute',
      top:50,
      right:-2,
      padding: 6,
      borderRadius: 20,
      borderColor: '#ffffff',
      borderWidth: 1
    },
    profileFriends__status: {
      position: 'absolute',
      top:36,
      right:-2,
      padding: 3,
      borderRadius: 20,
      borderColor: '#ffffff',
      borderWidth: 1
    },
    user__status__online: {
      backgroundColor: '#01ac4e'
    },
    user__status__offline: {
      backgroundColor: '#ccc'
    },
    profileInfo__avatar: {
      width: 64,
      height: 64,
      resizeMode: 'contain',
      marginBottom: 8,
      marginTop:8
    },
    profileFriends__avatar: {
      width: 52,
      height: 52,
      resizeMode: 'contain',
      marginBottom: 8,
      marginTop:8
    },
    profilePhotos__item: {
      borderRadius: 15,
      backfaceVisibility: 'hidden',
      height: 110,
      width: 160,
    },
    blockTitle: {
      paddingLeft:20,
      fontWeight: '300',
      fontSize: 14,
      color: '#27363D',
    },
    whatsNew__title: {
      paddingLeft:20,
      flex: 1,
      fontWeight: '300',
      fontSize: 17,
      color: '#27363D',
    },
    marginLeft: {
      marginLeft: 30
    },
    marginRight: {
      marginRight: 30
    },
    smallMarginRight: {
      marginRight: 8,
    },
    marginBottom: {
      marginBottom: 20
    }
});