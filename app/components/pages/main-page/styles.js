import {
    StyleSheet
} from 'react-native';

export default StyleSheet.create({
  mainContainer: {
    backgroundColor: '#fff',
    paddingLeft: 30,
    paddingRight: 30,
    flex: 1,
  },
  welcomeTextContainer: {
    marginTop: 36,
    width: 280,
    marginBottom: 36
  },
  welcomeText: {
    fontSize: 18,
    color: '#465155',
    lineHeight: 22,
    textAlign: 'center',
    fontWeight: '400',
    fontFamily: 'custom-font',
  },
  welcomeImage: {
    width: 174,
    height: 198,
    resizeMode: 'contain',
  },
  buttonWrapper: {
    marginTop: 50
  },
  buttonBig: {
    borderRadius: 30,
    padding: 4,
    alignItems: 'center'
  },
  buttonBigText: {
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 12,
    fontSize: 20,
    color: '#ffffff',
    fontFamily: 'custom-font',
  },
  contentAtCenter: {
    flex: 1,
    justifyContent: 'center', // Used to set Text Component Vertically Center
    alignItems: 'center',
    flexWrap: 'wrap', 
    flexDirection:'column',
    width: '100%',
  },
});