import React, { Component } from "react";
import { View, Text, Button, StyleSheet, Dimensions } from "react-native";
import MapView from "react-native-maps";

class PickLocation extends Component {

    state = {
        focusedLocation: {
            latitude: 37.7900352,
            longitude: -122.4013726,
            latitudeDelta: 0.0122,
            longitudeDelta: Dimensions.get("window").width / Dimensions.get("window").height * 0.0122
        },
        locationChosen: false
    }

    componentWillMount(){
        this.reset();
    }

    reset = () => {
        this.getLocationHandler();
    }

    pickLocationHandler = event => {
        const coords = event.nativeEvent.coordinate;
        this.map.animateToRegion({
            ...this.state.focusedLocation,
            latitude: coords.latitude,
            longitude: coords.longitude
        });
        this.setState(prevState => {
            return {
                focusedLocation: {
                    ...prevState.focusedLocation,
                    latitude: coords.latitude,
                    longitude: coords.longitude
                },
                locationChosen: true
            };
        });
        this.props.onLocationPick({
            latitude: coords.latitude,
            longitude: coords.longitude
        });
    };

    getLocationHandler = () => {
        navigator.geolocation.getCurrentPosition(pos => {
            const coordsEvent = {
                nativeEvent: {
                    coordinate: {
                        latitude: pos.coords.latitude,
                        longitude: pos.coords.longitude
                    }
                }
            };
            this.pickLocationHandler(coordsEvent);
        },
        err => {
            console.log(err);
            alert("Fetching the positions failed, please pick one manually!");
        })
    }

    render() {
        let marker = null;

        if(this.state.locationChosen){
            marker = <MapView.Marker coordinate={this.state.focusedLocation} />;
        }

        return(
            <View style={styles.container}>
                
                    <MapView 
                        initialRegion={this.state.focusedLocation}
                        region={!this.state.locationChosen ? this.state.focusedLocation : null}
                        style={styles.map}
                        onPress={this.pickLocationHandler}
                        ref={ref => this.map = ref} 
                    >
                    {marker}
                    </MapView>
                
                <View style={styles.button}>
                    <Button title="Locate Me" onPress={this.getLocationHandler} />
                </View>

            </View>
        );
    }
}

var styles =  StyleSheet.create({
    container: {
        width: "100%",
        alignItems: "center",
    },
    containerMap: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        width: "95%",
        height: 100,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    button: {
        display: "none",
        margin: 8,
    },
});

export default PickLocation;