import React from "react";
import { TextInput, StyleSheet } from "react-native";

const defaultInput = props => (

    <TextInput    
        underlineColorAndroid="transparent"
        {...props}
        style={[ styles.input, props.style, !props.valid && props.touched ? styles.invalid : null ]} 
    />

);

var styles = StyleSheet.create({
    input: {
        width: "100%",
        borderWidth: 1,
        borderColor: "#b5b5b5",
        padding: 8,
        margin: 8,
        backgroundColor: "#ffffff",
    },
    invalid: {
        backgroundColor: "#f9c0c0",
        borderColor: "red",
    }
});

export default defaultInput;