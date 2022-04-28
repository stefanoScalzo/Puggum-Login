import React from "react";
import { StyleSheet,Platform, KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback, Keyboard, Dimensions } from "react-native";

/**
 * @description This class is used to display the log in form
 */
function KeyboardAvoidingInput({ children }) {
    return (
        
        <KeyboardAvoidingView enabled behavior={Platform.OS==="ios"?"padding":null} 
        style={styles.keyboardAvoidingViewStyle}>
            <ScrollView 
                contentContainerStyle={{flex:1}}
                bounces={false} >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                {children}
            </TouchableWithoutFeedback>
            </ScrollView>

        </KeyboardAvoidingView>

    );
}

export default KeyboardAvoidingInput;

const styles = StyleSheet.create({
    keyboardAvoidingViewStyle: {
        flex:1,
        width: Dimensions.get('window').width, 
    }
});