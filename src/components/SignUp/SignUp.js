import React from "react";
import { Alert, TouchableOpacity, Text, View, TextInput } from "react-native";
/*https://github.com/xgfe/react-native-datepicker*/
import DatePicker from "react-native-datepicker";
import { environment } from "../../environment/environment";
import styles from "../styles.js";
import { Formik } from "formik";
import * as yup from "yup";
import { terms } from "../../edit-profile/terms";
import * as SecureStore from "expo-secure-store";

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

  /**
   * Function used to alert the user to ask if they agree to the term of use
   * @param {*} data
   */
  const onRegisterTap = (data) => {
    Alert.alert("Term Of Use", terms, [
      {
        text: "No",
        onPress: () => console.log("No Pressed"),
        style: "No",
      },
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
      },
      {
        text: "I agree to the Terms",
        onPress: () => agreeOption(data),
      },
    ]);
  };

  /**
   * async helper function to register the user
   * @param {*} data is the values entered by the user
   */
  async function agreeOption(data) {
    console.log("Agree Pressed");
    let datePieces = data.dob.split("-");
    //create a new User
    const newUser = {
      displayName: data.displayName,
      email: data.email,
      year: datePieces[0],
      month: datePieces[1],
      day: datePieces[2],
      password: data.password,
      dob: data.dob,
    };
    console.log("new User " + newUser.year);
    let url = environment["authHost"] + "api/user/post/registerGoogle";
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
        console.log("6." + responseJSON["data"]["jwt"]);
        await SecureStore.setItemAsync("jwt", responseJSON["data"]["jwt"]);
        //test only
        const token = await SecureStore.getItemAsync("jwt");
        console.log(token);
        //
        updateTokenInDatabase();
        console.log("Registered successfully");
        console.log("logged in");
      } else {
        console.log("8." + responseJSON["error"]);
        setError("There was an error " + responseJSON["error"]);
      }
    } catch (e) {
      console.log("Error to create user " + e);
      setError("There was an error " + e);
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
            style={styles.datePicker}
            date={values.dob}
            mode="date"
            placeholder="Date of Birth"
            format="YYYY-MM-DD"
            // minDate="1920-05-01"
            // maxDate="2020-08-01"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                display: "none",
              },
              dateInput: {
                borderWidth: 0,
                alignItems: "flex-start",
                justifyContent: "flex-end",
              },
              dateText: {
                color: "white",
                fontSize: 16,
              },
              placeholderText: {
                color: "white",
                fontSize: 16,
              },
            }}
            onDateChange={handleChange("dob")}
            onBlur={handleBlur("dob")}
            value={values.dob}
          />
          <Text>date: {values.dob}</Text>

          <TextInput
            style={[
              styles.formInput,
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
          {errors.displayName && touched.displayName && (
            <Text>
              {errors.displayName} value{" "}
              {errors.name && touched.displayName ? "true" : "false"}
            </Text>
          )}

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
              style={styles.buttonSignUp}
              disabled={!isValid}
              onPress={handleSubmit}
            >
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
  );
}
export default SignUp;
