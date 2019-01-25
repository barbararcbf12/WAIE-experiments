import React, { Component } from 'react';
import { Modal, View, Text, TouchableOpacity, Button, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const myIcon = (<Icon name="ios-checkmark" size={30} color="#000" />)

class ChartFilters extends Component {
  
    constructor(props){
        super(props);
        this.state = {
          filter: 'All', 
          modalVisible: true
        }
    }

    onPressHandler = (symptomName) => {
        this.setState( prevState => {
            return {
                    ...prevState.filter,
                    filter: symptomName
            }
        });
        this.props.onPress(this.state.filter);
    }

    
    render() {

    return (
        
        <View style={styles.container}>
            <View style={styles.headerBox}>
                <Text style={styles.text}>Choose one symptom to filter the chart's data:</Text>
            </View>
            <TouchableOpacity 
                onPress={ () => this.props.onPress("All") } 
                style={[styles.symptomBox, {backgroundColor: "#ccc"}]}
            >
                <Text style={styles.textBox}>All</Text>
                <View style={styles.iconBox}>
                    { this.props.filter === "All" ? myIcon : null }
                </View> 
            </TouchableOpacity>

            <TouchableOpacity 
                onPress={() => this.props.onPress("Bloating")} 
                style={[styles.symptomBox, {backgroundColor: "#99af72"}]}
            >
                <Text style={styles.textBox}>Bloating</Text>
                <View style={styles.iconBox}>
                    { this.props.filter === "Bloating" ? myIcon : null }
                </View> 
            </TouchableOpacity>

            <TouchableOpacity 
                onPress={() => this.props.onPress("Constipation")} 
                style={[styles.symptomBox, {backgroundColor: "#00ffff"}]}
            >
                <Text style={styles.textBox}>Constipation</Text>
                <View style={styles.iconBox}>
                    { this.props.filter === "Constipation" ? myIcon : null }
                </View> 
            </TouchableOpacity>

            <TouchableOpacity 
                onPress={() => this.props.onPress("Craving")} 
                style={[styles.symptomBox, {backgroundColor: "#ff00ff"}]}
            >
                <Text style={styles.textBox}>Craving</Text>
                <View style={styles.iconBox}>
                    { this.props.filter === "Craving" ? myIcon : null }
                </View> 
            </TouchableOpacity>

            <TouchableOpacity 
                onPress={() => this.props.onPress("Diarrhea")} 
                style={[styles.symptomBox, {backgroundColor: "#ffff00"}]}
            >
                <Text style={styles.textBox}>Diarrhea</Text>
                <View style={styles.iconBox}>
                    { this.props.filter === "Diarrhea" ? myIcon : null }
                </View> 
            </TouchableOpacity>

            <TouchableOpacity 
                onPress={() => this.props.onPress("Bowel Moviments")} 
                style={[styles.symptomBox, {backgroundColor: "#07a8a8"}]}
            >
                <Text style={styles.textBox}>Bowel Moviments</Text>
                <View style={styles.iconBox}>
                    { this.props.filter === "Bowel Moviments" ? myIcon : null }
                </View> 
            </TouchableOpacity>

            <TouchableOpacity 
                onPress={() => this.props.onPress("Heartburn")} 
                style={[styles.symptomBox, {backgroundColor: "#00ff00"}]}
            >
                <Text style={styles.textBox}>Heartburn</Text>
                <View style={styles.iconBox}>
                    { this.props.filter === "Heartburn" ? myIcon : null }
                </View> 
            </TouchableOpacity>

            <TouchableOpacity 
                onPress={() => this.props.onPress("Nausea / Vomit")} 
                style={[styles.symptomBox, {backgroundColor: "#bb8296"}]}
            >
                <Text style={styles.textBox}>Nausea / Vomit</Text>
                <View style={styles.iconBox}>
                    { this.props.filter === "Nausea / Vomit" ? myIcon : null }
                </View> 
            </TouchableOpacity>

            <TouchableOpacity 
                onPress={() => this.props.onPress("Other")} 
                style={[styles.symptomBox, {backgroundColor: "#4f8eef"}]}
            >
                <Text style={styles.textBox}>Other</Text>
                <View style={styles.iconBox}>
                    { this.props.filter === "Other" ? myIcon : null }
                </View> 
            </TouchableOpacity>
            {/* </Modal> */}
        </View>
    );
}
}

var styles =  StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingTop: 2,
        paddingBottom: 2,
        backgroundColor: "#fff",
        borderBottomWidth: 2,
        borderBottomColor: "#ccc"
        // width: '80%',
        // paddingTop: 15
    },
    text: {
        margin: 5,
        marginTop: 5,
        fontSize: 12,
    },
    headerBox: {
        width: "100%",
        // marginTop: 30,
        alignItems: "flex-start",
        justifyContent: "center",
    },
    symptomBox: {
        display: 'flex',
        flexDirection: "row",
        justifyContent: "space-between",
        alignContent: "space-between",
        minWidth: 40,
        padding: 5,
        margin: 2,
        borderRadius: 5,
    },
    textBox: {
        fontSize: 12,
    },
    iconBox: { 
        marginLeft: 5, 
        marginTop: -10, 
        marginBottom: -15 
    }
});

export default ChartFilters;