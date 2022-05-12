import React from "react";
import {
  Image,
  TouchableOpacity,
  Text,
  View,
  TextInput,
  Alert,
} from "react-native";
import { environment } from "../../environment/environment";
import styles from "../../global/global-styles.js";
import globalConstant from "../../global/global-constant.js";
import { Formik } from "formik";
import * as yup from "yup";
import * as SecureStore from "expo-secure-store";
import { appleAuth } from "@invertase/react-native-apple-authentication";
import * as AppleAuthentication from "expo-apple-authentication";
import AppleAuth from "../AppleAuth/AppleAuth";
/**
 * @description This class is used to display the log in form
 * where the user can log in or reset their password
 */
function LogIn() {
  const token = "";
  //use to add validation to the form by using yup
  const loginValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Please enter valid email")
      .required("Email is required"),
    password: yup.string().required("Password is required"),
  });

  //use to change the error message displayed to the user
  const [error, setError] = React.useState(null);

  /**
   * async function used to sign in the user
   * @param {*} data is the values entered by the user
   */
  async function onSignInTap(data) {
    const url = environment["authHost"] + "api/user/post/login";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      let responseJSON = await response.json();
      console.log(responseJSON["status"] == "valid");
      if (responseJSON["status"] == "valid") {
        await SecureStore.setItemAsync("jwt", responseJSON["data"]["jwt"]);
        updateTokenInDatabase();
        console.log(responseJSON["data"]["message"]);
        console.log('log in');
      } else {
        if (responseJSON["data"]) {
          console.log("error1");
          setError(responseJSON["data"]["message"]);
        } else {
          console.log("error2");
          setError(responseJSON["error"]["code"]);
        }
      }
    } catch (e) {
      console.log("error3");
      setError("Error to Sign In " + e);
    }
  }

  /**
   * Function used to alert the user to ask if they want to reset their password or not
   */
  const onForgotTap = (email) => {
    Alert.alert(
      "Reset Password?",
      "An email with a temporary password will be sent to your email address.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        { text: "Reset", onPress: () => resetOption(email) },
      ]
    );
  };

  /**
   * async helper function to reset password
   * @param {*} valueEmail is the email entered by the user
   */
  async function resetOption(valueEmail) {
    const url = environment["authHost"] + "api/user/post/forgotpassword";
    const userEmail = {
      email: valueEmail,
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userEmail),
      });
      let responseJSON = await response.json();
      if (responseJSON["status"] == "valid") {
        setError(responseJSON["data"]["message"]);
      }
    } catch (e) {
      setError("Error to reset email " + e);
    }
  }

  /**
   * async function used to update the user's token in the database
   */
  async function updateTokenInDatabase() {
    const url = environment["host"] + "api/user/post/updateToken";

    if (token != null) {
      try {
        const userToken = {
          token: await SecureStore.getItemAsync("jwt"),
        };
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "x-app-auth": await SecureStore.getItemAsync("jwt"),
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userToken),
        });
      } catch (e) {
        setError("Error to update token " + e);
      }
    }
  }

  async function onAppleButtonPress() {
    console.log("Apple Pressed");
    try {
      // AppleAuthentication.refreshAsync();
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });
      console.log("sign in");
      console.log(credential);
      const appleUserLogin = {
        appleToken: credential.identityToken,
        email: credential.email,
        password: '',
      }
      onSignInTap(appleUserLogin);
      
    } catch (e) {
      if (e.code === "ERR_CANCELED") {
       console.log(e);
      } else {
        console.log(e);
      }
    }
  }
  

  /**
   * @description render() returns a div
   * @returns The div containing the Log In form
   */
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validateOnMount={true}
      onSubmit={(values) => onSignInTap(values)}
      validationSchema={loginValidationSchema}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        touched,
        errors,
        isValid,
      }) => (
        <View>
          <TextInput
            style={[
              styles.formInput,
              globalConstant.formInputMarginPadding,
              {
                borderColor:
                  (errors.email && touched.email) ||
                  (errors.email && values.email)
                    ? "red"
                    : "white",
              },
            ]}
            placeholder="Email*"
            placeholderTextColor="white"
            className="form-input"
            onChangeText={handleChange("email")}
            onBlur={handleBlur("email")}
            value={values.email}
          />

          <TextInput
            style={[
              styles.formInput,
              globalConstant.formInputMarginPadding,
              {
                borderColor:
                  errors.password && touched.password ? "red" : "white",
              },
            ]}
            placeholder="Password*"
            placeholderTextColor="white"
            className="form-input"
            secureTextEntry={true}
            onChangeText={handleChange("password")}
            onBlur={handleBlur("password")}
            value={values.password}
          />

          {error && (
            <Text
              style={[
                styles.error,
                {
                  marginBottom: globalConstant.errorMarginSize,
                  marginTop: globalConstant.errorMarginSize,
                },
              ]}
            >
              {error}
            </Text>
          )}

          <View style={{ opacity: !isValid ? "0.5" : "1" }}>
            <TouchableOpacity
              style={[
                styles.formButton,
                globalConstant.formButton,
                {
                  backgroundColor: globalConstant.darkVioletColor,
                },
              ]}
              disabled={!isValid}
              onPress={handleSubmit}
            >
              <Text style={styles.textSignIn}>Sign In</Text>
            </TouchableOpacity>
          </View>

          <View
            style={{ opacity: !errors.email && values.email ? "1" : "0.5" }}
          >
            <TouchableOpacity
              style={[
                styles.formButton,
                globalConstant.formButton,
                {
                  borderColor: globalConstant.darkVioletColor,
                  borderWidth: globalConstant.formButtonBorderWidth,
                  backgroundColor: globalConstant.whiteColor,
                },
              ]}
              disabled={!errors.email && values.email ? false : true}
              onPress={() => onForgotTap(values.email)}
            >
              <Text style={styles.textForgotPass}>Forgot Password</Text>
            </TouchableOpacity>
          </View>

          <AppleAuthentication.AppleAuthenticationButton
            buttonType={
              AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN
            }
            buttonStyle={
              AppleAuthentication.AppleAuthenticationButtonStyle.WHITE_OUTLINE
            }
            cornerRadius={100}
            style={[globalConstant.formButton]}
            onPress={onAppleButtonPress}
          />
          {/* <TouchableOpacity
            style={[
              styles.formButton,
              globalConstant.formButton,
              {
                borderColor: globalConstant.blackColor,
                borderWidth: globalConstant.formButtonBorderWidth,
                backgroundColor: globalConstant.whiteColor,
              },
            ]}
          >
            <Text style={styles.textAG}>Sign In with Google</Text>
          </TouchableOpacity> */}
        </View>
      )}
    </Formik>
  );
}

export default LogIn;
