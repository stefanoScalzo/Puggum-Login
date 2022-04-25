import React from "react";
import { TouchableOpacity, StyleSheet, Text, View, TextInput, Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { environment } from "../../environment/environment";
import styles from "../styles.js";
import { isEmpty } from 'lodash';

/**
 * @description This class is used to display the log in form
 */
function LogIn() {
    const [error, setError] = React.useState(null);

    const { control, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: {
            email: '',
            password: ''
        }
    });

    console.log("errors " + isEmpty(errors));

    async function onSignInTap(data) {
        setError('Sign In');
        console.log(data);
        console.log(JSON.stringify(data));
        try {
            const response = await fetch(environment['authHost'] + 'api/user/post/login', {
                method: 'POST',
                headers: {
                },
                body: JSON.stringify(data)
            });

            //navigate(['friends-explore']);
            console.log('reset email sent successfully');
        }
        catch (e) {
            console.log('Error to reset password');
            setError('Error to Sign In');
        }
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
        reset();
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
        try {
            const response = await fetch(environment['authHost'] + 'api/user/post/forgotpassword', {
                method: 'POST',
                headers: {
                },
                body: JSON.stringify(email)
            });

            console.log('reset email sent successfully');
        }
        catch (e) {
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
            <View style={[styles.formInput, { borderColor: isEmpty(errors.email) ? 'white' : 'red' }]}>
                <Controller
                    control={control}
                    name="email"
                    rules={{
                        required: true,
                        message: 'Email is required'
                    }}
                    render={({ field: { onChange, onBlur, value }, fieldState: { errors } }) => (
                        <TextInput
                            placeholder="Email*"
                            placeholderTextColor='white'
                            className="form-input"
                            onChangeText={onChange}
                            value={value}

                        />
                    )}
                />
            </View>
            {/* {errors.email && <Text>This is required.</Text>} */}
            <View style={[styles.formInput, { borderColor: isEmpty(errors.password) ? 'white' : 'red' }]}>
                <Controller
                    control={control}
                    name="password"
                    rules={{
                        required: true,
                        message: 'Password is required'
                    }}
                    render={({ field: { onChange, onBlur, value }, fieldState: { errors } }) => (
                        <TextInput
                            placeholder="Password*"
                            placeholderTextColor='white'
                            className="form-input"
                            secureTextEntry={true}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                />
            </View>
            {/* {errors.password && <Text>This is required.</Text>} */}

            <Text style={styles.error} class="error" textWrap="true" >{error}</Text>
            <View style={{ opacity: isEmpty(errors.email) ? '1' : '0.5' }}>
                <TouchableOpacity
                    style={styles.buttonSignIn}
                    disabled={isEmpty(errors) ? false : true}
                    onPress={handleSubmit(onSignInTap)}
                >
                    <Text style={styles.textSignIn}>Sign In</Text>
                </TouchableOpacity>
            </View>
            <View style={{ opacity: isEmpty(errors.email) ? '1' : '0.5' }}>
                <TouchableOpacity
                    style={styles.buttonForgotPass}
                    disabled={isEmpty(errors.email) ? false : true}
                    onPress={onForgotTap}
                >
                    <Text style={styles.textForgotPass}>Forgot Password</Text>
                </TouchableOpacity>
            </View>

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

