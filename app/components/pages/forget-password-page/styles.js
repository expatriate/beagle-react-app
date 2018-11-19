import {
    StyleSheet
} from 'react-native';

export default StyleSheet.create({
  restoreContainer: {
    backgroundColor: '#fff',
    paddingLeft: 30,
    paddingRight: 30,
    flex: 1,
  },
  buttonSociallogin: {
    backgroundColor: '#f4f6f5',
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 20,
  },
  buttonSocialloginText: {
    textAlign: 'left',
    color: '#465155',
    width: '100%',
    fontSize: 18,
    fontWeight: 'bold',
    paddingLeft: 14,
    paddingTop: 18,
    paddingBottom: 18, 
    paddingRight: 14,
    position: 'relative'
  },
  buttonSocialloginIcon: {
    position: 'absolute',
    right: 18,
    top:16,
  },
  inputContainer: {
    width: '100%',
    marginTop: 10,
    marginBottom: 10,
  },
  textInput: {
    height: 40,
    width: '100%',
    textAlign: 'left',
    borderEndColor: 'rgba(255,255,255,1)',
    color: 'rgba(255,255,255,1)',
    fontSize: 18,
    paddingBottom:12,
  },
  buttonBig: {
    borderRadius: 30,
    padding: 5,
    alignItems: 'center'
  },
  buttonWrapper: {
    marginTop:10,
    width: '100%',
  },
  buttonBigText: {
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 12,
    fontSize: 22,
    color: '#fff',
    fontWeight: "600"
  },
  contentAtCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
  },
  restoreText: {
    marginTop:20,
    fontSize:16,
    textAlign: 'center',
    color: '#999999'
  },
});