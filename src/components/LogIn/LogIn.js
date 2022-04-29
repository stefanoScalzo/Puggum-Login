import React from "react";
import { TouchableOpacity, StyleSheet, Text, View, TextInput, Alert } from "react-native";
import { environment } from "../../environment/environment";
import styles from "../styles.js";
import { Formik } from 'formik';
import * as yup from 'yup';

/**
 * @description This class is used to display the log in form
 */
function LogIn() {
    const loginValidationSchema = yup.object().shape({
        email: yup.string().email('Please enter valid email').required('Email is required'),
        password: yup.string().required('Password is required'),
    });


    const [error, setError] = React.useState(null);

    // const { control, handleSubmit, reset, isValid, formState: { errors } } = useForm({
    //     defaultValues: {
    //         email: '',
    //         password: ''
    //     }
    // });

    // console.log("errors " + isEmpty(errors));

    async function onSignInTap(data) {
        setError('Sign In');
        console.log(data);
        console.log(environment['authHost']);
        console.log(JSON.stringify(data));
        const url=environment['authHost'] + 'api/user/post/login';
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(data)
            });
            
            if(response['status']=='valid'){
                console.log('valid');
            }
            else{
                console.log(response['error']);
            }
            console.log("response "+response);
            console.log('Log In successfully');
        }
        catch (e) {
            console.log('Error to Sign In password ' +e);
            setError('Error to Sign In ' + e);
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
    }

    /**
     * This function is used to alert the user to ask if they want to reset their password or not
     */
    const onForgotTap = (email) => {
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
                { text: "Reset", onPress: () => resetOption(email) }
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
    async function resetOption(email) {
        console.log("OK Pressed");
        console.log("reset ");
        console.log(environment['authHost']);
        console.log("email " + JSON.stringify(email));
        console.log(email);
        const url=mainenv['authHost']+'api/user/post/forgotpassword';

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(email)
            });
            if(response['status']=='valid'){
                console.log('valid');
            }
            else{
                console.log(response['error']);
            }
            console.log("response "+response);

            console.log('Reset email sent successfully');
        }
        catch (e) {
            console.log('Error to reset password '+e );
            setError('Error to send email '+e);
        }
    }

    /**
       * @description render() returns a div 
       * @returns The div containing 
       */

    return (
        <Formik
            initialValues={{ email: '', password: '' }}
            validateOnMount={true}
            onSubmit={values => onSignInTap(values)}
            validationSchema={loginValidationSchema}>
            {({ handleChange, handleBlur, handleSubmit, values, touched, errors, isValid }) => (
                <View style={styles.container}>

                    <TextInput
                        style={[styles.formInput, { borderColor: ((errors.email && touched.email)||(errors.email && values.email)) ? 'red' : 'white' }]}
                        placeholder="Email*"
                        placeholderTextColor='white'
                        className="form-input"
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        value={values.email}
                    />
                    {(errors.email && touched.email) && <Text>{errors.email} value {errors.email && values.email ? 'true' : 'false'}</Text>}
                    <Text>{values.email} value</Text>

                    <TextInput
                        style={[styles.formInput, { borderColor: (errors.password && touched.password) ? 'red' : 'white' }]}
                        placeholder="Password*"
                        placeholderTextColor='white'
                        className="form-input"
                        secureTextEntry={true}
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        value={values.password}
                    />
                    {(errors.password && touched.password) && <Text>{errors.password} value {errors.password && touched.password ? 'true' : 'false'}</Text>}

                    <Text style={styles.error} class="error" textWrap="true" >{error}</Text>
                    <View style={{ opacity: (!isValid) ? '0.5' : '1' }}>
                        <TouchableOpacity
                            style={styles.buttonSignIn}
                            disabled={!isValid}
                            onPress={handleSubmit}
                        >
                            <Text style={styles.textSignIn}>Sign In</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ opacity: (!errors.email && values.email) ? '1' : '0.5' }}>
                        <TouchableOpacity
                            style={styles.buttonForgotPass}
                            disabled={(!errors.email && values.email) ? false : true}
                            onPress={()=>onForgotTap(values.email)}
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
            )}
        </Formik>
    )

}

export default LogIn;