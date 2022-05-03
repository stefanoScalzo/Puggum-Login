import { Component } from "react";
import { Pressable, Image, Text, View } from "react-native";

import LogIn from "./LogIn/LogIn.js";
import SignUp from "./SignUp/SignUp.js";
import styles from "./styles.js";

/**
 * @description This class is used to display the nav bar
 * where the user can switch from log in to sign up
 */
class NavBar extends Component {
  constructor() {
    super();
    this.state = {
      activeButton: "first",
    };
  }

  /**
   * @description render() returns a div
   * @returns The div containing the nav buttons
   */
  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.imageContainer}>
          {this.state.activeButton === "second" && (
            <Image
              style={styles.profileImage}
              source={require("../../assets/default.jpg")}
            />
          )}
        </View>
        <View style={styles.container}>
          <Pressable
            onPress={() => this.setState({ activeButton: "first" })}
            style={
              this.state.activeButton === "first"
                ? styles.buttonActive
                : styles.button
            }
          >
            <Text style={styles.text}>Login</Text>
          </Pressable>

          <Pressable
            onPress={() => this.setState({ activeButton: "second" })}
            style={
              this.state.activeButton === "second"
                ? styles.buttonActive
                : styles.button
            }
          >
            <Text style={styles.text}>Sign Up</Text>
          </Pressable>
        </View>
        {this.state.activeButton === "first" && <LogIn></LogIn>}
        {this.state.activeButton === "second" && <SignUp></SignUp>}
      </View>
    );
  }
}

export default NavBar;
