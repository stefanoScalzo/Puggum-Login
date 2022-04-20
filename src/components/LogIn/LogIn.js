import { Component } from "react";
import { TouchableOpacity, Pressable, Button, Image, StyleSheet, Text, View, TextInput } from "react-native";

// import authenticationStyles from "../styles.js";

/**
 * @description This class is used to display the log in form
 */
class LogIn extends Component {

    constructor() {
        super();
        this.state = {
        }
    }

    /**
       * @description render() returns a div 
       * @returns The div containing 
       */
    render() {
        return (
            <View style={styles.container}>
               
                <TextInput
                    style={styles.formInput}
                    placeholder="Email"
                    placeholderTextColor='white'
                    className="form-input" 
                    />
               
                <TextInput
                    style={styles.formInput}
                    placeholder="Password"
                    placeholderTextColor='white'
                    className="form-input" 
                    secureTextEntry={true}/>
                    

                <Text style={styles.error} class="error" textWrap="true" >fdgdf</Text>

                <TouchableOpacity style={styles.buttonSignIn}>
                    <Text style={styles.textSignIn}>Sign In</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonForgotPass}>
                    <Text style={styles.textForgotPass}>Forgot Password</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonSignInwithAG}>
                    <Text style={styles.textAG}>Sign In with Apple</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonSignInwithAG}>
                    <Text style={styles.textAG}>Sign In with Google</Text>
                </TouchableOpacity>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    // container: {
    //     width:'100%',
    //     padding:'5%',
    //   },
      
    textForgotPass: {
        fontSize: 19,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'darkviolet',
    },
    buttonForgotPass: {
        alignItems: "center",
        justifyContent: "center",
        borderColor: 'darkviolet',
        borderWidth: 1,
        backgroundColor: 'white',
        borderRadius: 100,
        marginBottom: 10,
        minHeight: 44,
        height: 44,
    },

    textSignIn: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 19,
    },

    buttonSignIn: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: 'darkviolet',
        borderRadius: 100,
        padding: 5,
        marginBottom: 10,
        minHeight: 44,
        height: 44,
        
    },
    textAG:{
        color: 'black',
        fontWeight: 'bold',
        fontSize: 19,
    },
    buttonSignInwithAG: {
        alignItems: "center",
        justifyContent: "center",
        borderColor: 'black',
        borderWidth: 1,
        backgroundColor: 'white',
        borderRadius: 100,
        marginBottom: 10,
        minHeight: 44,
        height: 44,
    },

    error: {
        color: 'red',
        fontSize: 16,
        marginBottom:'3%',
    },

    formInput:{
        fontSize: 16,
        marginBottom: 5,
        borderBottomWidth:1,
        borderColor:'white',
        paddingBottom:5,
        marginBottom:'5%',
    },

});

export default LogIn;