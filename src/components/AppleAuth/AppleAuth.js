import { Component } from "react";
import React from "react";
import { View } from "react-native";
import { environment } from "../../environment/environment";
import styles from "../../global/global-styles.js";
import globalConstant from "../../global/global-constant.js";
import { Formik } from "formik";
import * as yup from "yup";
import * as SecureStore from "expo-secure-store";
import { appleAuth } from "@invertase/react-native-apple-authentication";
import * as AppleAuthentication from "expo-apple-authentication";

/**
 * @description This class is used to apple sign in/sign up button
 * where the user can sign in or register their account with apple authentication
 */
class AppleAuth extends Component {
    constructor(props) {
        super(props);
    }
    
    async onAppleButtonPress(registerType) {
        console.log(registerType);
        console.log("Apple Pressed");
        try {
          // AppleAuthentication.refreshAsync();
          const credential = await AppleAuthentication.signInAsync({
            requestedScopes: [
              AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
              AppleAuthentication.AppleAuthenticationScope.EMAIL,
            ],
          });
          console.log(credential);
          // signed in
        } catch (e) {
          if (e.code === "ERR_CANCELED") {
           console.log("The Apple authentication request has been canceled by the user.");
          } else {
            console.log(e);
          }
        }
    }
  /**
   * @description render() returns a div
   * @returns The div containing the apple sign in/up button 
   */
  render() {
    return (
      <View>
        <AppleAuthentication.AppleAuthenticationButton
          buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
          buttonStyle={
            AppleAuthentication.AppleAuthenticationButtonStyle.WHITE_OUTLINE
          }
          cornerRadius={100}
          style={[globalConstant.formButton]}
          onPress={()=>this.onAppleButtonPress(this.props.type)}
        />
      </View>
    );
  }
}

export default AppleAuth;
