import React from 'react';
import { StyleSheet } from 'react-native';

import DefaultInput from '../UI/DefaultInput/DefaultInput';

const experimentInput = props => (
    <DefaultInput 
        placeholder={props.placeholder} 
        value={props.experimentData.value}
        valid={props.experimentData.valid}
        touched={props.experimentData.touched}
        onChangeText={props.onChangeText} 
        style = {[styles.sympInput, props.style]}
    />
);

const styles = StyleSheet.create({
    inputContainer: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    sympInput: {
      fontSize: 16,
      color: 'black',
      width: '94%',
      height: 60
    },
});

export default experimentInput;