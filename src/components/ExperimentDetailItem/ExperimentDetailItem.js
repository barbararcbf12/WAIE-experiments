import React from 'react';
import { Image, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { format } from 'date-fns';


const experimentDetailItem = props => {

        let bgColor = "#fff";

        if(props.name == "Bowel Urgency"){
          bgColor = "#ffb300";
        }
        if(props.name == "Bloating"){
          bgColor = "#99af72";
        }
        if(props.name == "Constipation"){
          bgColor = "#00ffff";
        }
        if(props.name == "Craving"){
          bgColor = "#ff00ff";
        }
        if(props.name == "Diarrhea"){
          bgColor = "#ffff00";
        }
        if(props.name == "Frequent/Infrequent Bowel Moviments"){
          bgColor = "#07a8a8";
        }
        if(props.name == "Heartburn"){
          bgColor = "#00ff00";
        }
        if(props.name == "Nausea / Vomit"){
          bgColor = "#bb8296";
        }
        if(props.name == "Other"){
          bgColor = "#4f8eef";
        }

        const placeType = (
            <Image source={props.image} style={styles.placeImage} />
        );
        
        const itemName = (
            <View><Text style={styles.symptomName}>{props.name}</Text></View>
        );
        
        const itemComments = (
            <View><Text style={styles.symptomName}>{props.comments}</Text></View>
        );
        
        const symptomType = (
            <View style={[styles.symptomBox, {backgroundColor: `${bgColor}`}]}>{itemName}</View>
        );

        return(
            <TouchableOpacity style={styles.listItem} onPress={props.onItemPressed}>
                <View style={styles.leftColumn}>
                    <Text style={styles.placeName}>{format( props.date, 'DD MMM YYYY' )}</Text>
                    { props.type === "place" ? itemName : itemComments }
                </View>
                <View style={styles.centerColumn}>
                    { props.type === "place" ? placeType :  symptomType }
                    <View style={styles.verticalLine}></View>
                </View>
                <View style={styles.rightColumn}>
                </View>
            </TouchableOpacity>
        )
};

const styles = StyleSheet.create({
    listItem: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
        // padding: 5,
        // backgroundColor: '#eee',
        margin: 0,
    },
    verticalLine: {
        width: 2,
        height: 15,
        backgroundColor: "orange",
    },
    placeName: {
        fontSize: 12
    },
    symptomName: {
        fontSize: 12
    },
    placeImage:{
        // marginRight: 8,
        width: 90,
        height: 90,
        borderWidth: 4,
        borderRadius: 45,
        borderColor: "orange"
    },
    leftColumn: {
        width: '30%',
        display: 'flex',
        justifyContent: 'center',
        alignItems:'flex-end'   
    },
    centerColumn: {
        width: '30%',
        display: 'flex',
        justifyContent: 'center',
        alignItems:'center'   
    },
    rightColumn: {
        width: '30%',
        display: 'flex',
        justifyContent: 'center',
        alignItems:'flex-start'   
    },
    symptomBox: {
        width: 75,
        height: 75,
        display: 'flex',
        justifyContent: 'center',
        alignItems:'center',
    }
})

export default experimentDetailItem;