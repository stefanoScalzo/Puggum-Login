import { ResponseType } from "expo-auth-session";
import * as Facebook from "expo-auth-session/providers/facebook";
import * as WebBrowser from "expo-web-browser";
import * as React from "react";
import { Button, Image, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import NavBar from "./src/components/NavBar.js";
import KeyboardAvoidingInput from "./src/components/KeyboardAvoidingInput.js";
import styles from "./src/global/global-styles";
import globalConstant from "./src/global/global-constant.js";

// export default function App() {

//   return (
//     <LinearGradient
//       colors={globalConstant.darkVioletLinearColor}
//       start={globalConstant.linearDirection}
//       style={styles.appContainer}
//     >
//       <KeyboardAvoidingInput>
//         <View style={styles.appContainer}>
//           <Image source={require("./assets/logo_horizontal_white.png")} />
//           <NavBar></NavBar>
//           {/* {user ? (
//         <Profile user={user} />
//       ) : (
//         <Button
//           disabled={!request}
//           title="Open FB Auth"
//           onPress={handlePressAsync}
//         />
//       )} */}
//         </View>
//       </KeyboardAvoidingInput>
//     </LinearGradient>
//   );
// }

// function Profile({ user }) {
//   return (
//     <View style={styles.profile}>
//       <Image source={{ uri: user.picture.data.url }} style={styles.image} />
//       <Text style={styles.name}>{user.name}</Text>
//       <Text>ID: {user.id}</Text>
//     </View>
//   );
// }

export default class App extends React.Component {
  render() {
    return (
          <LinearGradient
      colors={globalConstant.darkVioletLinearColor}
      start={globalConstant.linearDirection}
      style={styles.appContainer}
    >
        <View style={styles.appContainer}>
          <Image source={require("./assets/logo_horizontal_white.png")} />
          <NavBar></NavBar>
        </View>
    </LinearGradient>
    );
  }
}
