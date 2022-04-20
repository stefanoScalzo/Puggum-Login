import { Component, useState } from "react";
import { TouchableOpacity, Button, Image, StyleSheet, Text, View, TextInput } from "react-native";
/*https://github.com/xgfe/react-native-datepicker*/
import DatePicker from 'react-native-datepicker'

/**
 * @description This class is used to display the log in form
 */
class SignUp extends Component {
    constructor(props) {
        super(props)
        this.state = { date: "" }
    }

    /**
       * @description render() returns a div 
       * @returns The div containing 
       */
    render() {
        return (
            <View style={styles.container}>
               
                <DatePicker  style={styles.datePicker}
                    date={this.state.date}
                    mode="date"
                    placeholder="Date of Birth"
                    format="YYYY-MM-DD"
                    minDate="1920-05-01"
                    maxDate="2020-08-01"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                        dateIcon: {
                            display:'none'
                        },
                        dateInput: {
                            borderWidth:0,
                            alignItems:'flex-start',
                            justifyContent:'flex-end'
                        },
                        dateText:{
                            color:'white',
                            fontSize:16,
                        },
                        placeholderText:{
                            color:'white',
                            fontSize:16
                        },
                        dateTouchBody:{
                            
                        },
                        
                    }}
                    onDateChange={(date) => { this.setState({ date: date }) }}
                />
               
                <TextInput style={styles.formInput}
                    placeholder="Display Name*"
                    placeholderTextColor='white'
                    className="form-input form-input-placeholder" />
                <TextInput style={styles.formInput}
                    placeholder="Email*"
                    placeholderTextColor='white'
                    className="form-input" />
                <TextInput style={styles.formInput}
                    placeholder="Password"
                    placeholderTextColor='white'
                    className="form-input" 
                    secureTextEntry={true}/>
                    
                <Text className="error" textWrap="true"></Text>
                <TouchableOpacity style={styles.buttonSignUp}>
                    <Text style={styles.textSignUp}>Register</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonSignUpnwithAG}>
                    <Text style={styles.textAG}>Sign up with Apple</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonSignUpnwithAG}>
                    <Text style={styles.textAG}>Sign up with Google</Text>
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
    datePicker:{
        marginBottom: 5,
        borderBottomWidth:1,
        borderColor:'white',
        paddingBottom:5,
        width:'100%',
        marginBottom:'5%',
    },
    formInput:{
        fontSize: 16,
        marginBottom: 5,
        borderBottomWidth:1,
        borderColor:'white',
        paddingBottom:5,
        marginBottom:'5%',
    },
    
    error: {
        color: 'red',
        fontSize: 16,
        marginBottom:'3%',
    },

    textSignUp: {
        fontSize: 19,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'darkviolet',
    },

    buttonSignUp: {
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
    textAG:{
        color: 'black',
        fontWeight: 'bold',
        fontSize: 19,
    },
    buttonSignUpnwithAG: {
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

});

export default SignUp;