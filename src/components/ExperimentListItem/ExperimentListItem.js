import React from 'react';
import { Image, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { format, addDays } from 'date-fns';

const experimentlistItem = props => (
    <TouchableOpacity  style={styles.listItem} onPress={props.onItemPressed}>
        <View style={styles.boxDotLine}>
            <View style={styles.verticalLine}></View>
            <View style={styles.dot}></View>
            <View style={styles.verticalLine}></View>
        </View>
        <View style={styles.line}></View>
        <View style={styles.containerinfo}>
            <Text style={styles.date}>{format(props.date, 'DD MMM YY')} - {props.experimentTarget}</Text>
        </View>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '95%',
        paddingLeft: 10,
        marginLeft: 5,
        marginRight: 5
    },
    dot: {
        backgroundColor: '#07a8a8',
        width: 15,
        height: 15,
        borderRadius: 7.5
    },
    line: {
        // marginTop: 4,
        height: 1,
        width: 15,
        backgroundColor: '#333'
    },
    experimentTarget: {
        fontSize: 18,
        // fontStyle: "bold"
    },
    containerinfo: {
        // marginTop: 4,
        width: '95%',
        backgroundColor: '#eee',
        borderRadius: 5,
        height: 40,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 10
    },
    date: {
        fontSize: 18,
        width: '100%'
    },
    verticalLine: {
        width: 2,
        height: 20,
        backgroundColor: "orange",
    },
    boxDotLine: {
        height: 55,
        alignItems: 'center',
        justifyContent: 'flex-start',
    }
})

export default experimentlistItem;