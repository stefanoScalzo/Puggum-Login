import React from "react";
import {
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
} from "react-native";
import styles from "../global/global-styles.js";

/**
 * @description This function is used to wrap the children to prevent the keybord from hiding the inputs
 */
function KeyboardAvoidingInput({ children }) {
  return (
      <KeyboardAvoidingView
        enabled
        behavior={Platform.OS === "ios" ? "padding" : null}
        style={styles.keyboardAvoidingViewStyle}
      >
        <ScrollView contentContainerStyle={{ flex: 1 }} bounces={false}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            {children}
          </TouchableWithoutFeedback>
        </ScrollView>
      </KeyboardAvoidingView>
  );
}

export default KeyboardAvoidingInput;
