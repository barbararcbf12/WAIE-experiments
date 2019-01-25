import React, { Component } from 'react';
import { View, Image, Text, Dimensions, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { connect } from 'react-redux';
import MapView from "react-native-maps";

import Icon from 'react-native-vector-icons/Ionicons';
import { deletePlace, deleteSymptom } from '../../store/actions/index';

class PlaceDetail extends Component {
    state = {
        viewMode: Dimensions.get("window").height > Dimensions.get("window").width ? "portrait" : "landscape",
    }

    constructor(props){
        super(props);
        Dimensions.addEventListener("change", this.updateStyles);
    }

    updateStyles = dims => {   
        this.setState({
            viewMode: dims.window.height > dims.window.width ? "portrait" : "landscape"
        })
    };

    componentWillUnmount() {
        Dimensions.removeEventListener("change", this.updateStyles);
    }

    placeDeletedHandler = () => {
        this.props.onDeletePlace(this.props.selectedPlace.key);
        this.props.navigator.pop();
    }

    symptomDeletedHandler = () => {
        this.props.onDeleteSymptom(this.props.selectedPlace.key);
        this.props.navigator.pop();
    }

    render() {


      let bgColor = "#fff";
      
      if(this.props.selectedPlace.name == "Bowel Urgency"){
        // label = "Bowel urgency";
        bgColor = "#ffb300";
      }
      if(this.props.selectedPlace.name == "Bloating"){
        // label = "Bloating";
        bgColor = "#99af72";
      }
      if(this.props.selectedPlace.name == "Constipation"){
        // label = "Constipation";
        bgColor = "#00ffff";
      }
      if(this.props.selectedPlace.name == "Craving"){
        // label = "Craving";
        bgColor = "#ff00ff";
      }
      if(this.props.selectedPlace.name == "Diarrhea"){
        // label = "Diarrhea";
        bgColor = "#ffff00";
      }
      if(this.props.selectedPlace.name == "Bowel Moviments"){
        // label = "F/IBM";
        bgColor = "#07a8a8";
      }
      if(this.props.selectedPlace.name == "Heartburn"){
        // label = "Heartburn";
        bgColor = "#00ff00";
      }
      if(this.props.selectedPlace.name == "Nausea / Vomit"){
        // label = "Nausea/Vomit";
        bgColor = "#bb8296";
      }
      if(this.props.selectedPlace.name == "Other"){
        // label = "Other";
        bgColor = "#4f8eef";
      }

        let type = (
            <View style={styles.placeImage}>
                <View style={styles.containerComments}>
                    <Text style={styles.labels}>Symptom:</Text>
                </View>
                <View style={[styles.symptomBox, {backgroundColor: `${bgColor}`}]}>
                    <Text style={styles.textBox}>{this.props.selectedPlace.name}</Text>
                </View>
            </View>
        );

        if(this.props.selectedPlace.type === "place"){
            type = <Image source={this.props.selectedPlace.image} style={styles.placeImage}/>;
        }

        let comments = (
            <View style={styles.containerComments}>
                <Text style={styles.labels}>Comments:</Text>
                <Text style={styles.placeName}>{this.props.selectedPlace.type === 'place' ? this.props.selectedPlace.name : this.props.selectedPlace.comments}</Text>
            </View>
        );

        return (
            <View style={[styles.container, this.state.viewMode === "portrait" ? styles.portraitContainer : styles.landscapeContainer]}>
                <View style={styles.placeDetailContainer}>  
                    <View style={styles.containerImage}>
                        {type}
                    </View>
                    <View style={styles.containerLabels}>
                        <Text style={styles.labels}>Location:</Text>
                    </View>
                    <View style={styles.containerMap}>
                        <MapView 
                            initialRegion={{
                                ...this.props.selectedPlace.location,
                                latitudeDelta: 0.0122,
                                longitudeDelta: 
                                Dimensions.get("window").width /
                                Dimensions.get("window").height * 0.0122
                            }}
                            style={styles.map}
                        >
                            <MapView.Marker coordinate={this.props.selectedPlace.location} />
                        </MapView>
                    </View>
                </View>
                {comments}
                <View style={styles.subContainer}>
                    <View style={styles.buttonDelete}>
                        <TouchableOpacity onPress={this.placeDeletedHandler} >
                            <Icon name={Platform.OS === "android" ? "md-trash" : "ios-trash"} size={30} color='red' />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            // </Modal>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        margin: 26,
        flex: 1,
    },
    symptomBox: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '85%',
        padding: 10,
        paddingTop: 12,
        paddingBottom: 12,
        marginBottom: 10,
        borderRadius: 5,
    },
    portraitContainer: {
        flexDirection: "column",
    },
    landscapeContainer: {
        flexDirection: "row",
    },
    placeImage: {
        width: '100%',
        height: '100%',
    },
    buttonDelete: {
        alignItems: 'center',
    },
    containerLabels: {
        flex: 1.75,
        justifyContent: "flex-end"
    },
    containerComments: {
        flex: 5,
    },
    labels: {
      fontSize: 16,
      fontWeight: 'bold',
      marginTop: 5,
      marginBottom: 2,
      alignItems: 'flex-start',
    },
    placeName: {
      fontSize: 16,
      fontWeight: 'normal',
      marginBottom: 10,
      alignItems: 'flex-start'
    },
    subContainer: {
        flex: 2,
        alignItems: 'center',
    },
    containerMap:{
        flex: 5,
        alignItems: 'center',
    },
    containerImage: {
        flex: 10,
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject
    },
    placeDetailContainer: {
        flex: 20
    },
    textBox: {
        width: "95%",
        fontSize: 36,
        fontWeight: 'bold',
        alignItems: 'center',
    }
});

const mapDispatchToProps = dispatch => {
    return {
        onDeletePlace: key => dispatch(deletePlace(key)),
        onDeleteSymptom: key => dispatch(deleteSymptom(key))
    };
};

export default connect(null, mapDispatchToProps)(PlaceDetail);