import React from 'react';
import { StyleSheet } from 'react-native';

import DefaultInput from '../UI/DefaultInput/DefaultInput';

const symptomInput = props => (
    <DefaultInput 
        placeholder="Type your symptom" 
        value={props.symptomData.value}
        valid={props.symptomData.valid}
        touched={props.symptomData.touched}
        onChangeText={props.onChangeText} 
        style = {styles.sympInput}
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
      width: '95%',
      height: 60
    },
});

export default symptomInput;