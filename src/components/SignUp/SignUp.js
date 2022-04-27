import React from "react";
import { Alert, TouchableOpacity, Image, StyleSheet, Text, View, TextInput } from "react-native";
/*https://github.com/xgfe/react-native-datepicker*/
import DatePicker from 'react-native-datepicker';
import { useForm, Controller } from "react-hook-form";
import { environment } from "../../environment/environment";
import styles from "../styles.js";
import { Formik } from 'formik';
import * as yup from 'yup';

/**
 * @description This class is used to display the log in form
 */
function SignUp() {
    const loginValidationSchema = yup.object().shape({
        name: yup.string().required('Name is required'),
        email: yup.string().email('Please enter valid email').required('Email is required'),
        password: yup.string().required('Password is required'),
    });
    
    const [error, setError] = React.useState(null);

    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    });

    const onRegisterTap = (data) => {
        Alert.alert(
            "Reset Password?",
            "An email with a temporary password will be sent to your email address.",
            [
                {
                    text: "No",
                    onPress: () => console.log("No Pressed"),
                    style: "No"
                },
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed")
                },
                {
                    text: "I agree to the Terms",
                    onPress: () => agreeOption(data)
                }
            ]
        );
    }

    const agreeOption = (data) => {
        console.log("Agree Pressed");
        console.log(data);
        // this._httpClient.post(
        //     mainenv['authHost']+'api/user/post/registerGoogle',
        //     this.registration.getRawValue())
        //   .toPromise().then(result => {
        //     if(result['status']=='valid') {
        //       ApplicationSettings.setString("jwt",result['data']['jwt']);
        //       ApplicationSettings.setNumber("timer",result['data']['timer']);
        //       this.userService.updateTokenInDatabase();
        //       this.userService.isAuthenticated(true);
        //       this.router.navigate(['/tutorial']);
        //     }
        //     else {
        //         console.log(result['error']);
        //       }
        //     });
        //   }

    }

    /**
       * @description render() returns a div 
       * @returns The div containing 
       */
    return (
        <Formik
            initialValues={{ date:'',name:'',email: '', password: '' }}
            validateOnMount={true}
            onSubmit={values => onRegisterTap(values)}
            validationSchema={loginValidationSchema}>
            {({ handleChange, handleBlur, handleSubmit, values, touched, errors, isValid }) => (
                <View style={styles.container}>

                    <DatePicker style={styles.datePicker}
                        date={values.date}
                        mode="date"
                        placeholder="Date of Birth"
                        format="YYYY-MM-DD"
                        minDate="1920-05-01"
                        maxDate="2020-08-01"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                            dateIcon: {
                                display: 'none'
                            },
                            dateInput: {
                                borderWidth: 0,
                                alignItems: 'flex-start',
                                justifyContent: 'flex-end'
                            },
                            dateText: {
                                color: 'white',
                                fontSize: 16,
                            },
                            placeholderText: {
                                color: 'white',
                                fontSize: 16
                            },
                        }}
                        onDateChange={handleChange('date') }
                        onBlur={handleBlur('date')}
                        value={values.date}
                    />
                    <Text>date: {values.date}</Text>

                    <TextInput
                        style={[styles.formInput, { borderColor: (errors.name && touched.name) ? 'red' : 'white' }]}
                        placeholder="Display Name*"
                        placeholderTextColor='white'
                        className="form-input form-input-placeholder"
                        onChangeText={handleChange('name')}
                        onBlur={handleBlur('name')}
                        value={values.name} />
                    {(errors.name && touched.name) && <Text>{errors.name} value {errors.name && touched.name ? 'true' : 'false'}</Text>}


                    <TextInput
                        style={[styles.formInput, { borderColor: (errors.email && values.email) ? 'red' : 'white' }]}
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
                        style={styles.buttonSignUp}
                        disabled={!isValid}
                        onPress={handleSubmit}>
                        <Text style={styles.textSignUp}>Register</Text>
                    </TouchableOpacity>
                    </View>

                    {/* <TouchableOpacity style={styles.buttonSignUpnwithAG}>
                    <Text style={styles.textAG}>Sign up with Apple</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonSignUpnwithAG}>
                    <Text style={styles.textAG}>Sign up with Google</Text>
                </TouchableOpacity> */}
                </View>
            )}
        </Formik>
    )
}
export default SignUp;