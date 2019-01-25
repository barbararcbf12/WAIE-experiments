import React, { Component } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

import DefaultInput from '../UI/DefaultInput/DefaultInput';

const placeInput = props => (
    <DefaultInput 
        placeholder="Add optional comments" 
        value={props.placeData.value}
        valid={props.placeData.valid}
        touched={props.placeData.touched}
        onChangeText={props.onChangeText} 
        style = { [ styles.placeInput, props.style ] }
    />
);

const styles = StyleSheet.create({
    inputContainer: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    placeInput: {
      fontSize: 16,
      color: 'black',
      width: '95%',
      height: 60
    },
    placeButton: {
      backgroundColor: 'blue',
      color: 'white',
      fontSize: 10,
      width: '30%',
    },
});

export default placeInput;