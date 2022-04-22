import { Component } from "react";
import React from "react";
import { TouchableOpacity, StyleSheet, Text, View, TextInput, Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { environment } from "../../environment/environment";
// import authenticationStyles from "../styles.js";


/**
 * @description This class is used to display the log in form
 */
function LogIn() {

    // constructor() {
    //     super();
    //     this.state = {
    //         error: "",
    //     }
    //     control=useForm();
    // }
    
    const [email, setEmail] = React.useState(null);
    const [error, setError] = React.useState(null);

    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            email: '',
            password: ''
        }
    });


    const onSignInTap = (data) => {
        setError('Sign In');
        console.log(data);
        setEmail(data.email);

        // this._httpClient.post(
        //     event.token?  mainenv['authHost']+'api/user/post/loginGoogle':mainenv['authHost']+'api/user/post/login',
        //     event.token?{googleToken: event.token}:this.login.getRawValue())
        //   .toPromise().then(result => {
        //     console.log(result)
        //     if(result['status']=='valid') {
        //       ApplicationSettings.setString("jwt",result['data']['jwt']);
        //       ApplicationSettings.setNumber("timer",result['data']['timer']);
        //       this.userService.updateTokenInDatabase();
        //       this.userService.isAuthenticated(true);
        //       this.router.navigate(['friends-explore']);
        //     }
        //     else {
        //         if(result['data']) {
        //           this.tempReason = result['data']['message'];
        //           this.changeDetection.detectChanges()
        //         }
        //         else {
        //           console.log(result['error']);
        //         }
        //       }
        //     }); 
    }

    /**
     * This function is used to alert the user to ask if they want to reset their password or not
     */
    const onForgotTap = () => {
        setError('Forgot Pass');
        Alert.alert(
            "Reset Password?",
            "An email with a temporary password will be sent to your email address.",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "Reset", onPress: () => resetOption() }
            ]
        );
    }

    // const resetOption = () => {
    //     console.log("OK Pressed");
    //     console.log("reset ");
    //     console.log(environment['authHost']);
    //     console.log(JSON.stringify(email));
    //     // this._httpClient.post(
    //     //     mainenv['authHost']+'api/user/post/forgotpassword',
    //     //     {email: this.login.controls['email'].value})
    //     //   .toPromise().then(result => {
    //     //     if(result['status']=='valid') {
    //     //       this.tempReason = result['data']['message'];
    //     //     }
    //     //     else {
    //     //       console.log(result['error']);
    //     //     }
    //     //   });
    // }

    //helper method to reset password
    async function resetOption() {
        console.log("OK Pressed");
        console.log("reset ");
        console.log(environment['authHost']);
        console.log(JSON.stringify(email));
        try{
        const response = await fetch(environment['authHost']+'api/user/post/forgotpassword', {
            method : 'POST',
            headers : {
            },
            body: JSON.stringify(email)});
        
            console.log('reset email sent successfully');}
        catch(e){
            console.log('Error to reset password');
            setError('Error to send email');
        }
    }

    /**
       * @description render() returns a div 
       * @returns The div containing 
       */

    return (
        <View style={styles.container}>
            <Controller

                control={control}
                rules={{
                    required: true,
                    message: 'Email is required'
                }}
                render={({ field: { onChange, onBlur, value }, fieldState: { errors } }) => (
                    <TextInput
                        style={[styles.formInput, { borderColor: errors ? 'red' : 'white' }]}
                        placeholder="Email"
                        placeholderTextColor='white'
                        className="form-input"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                    />
                )}
                name="email"
            />
            {errors.email && <Text>This is required.</Text>}

            <Controller
                control={control}
                rules={{
                    required: true,
                    message: 'Password is required'
                }}
                render={({ field: { onChange, onBlur, value }, fieldState: { errors } }) => (
                    <TextInput
                        style={[styles.formInput, { borderColor: errors ? 'red' : 'white' }]}
                        placeholder="Password"
                        placeholderTextColor='white'
                        className="form-input"
                        secureTextEntry={true}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                    />
                )}
                name="password"
            />
            {errors.password && <Text>This is required.</Text>}

            <Text style={styles.error} class="error" textWrap="true" >{error}</Text>

            <TouchableOpacity style={styles.buttonSignIn}
                onPress={handleSubmit(onSignInTap)}
            >
                <Text style={styles.textSignIn}>Sign In</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonForgotPass}
                onPress={onForgotTap}
            >
                <Text style={styles.textForgotPass}>Forgot Password</Text>
            </TouchableOpacity>

            {/* <TouchableOpacity style={styles.buttonSignInwithAG}>
                    <Text style={styles.textAG}>Sign In with Apple</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonSignInwithAG}>
                    <Text style={styles.textAG}>Sign In with Google</Text>
                </TouchableOpacity> */}
        </View>
    )

}

export default LogIn;

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
    textAG: {
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
        marginBottom: '3%',
        marginTop: '3%',
    },

    formInput: {
        fontSize: 16,
        marginBottom: 5,
        borderBottomWidth: 1,
        borderColor: 'white',
        paddingBottom: 5,
        marginTop: '5%',
    },

    errorInput: {
        fontSize: 16,
        marginBottom: 5,
        borderBottomWidth: 1,
        borderColor: 'red',
        paddingBottom: 5,
        marginTop: '5%',
    }

});
