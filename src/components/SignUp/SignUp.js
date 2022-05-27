import React, { useEffect } from "react";
import { Alert, TouchableOpacity, Text, View, TextInput } from "react-native";
import DatePicker from "react-native-datepicker";
import { environment } from "../../environment/environment";
import styles from "../../global/global-styles.js";
import globalConstant from "../../global/global-constant.js";
import { Formik } from "formik";
import * as yup from "yup";
import { terms } from "../../edit-profile/terms";
import * as SecureStore from "expo-secure-store";
import * as AppleAuthentication from "expo-apple-authentication";
/**
 * @description This class is used to display the Sign Up form
 * where the user can register
 */
function SignUp() {
  const token = "";
  //use to add validation to the form by using yup
  const loginValidationSchema = yup.object().shape({
    displayName: yup.string().required("Name is required"),
    email: yup
      .string()
      .email("Please enter valid email")
      .required("Email is required"),
    password: yup.string().required("Password is required"),
  });

  //use to change the error message displayed to the user
  const [error, setError] = React.useState(null);

  const [isIOS, setIsIOS] = React.useState(null);

  useEffect(() => {
    checkIsIOS();
  }, []);

  async function checkIsIOS() {
    try {
      setIsIOS(await AppleAuthentication.isAvailableAsync());
    } catch (e) {
      console.log(e);
    }
  }

  console.log(isIOS);

  /**
   * Function used to alert the user to ask if they agree to the term of use
   * @param {*} inputData is the values entered by the user
   */
  const onRegisterTap = (inputData) => {
    Alert.alert("Term Of Use", terms, [
      {
        text: "No",
        style: "No",
      },
      {
        text: "Cancel",
      },
      {
        text: "I agree to the Terms",
        onPress: () => registerOption(inputData),
      },
    ]);
  };

  /**
   * async helper function to register the user
   * @param {*} inputData is the values entered by the user
   */
  async function registerOption(inputData) {
    var newUser = "";
    if (inputData.appleToken) {
      newUser = inputData;
      console.log(newUser);
    } else {
      let datePieces = inputData.dob.split("-");

      //create a new User
      newUser = {
        displayName: inputData.displayName,
        email: inputData.email,
        year: datePieces[0],
        month: datePieces[1],
        day: datePieces[2],
        password: inputData.password,
        dob: inputData.dob,
      };
    }
    const url = environment["authHost"] + "api/user/post/registerGoogle";
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });
      let responseJSON = await response.json();
      if (responseJSON["status"] == "valid") {
        await SecureStore.setItemAsync("jwt", responseJSON["data"]["jwt"]);
        updateTokenInDatabase();
      } else {
        if (responseJSON["error"]["code"] == "ER_DUP_ENTRY") {
          setError(
            "A user with this email address or username has already registered with us."
          );
        } else {
          setError(responseJSON["error"]["code"]);
        }
      }
    } catch (e) {
      setError("There was an error " + e);
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
   * Function used to alert the user to let them know their apple email is invalid
   * @param {*} inputData is the values entered by the user
   */
  const showAlertApple = (inputData) => {
    Alert.alert(
      "Warning",
      "There was no email from that response. If it is not your first time trying to autofill with apple, do the following and try again. Settings > Tap your name > Password & Security > Apps Using Apple Id > Puggum > Stop using Apple Id",
      [
        {
          text: "Okay",
        },
      ]
    );
  };

  /**
   * Function used to alert the user that their account is invalid
   */
  const invalidUserAlert = () => {
    Alert.alert(
      "Account Blocked",
      "Your Apple ID credential is revoked or not found. Please change your apple's password before sign up again",
      [{ text: "Close" }]
    );
  };

  /**
   * async function used to check if the email is valid or not
   */
  async function checkForValidEmail(appleUserRegister) {
    console.log("checkForValidEmail");
    const url =
      environment["host"] +
      "api/user/get/usernameEmailValid?email=" +
      appleUserRegister.email +
      "&displayName=" +
      appleUserRegister.displayName;
    console.log(url);
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      let responseJSON = await response.json();
      console.log(responseJSON["status"]);
      if (responseJSON["status"] == "invalid") {
        setError(responseJSON["message"]);
        return false;
      } else {
        setError(responseJSON[""]);
        return true;
      }
    } catch (e) {
      setError("There was an error " + e);
      return false;
    }
  }

  /**
   * async function used to let the user sign in with apple authentication
   */
  async function onAppleButtonPress() {
    var userFullName = "";
    console.log("Apple Pressed");
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });
      console.log("sign up");
      console.log(credential);

      if (credential.fullName.givenName && credential.fullName.familyName) {
        userFullName = credential.fullName.givenName.concat(
          credential.fullName.familyName
        );
      }

      //if the email is not hidden
      if (credential.email) {
        //create new user object
        const appleUserRegister = {
          displayName: userFullName,
          appleToken: credential.user,
          email: credential.email,
          password: "",
        };
        //if email valid, create new user by calling register function
        if (checkForValidEmail(appleUserRegister)) {
          console.log("true");

          console.log(`===================================`);
          console.log(appleIDProvider);
          console.log(`===================================`);
          //check the user's credential state
          let appleIDProvider =
            await AppleAuthentication.getCredentialStateAsync(credential.user);
          switch (appleIDProvider) {
            case 1:
              console.log("Apple ID credential is valid");
              await onRegisterTap(appleUserRegister);
              // The Apple ID credential is valid.
              break;
            case 0:
              console.log("revoke");
              invalidUserAlert();
              //The given user’s authorization has been revoked and they should be signed out.
              setError("The Apple ID credential is revoked.");
              break;
            case 2:
              console.log("not found");
              invalidUserAlert();
              setError("No credential was found.");
              //The user hasn’t established a relationship with Sign in with Apple.
              break;
            default:
              break;
          }
        } else {
          console.log("false");
          setError("The email used is not valid.");
        }
      }

      if (!credential.email) {
        showAlertApple();
      }
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
   * @returns The div containing the sign up form
   */
  return (
    <Formik
      initialValues={{ dob: "", displayName: "", email: "", password: "" }}
      validateOnMount={true}
      onSubmit={(values) => onRegisterTap(values)}
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
          <DatePicker
            style={[
              styles.datePicker,
              {
                paddingBottom: globalConstant.padding,
                marginBottom: globalConstant.inputMarginBottom,
              },
            ]}
            date={values.dob}
            mode="date"
            placeholder="Date of Birth"
            format="YYYY-MM-DD"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={globalConstant.datePickerStyles}
            onDateChange={handleChange("dob")}
            onBlur={handleBlur("dob")}
            value={values.dob}
          />

          <TextInput
            style={[
              styles.formInput,
              globalConstant.formInputMarginPadding,
              {
                borderColor:
                  errors.displayName && touched.displayName ? "red" : "white",
              },
            ]}
            placeholder="Display Name*"
            placeholderTextColor="white"
            className="form-input form-input-placeholder"
            onChangeText={handleChange("displayName")}
            onBlur={handleBlur("displayName")}
            value={values.displayName}
          />

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
                  borderColor: globalConstant.darkVioletColor,
                  borderWidth: globalConstant.formButtonBorderWidth,
                  backgroundColor: globalConstant.whiteColor,
                },
              ]}
              disabled={!isValid}
              onPress={handleSubmit}
            >
              <Text style={styles.textSignUp}>Register</Text>
            </TouchableOpacity>
          </View>

          {!isIOS && (
            <AppleAuthentication.AppleAuthenticationButton
              buttonType={
                AppleAuthentication.AppleAuthenticationButtonType.SIGN_UP
              }
              buttonStyle={
                AppleAuthentication.AppleAuthenticationButtonStyle.WHITE_OUTLINE
              }
              cornerRadius={100}
              style={[globalConstant.formButton]}
              onPress={onAppleButtonPress}
            />
          )}
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
            <Text style={styles.textAG}>Sign Up with Google</Text>
          </TouchableOpacity> */}
        </View>
      )}
    </Formik>
  );
}
export default SignUp;
