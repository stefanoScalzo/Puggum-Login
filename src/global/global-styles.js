import { StyleSheet, Dimensions } from "react-native";
/**
 * This is the style sheet for the log in/sign up forms.
 */

const containerWidth="100%";
const imgHeight=100;
const imgWidth=100;
const btnFontSize=19;
const inputFontSize=16;
const letterSpacing=0.25;
const borderRadius=100;
const btnmarginBottom=10;
const borderWidth=1;
const navBtnPaddingLeftRight="6%";
const navBtnPaddingTopBottom="3%";
const btnMargin="2%";

const styles = StyleSheet.create({
  textForgotPass: {
    fontSize: btnFontSize,
    fontWeight: "bold",
    letterSpacing: letterSpacing,
    color: "darkviolet",
  },
  buttonForgotPass: {
    alignItems: "center",
    justifyContent: "center",
    borderColor: "darkviolet",
    borderWidth: borderWidth,
    backgroundColor: "white",
    borderRadius: borderRadius,
  },

  textSignIn: {
    color: "white",
    fontWeight: "bold",
    fontSize: btnFontSize,
  },

  buttonSignIn: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "darkviolet",
    borderRadius: borderRadius,
  },

  textAG: {
    color: "black",
    fontWeight: "bold",
    fontSize: btnFontSize,
  },

  buttonSignInwithAG: {
    alignItems: "center",
    justifyContent: "center",
    borderColor: "black",
    borderWidth: borderWidth,
    backgroundColor: "white",
    borderRadius: borderRadius,
  },

  error: {
    color: "red",
    fontSize: inputFontSize,
  },

  formInput: {
    fontSize: inputFontSize,
    borderBottomWidth: borderWidth,
    borderColor: "white",
  },
  
  datePicker: {
    borderBottomWidth: borderWidth,
    borderColor: "white",
    width: "100%",
  },

  textSignUp: {
    fontSize: btnFontSize,
    fontWeight: "bold",
    letterSpacing: letterSpacing,
    color: "darkviolet",
  },

  buttonSignUp: {
    alignItems: "center",
    justifyContent: "center",
    borderColor: "darkviolet",
    borderWidth: borderWidth,
    backgroundColor: "white",
    borderRadius: borderRadius,
  },
  textAG: {
    color: "black",
    fontWeight: "bold",
    fontSize: btnFontSize,
  },
  buttonSignUpnwithAG: {
    alignItems: "center",
    justifyContent: "center",
    borderColor: "black",
    borderWidth: borderWidth,
    backgroundColor: "white",
    borderRadius: borderRadius,
  },

  //styles for NavBar.js
  mainContainer: {
    width: containerWidth,
    padding: "5%",
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    width: containerWidth,
    flexDirection: "row",
    justifyContent: "center",
  },

  text: {
    fontSize: btnFontSize,
    letterSpacing: letterSpacing,
    color: "white",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: navBtnPaddingLeftRight,
    paddingRight: navBtnPaddingLeftRight,
    paddingTop: navBtnPaddingTopBottom,
    paddingBottom: navBtnPaddingTopBottom,
    marginBottom: btnmarginBottom,
    margin: btnMargin,
  },

  buttonActive: {
    backgroundColor: "black",
    fontWeight: "bold",
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: navBtnPaddingLeftRight,
    paddingRight: navBtnPaddingLeftRight,
    paddingTop: navBtnPaddingTopBottom,
    paddingBottom: navBtnPaddingTopBottom,
    marginBottom: btnmarginBottom,
    margin: btnMargin,
  },

  profileImage: {
    alignItems: "center",
    justifyContent: "center",
    width: imgWidth,
    height: imgHeight,
    borderRadius: borderRadius,
  },

  //styles for App.js
  appContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  profile: {
    alignItems: "center",
  },
  name: {
    fontSize: 20,
  },
  image: {
    width: imgWidth,
    height: imgHeight,
    borderRadius: 50,
  },
  //styles for KeyboardAvoidingInputs.js
  keyboardAvoidingViewStyle: {
    flex: 1,
    width: Dimensions.get("window").width,
  },
});

export default styles;
