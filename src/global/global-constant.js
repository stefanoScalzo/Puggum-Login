
import { Appearance, useColorScheme } from 'react-native-appearance';
const colorScheme = Appearance.getColorScheme();
// File for global constants
module.exports = {
  //padding size
  padding: 5,

  //error margin sizes
  errorMarginSize: "3%",

  //Margin/Padding sizes for the nav buttons
  buttonNavMarginPadding: {
    paddingLeft: "6%",
    paddingRight: "6%",
    paddingTop: "3%",
    paddingBottom: "3%",
    marginBottom: 10,
    margin: "2%",
  },

  //Margin/Padding sizes for form input
  formInputMarginPadding: {
    paddingBottom: 5,
    marginTop: "5%",
    marginBottom: 5,
  },

  //form buttons styles
  formButton: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    height: 44,
  },


  //border width size of the form's buttons
  formButtonBorderWidth: 1,

  //datePicker style
  datePickerStyles: {
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
    datePicker: { backgroundColor: colorScheme === 'dark' ? '#222' : 'white' }, 
    datePickerCon: { backgroundColor: colorScheme === 'dark' ? '#333' : 'white' }
  },

  //colors
  whiteColor: "white",
  blackColor: "black",
  darkVioletColor: "darkviolet",
  darkVioletLinearColor: ["darkviolet", "#1D001D"],

  linearDirection: { x: 0.3, y: 0.3 },
};
