import React from "react";
import { TouchableOpacity, Text, View, TextInput, Alert } from "react-native";
import { environment } from "../../environment/environment";
import styles from "../styles.js";
import { Formik } from "formik";
import * as yup from "yup";
import * as SecureStore from "expo-secure-store";
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
    console.log(data);
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
        console.log("6." + responseJSON["data"]["jwt"]);
        await SecureStore.setItemAsync("jwt", responseJSON["data"]["jwt"]);
        //test only
        const token = await SecureStore.getItemAsync("jwt");
        console.log("token " + token);
        //
        updateTokenInDatabase();

        console.log("logged in");
      } else {
        if (responseJSON["data"]) {
          setError(responseJSON["data"]["message"]);
        } else {
          console.log(responseJSON["error"]);
          setError(responseJSON["error"]);
        }
      }
    } catch (e) {
      console.log("Error to Sign In password " + e);
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
          onPress: () => console.log("Cancel Pressed"),
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
    console.log("OK Pressed");
    console.log(JSON.stringify(valueEmail));
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
        console.log("validddd");
        console.log(responseJSON["data"]["message"]);
        setError(responseJSON["data"]["message"]);
      } else {
        console.log("errorrr " + responseJSON["error"]);
      }
    } catch (e) {
      console.log("Error to reset password " + e);
      setError("Error to reset email " + e);
    }
  }

  /**
   * async function used to update the user's token in the database
   */
  async function updateTokenInDatabase() {
    console.log(
      "update token " + JSON.stringify(await SecureStore.getItemAsync("jwt"))
    );
    const url = environment["host"] + "api/user/post/updateToken";

    if (token != null) {
      console.log("inside update");
      try {
        const userToken = {
          token: await SecureStore.getItemAsync("jwt"),
        };
        console.log(userToken);
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "x-app-auth": await SecureStore.getItemAsync("jwt"),
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userToken),
        });
        let responseJSON = await response.json();
        console.log(responseJSON["status"] == "valid");
        if (responseJSON["status"] == "valid") {
          console.log("valid");
        } else {
          console.log(responseJSON["error"]);
        }
        console.log("Token updated successfully");
      } catch (e) {
        console.log("Error to update token " + e);
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
          {errors.email && touched.email && (
            <Text>
              {errors.email} value{" "}
              {errors.email && values.email ? "true" : "false"}
            </Text>
          )}
          <Text>{values.email} value</Text>

          <TextInput
            style={[
              styles.formInput,
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
          {errors.password && touched.password && (
            <Text>
              {errors.password} value{" "}
              {errors.password && touched.password ? "true" : "false"}
            </Text>
          )}

          <Text style={styles.error} class="error" textWrap="true">
            {error}
          </Text>
          <View style={{ opacity: !isValid ? "0.5" : "1" }}>
            <TouchableOpacity
              style={styles.buttonSignIn}
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
              style={styles.buttonForgotPass}
              disabled={!errors.email && values.email ? false : true}
              onPress={() => onForgotTap(values.email)}
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
  );
}

export default LogIn;
