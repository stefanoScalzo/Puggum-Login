import React from "react";
import { Alert, TouchableOpacity, Image, StyleSheet, Text, View, TextInput } from "react-native";
/*https://github.com/xgfe/react-native-datepicker*/
import DatePicker from 'react-native-datepicker';
import { useForm, Controller } from "react-hook-form";
import { environment } from "../../environment/environment";
import styles from "../styles.js";

/**
 * @description This class is used to display the log in form
 */
function SignUp() {
    // constructor(props) {
    //     super(props)
    //     this.state = { date: "" }
    // }
    const [date, setDate] = React.useState(null);
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
        <View style={styles.container}>

            <DatePicker style={styles.datePicker}
                date={date}
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
                onDateChange={(date) => { setDate(date) }}
            />
            <Controller

                control={control}
                rules={{
                    required: true,
                    message: 'Name is required'
                }}
                render={({ field: { onChange, onBlur, value }, fieldState: { errors } }) => (

                    <TextInput
                        style={[styles.formInput, { borderColor: errors ? 'red' : 'white' }]}
                        placeholder="Display Name*"
                        placeholderTextColor='white'
                        className="form-input form-input-placeholder"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value} />
                )}
                name="name"
            />
            {errors.name && <Text>This is required.</Text>}

            <Controller

                control={control}
                rules={{
                    required: true,
                    message: 'Email is required'
                }}
                render={({ field: { onChange, onBlur, value }, fieldState: { errors } }) => (
                    <TextInput
                        style={[styles.formInput, { borderColor: errors ? 'red' : 'white' }]}
                        placeholder="Email*"
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
                        placeholder="Password*"
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

            <TouchableOpacity style={styles.buttonSignUp}
                onPress={handleSubmit(onRegisterTap)}>
                <Text style={styles.textSignUp}>Register</Text>
            </TouchableOpacity>

            {/* <TouchableOpacity style={styles.buttonSignUpnwithAG}>
                    <Text style={styles.textAG}>Sign up with Apple</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonSignUpnwithAG}>
                    <Text style={styles.textAG}>Sign up with Google</Text>
                </TouchableOpacity> */}
        </View>
    )
}
export default SignUp;