import { StyleSheet } from 'react-native';

export const authenticationStyles = StyleSheet.create({
    textForgotPass: {
        fontSize: 19,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'darkviolet',
    },
    buttonForgotPass: {
        alignItems: "center",
        justifyContent: "center",
        borderColor: 'darkviolet',
        borderWidth: 1,
        backgroundColor: 'white',
        borderRadius: 100,
        marginBottom: 10,
        minHeight: 44,
        height: 44,
    },

    textSignIn: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 19,
    },

    buttonSignIn: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: 'darkviolet',
        borderRadius: 100,
        padding: 5,
        marginBottom: 10,
        minHeight: 44,
        height: 44,
        
    },
    textAG:{
        color: 'black',
        fontWeight: 'bold',
        fontSize: 19,
    },
    buttonSignInwithAG: {
        alignItems: "center",
        justifyContent: "center",
        borderColor: 'black',
        borderWidth: 1,
        backgroundColor: 'white',
        borderRadius: 100,
        marginBottom: 10,
        minHeight: 44,
        height: 44,
    },

    error: {
        color: 'red',
        fontSize: 16,
        marginBottom:'3%',
    },

    formInput:{
        fontSize: 16,
        marginBottom: 5,
        borderBottomWidth:1,
        borderColor:'white',
        paddingBottom:5,
        marginBottom:'5%',
    },
});
