import { Component, useState } from "react";
import { Pressable, Button, Image, StyleSheet, Text, View, TextInput } from "react-native";

import LogIn from "./LogIn/LogIn.js"
import SignUp from "./SignUp/SignUp.js"



/**
 * @description This class is used to display the log in form
 */
class NavBar extends Component {

    constructor() {
        super();
        this.state = {
            activeButton: 'first',
        }
    }

    /**
       * @description render() returns a div 
       * @returns The div containing 
       */
    render() {
        return (
            <View style={styles.mainContainer}>
                <View style={styles.imageContainer}>
                {this.state.activeButton === 'second' && <Image style={styles.profileImage} source={require('../../assets/default.jpg')} />}
                </View>
                <View style={styles.container}>
                    <Pressable
                        onPress={() => this.setState({ activeButton: 'first' })}
                        style={this.state.activeButton === 'first' ? styles.buttonActive : styles.button}>

                        <Text style={styles.text}>Login</Text>
                    </Pressable>

                    <Pressable 
                        onPress={() => this.setState({ activeButton: 'second' })}
                        style={this.state.activeButton === 'second' ? styles.buttonActive : styles.button}>

                        <Text style={styles.text}>Sign Up</Text>
                    </Pressable>
                </View>
                {this.state.activeButton === 'first' && <LogIn></LogIn>}
                {this.state.activeButton === 'second' && <SignUp></SignUp>}
                {/* <SignUp></SignUp> */}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        width: '100%',
        padding: '5%',
    },
    imageContainer:{
        alignItems: "center",
        justifyContent: 'center',
    },
    container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
    },

    text: {
        fontSize: 19,
        letterSpacing: 0.25,
        color: 'white',
    },
    button: {
        alignItems: "center",
        justifyContent: "center",
        paddingLeft: '6%',
        paddingRight: '6%',
        paddingTop: '3%',
        paddingBottom: '3%',
        marginBottom: 10,
        margin: '2%',
    },

    buttonActive: {
        backgroundColor: 'black',
        fontWeight: 'bold',
        alignItems: "center",
        justifyContent: "center",
        paddingLeft: '6%',
        paddingRight: '6%',
        paddingTop: '3%',
        paddingBottom: '3%',
        marginBottom: 10,
        margin: '2%',
    },

    profileImage:{
        alignItems:'center', 
        justifyContent: "center",
        width: 100,
        height: 100,
        borderRadius: 100,
    }


});

export default NavBar;