import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
  textForgotPass: {
    fontSize: 19,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "darkviolet",
  },
  buttonForgotPass: {
    alignItems: "center",
    justifyContent: "center",
    borderColor: "darkviolet",
    borderWidth: 1,
    backgroundColor: "white",
    borderRadius: 100,
    marginTop: 10,
    minHeight: 44,
    height: 44,
  },

  textSignIn: {
    color: "white",
    fontWeight: "bold",
    fontSize: 19,
  },

  buttonSignIn: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "darkviolet",
    borderRadius: 100,
    padding: 5,
    marginTop: 10,
    minHeight: 44,
    height: 44,
  },
  textAG: {
    color: "black",
    fontWeight: "bold",
    fontSize: 19,
  },
  buttonSignInwithAG: {
    alignItems: "center",
    justifyContent: "center",
    borderColor: "black",
    borderWidth: 1,
    backgroundColor: "white",
    borderRadius: 100,
    marginTop: 10,
    minHeight: 44,
    height: 44,
  },

  error: {
    color: "red",
    fontSize: 16,
    marginBottom: "3%",
    marginTop: "3%",
  },

  formInput: {
    fontSize: 16,
    marginBottom: 5,
    borderBottomWidth: 1,
    borderColor: "white",
    paddingBottom: 5,
    marginTop: "5%",
  },

  errorInput: {
    fontSize: 16,
    marginBottom: 5,
    borderBottomWidth: 1,
    borderColor: "red",
    paddingBottom: 5,
    marginTop: "5%",
  },
  datePicker: {
    marginBottom: 5,
    borderBottomWidth: 1,
    borderColor: "white",
    paddingBottom: 5,
    width: "100%",
  },

  textSignUp: {
    fontSize: 19,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "darkviolet",
  },

  buttonSignUp: {
    alignItems: "center",
    justifyContent: "center",
    borderColor: "darkviolet",
    borderWidth: 1,
    backgroundColor: "white",
    borderRadius: 100,
    marginTop: 10,
    minHeight: 44,
    height: 44,
  },
  textAG: {
    color: "black",
    fontWeight: "bold",
    fontSize: 19,
  },
  buttonSignUpnwithAG: {
    alignItems: "center",
    justifyContent: "center",
    borderColor: "black",
    borderWidth: 1,
    backgroundColor: "white",
    borderRadius: 100,
    marginTop: 10,
    minHeight: 44,
    height: 44,
  },

  //styles for NavBar.js
  mainContainer: {
    width: "100%",
    padding: "5%",
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
  },

  text: {
    fontSize: 19,
    letterSpacing: 0.25,
    color: "white",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: "6%",
    paddingRight: "6%",
    paddingTop: "3%",
    paddingBottom: "3%",
    marginBottom: 10,
    margin: "2%",
  },

  buttonActive: {
    backgroundColor: "black",
    fontWeight: "bold",
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: "6%",
    paddingRight: "6%",
    paddingTop: "3%",
    paddingBottom: "3%",
    marginBottom: 10,
    margin: "2%",
  },

  profileImage: {
    alignItems: "center",
    justifyContent: "center",
    width: 100,
    height: 100,
    borderRadius: 100,
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
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  //styles for KeyboardAvoidingInputs.js
  keyboardAvoidingViewStyle: {
    flex: 1,
    width: Dimensions.get("window").width,
  },
});

export default styles;
