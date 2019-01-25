import React from 'react';
import { Image, Text, StyleSheet, TouchableOpacity } from 'react-native';

const listItem = props => (
    <TouchableOpacity  style={styles.listItem} onPress={props.onItemPressed}>
        <Image source={props.placeImage} style={styles.placeImage} />
        <Text style={styles.placeName}>{props.placeName}</Text>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        padding: 10,
        backgroundColor: '#eee',
        margin: 5,
    },
    placeName: {
        fontSize: 18,
    },
    placeImage:{
        marginRight: 8,
        width: 30,
        height: 30,
    },
})

export default listItem;