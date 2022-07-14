import React, { useEffect } from "react";
import { TouchableOpacity, Text, View, TextInput, Alert } from "react-native";
import { environment } from "../../environment/environment";
import styles from "../../global/global-styles.js";
import globalConstant from "../../global/global-constant.js";
import { Formik } from "formik";
import * as yup from "yup";
import * as SecureStore from "expo-secure-store";
import * as AppleAuthentication from "expo-apple-authentication";
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';
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

  //use to verify if the mobile used is an IOS
  const [isIOS, setIsIOS] = React.useState(null);

  /**
   * function used to verify if the mobile is an IOS whenever the user is using the application
   */
  useEffect(() => {
    checkIsIOS();
  }, []);

  /**
   * function used to verify if the current device's operating system supports Apple authentication.
   */
  async function checkIsIOS() {
    try {
      setIsIOS(await AppleAuthentication.isAvailableAsync());
    } catch (e) {
      setError("Couldn't detect the device's OS");
    }
  }

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
      if (responseJSON["status"] == "valid") {
        await SecureStore.setItemAsync("jwt", responseJSON["data"]["jwt"]);
        updateTokenInDatabase();
      } else {
        if (responseJSON["data"]) {
          setError(responseJSON["data"]["message"]);
        } else {
          setError(responseJSON["error"]["code"]);
        }
      }
    } catch (e) {
      setError("Error to Sign In " + e);
    }
  }

  /**
   * Function used to alert the user to ask if they want to reset their password or not
   */
  const onForgotTap = (email) => {
    Alert.alert(
      "Reset Password?", "An email with a temporary password will be sent to your email address.",
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

  /**
   * async function used to block the user's in the database
   */
  async function blockUserInDatabase(data) {
    const url = environment["authHost"] + "/api/user/post/updateBlockedDate";
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      let responseJSON = await response.json();
      if (responseJSON["status"] == "valid") {
        setError(responseJSON["data"]["message"]);
      }
    } catch (e) {
      setError("Error to block/unblock user " + e);
    }
  }

  /**
   * Function used to alert the user that their apple account is invalid
   */
  const invalidUserAlert = () => {
    Alert.alert(
      "Account Blocked", "Your Apple ID credential is revoked or not found. Please view your apple account before signing in again",
      [{ text: "Okay" }]
    );
  };

  /**
   * async function used to let the user sign in with apple authentication
   */
  async function onAppleButtonPress() {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });
      const appleUserLogin = {
        appleToken: credential.user,
        email: credential.email,
        password: "",
        isValidUser: true,
      };

      //check the user's credential state
      let appleIDProvider = await AppleAuthentication.getCredentialStateAsync(
        credential.user
      );

      switch (appleIDProvider) {
        case 1:
          // The Apple ID credential is valid.
          break;
        case 0:
          //The given user’s authorization has been revoked and they should be signed out.
          setError("The Apple ID credential is revoked.");
          //block user by setting isValidUser to false
          appleUserLogin.isValidUser = false;
          invalidUserAlert();
          break;
        case 2:
          //The user hasn’t established a relationship with Sign in with Apple.
          setError("No credential was found.");
          //block user by setting isValidUser to false
          appleUserLogin.isValidUser = false;
          invalidUserAlert();
          break;
        default:
          break;
      }
      await blockUserInDatabase(appleUserLogin);
      await onSignInTap(appleUserLogin);
    } catch (e) {
      if (e.code === "ERR_CANCELED") {
      } else {
        setError("Can't use apple authentication");
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
            placeholder="Email**"
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

          <View style={{ opacity: !isValid ? 0.5 : 1 }}>
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
          <GoogleSigninButton
            style={{ width: 192, height: 48 }}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={this._signIn}
            disabled={this.state.isSigninInProgress}
          />;
          <View
            style={{ opacity: !errors.email && values.email ? 1 : 0.5 }}
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

          {isIOS && (
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
          )}
        </View>
      )}
    </Formik>
  );
}

export default LogIn;
