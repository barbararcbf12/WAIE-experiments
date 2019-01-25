import React, { Component } from 'react';
import { InteractionManager, View, Text, Image, Button, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { addPlace } from '../../store/actions/index';
import DatePicker from 'react-native-datepicker';

import PlaceInput from "../../components/PlaceInput/PlaceInput";
import PickImage from '../../components/PickImage/PickImage';
import PickLocation from "../../components/PickLocation/PickLocation";
import validate from "../../utility/validation";
import { startAddPlace } from "../../store/actions/index"

class SharePlaceScreen extends Component {
    static navigatorStyle = {
        navBarButtonColor: "orange"
    };

    constructor(props){
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }

    state = {
        controls: {
            placeName: {
                value: "",
                valid: false,
                touched: false,
                validationRules: {
                    notEmpty: true
                }
            },
            location: {
                value: null,
                valid: false
            },
            image: {
                value: null,
                valid: false
            },
            date: {
                value: ""
            },
            type: "place"
        }
    }

    componentWillMount(){
        this.reset();
    }

    componentDidUpdate(){
        if(this.props.placeAdded){
            // this.props.navigator.switchToTab({tabIndex: 0});
            this.props.onStartAddPlace();
        }
    }

    reset = () => {
        this.setState({
            controls: {
                placeName: {
                    value: "",
                    valid: false,
                    touched: false,
                    validationRules: {
                        notEmpty: true
                    }
                },
                location: {
                    value: null,
                    valid: false
                },
                image: {
                    value: null,
                    valid: false
                },
                date: { value: new Date() },
                // date: {
                //     value: ""
                // },
                type: "place"
            }
            // },
            // focusedLocation: {
            //     latitude: 37.7900352,
            //     longitude: -122.4013726,
            //     latitudeDelta: 0.0122,
            //     longitudeDelta: Dimensions.get("window").width / Dimensions.get("window").height * 0.0122
            // }
        })
    }

    onNavigatorEvent = event => {
        
        // if(event.type === "ScreenChangedEvent"){
        //     if(event.id === "willDisappear" || event.id === "didDisappear"){
        //         this.props.onLoadPlaces();
        //     }
        // }
        
        if(event.type === "ScreenChangedEvent"){
            if(event.id === "willAppear"){
                this.props.onStartAddPlace();
            }
        }
        if(event.type === "NavBarButtonPress") {
            if(event.id === "sideDrawerToggle") {
                this._toggleDrawer();
            }
        }
        //START NEW
        if (event.type === "DeepLink" && (event.id == "willAppear" || event.id == "didAppear")) {
            const parts = event.link;
            if (parts == 'firstApp.MyExperimentScreen') {
                this._toggleDrawer();
                this.onGoToExperiments();
          }
        }
        //END NEW
    };

    _toggleDrawer() {
        this.props.navigator.toggleDrawer({
            side: "left"
        });
    }

    onGoToExperiments() { 
        this.props.navigator.push({
          title: "My Experiments",
          screen: "firstApp.MyExperimentScreen",
          navigatorStyle: {tabBarHidden: true}
        });
    }

    placeNameChagedHandler = val => {
        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    placeName: {
                        ...prevState.controls.placeName,
                        value: val,
                        valid: validate(val, prevState.controls.placeName.validationRules),
                        touched: true
                    }
                }
            }
        });
    };

    imagePickedHandler = image => {
        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    image: {
                        value: image,
                        valid: true
                    }
                }
            }
        })
    };

    placeAddedHandler = () => {
        this.locationPickedHandler();
        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    type: "place"
                }
            }
        })
        //if (this.state.controls.placeName.value.trim() !== ""){
            this.props.onAddPlace(
                this.state.controls.placeName.value, 
                this.state.controls.location.value,
                this.state.controls.image.value,
                this.state.controls.date.value,
                this.state.controls.type
            );
        //}
        this.reset();
        this.imagePicker.reset();
        this.imageLocation.reset();

        InteractionManager.runAfterInteractions(() => {
            setTimeout(() => {
                this.props.navigator.switchToTab({tabIndex: 0});
            }, 3000);
        });
    };

    locationPickedHandler = location => {
        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    location: {
                        value: location,
                        valid: true
                    }
                }
            }
        });
    };

    datePickerChagedHandler(date) {
        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    date: {
                        ...prevState.controls.date,
                        value: new Date(date)
                    }
                }
            }
        });
    };

    render () {
        let submitButton = (
            <Button 
                title="ADD MEAL" 
                onPress={this.placeAddedHandler}
                disabled={
                    !this.state.controls.placeName.valid && 
                    // !this.state.controls.location.valid ||
                    !this.state.controls.image.valid
                }
            />
        );

        if (this.props.isLoading){
            submitButton = <ActivityIndicator />;
        }

        return (
            <ScrollView >
                <View style={styles.container}>
                    <View style = {styles.dateContainer}>
                        <Text>Date of the meal: </Text>
                        <DatePicker
                            style={{width: "50%"}}
                            date={this.state.controls.date.value}
                            mode="datetime"
                            placeholder="select date"
                            format="MM/DD/YYYY HH:mm"
                            minDate="01/01/2019"
                            // maxDate="3000-06-01"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                            dateIcon: {
                                position: 'absolute',
                                left: "100%",
                                top: 4,
                                marginLeft: 0
                            },
                            dateInput: {
                                marginLeft: 5
                            }
                            // ... You can check the source to find the other keys.
                            }}
                            onDateChange={date => this.datePickerChagedHandler(date)}
                            // onDateChange={(date) => {this.setState({date: date})}}
                        />
                    </View>
                
                    <PickImage onImagePicked={this.imagePickedHandler} ref={ref => (this.imagePicker = ref)} />
                    
                    <View style={styles.mapContainer}>
                        <Text style={styles.textCommentContainer}>Comments:</Text>
                        <PlaceInput 
                            placeData={this.state.controls.placeName}
                            onChangeText={this.placeNameChagedHandler}
                            style = {styles.placeinputBox}
                        />
                    </View>

                    <View style={styles.mapContainer}>
                        <Text style={styles.textMapContainer}>Pick a location:</Text>
                        <PickLocation onLocationPick={this.locationPickedHandler} ref={ref => (this.imageLocation = ref)} />
                    </View>

                    <View style={styles.button}>
                        {submitButton}
                    </View>
            
                </View>
            </ScrollView>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoading: state.ui.isLoading,
        placeAdded: state.places.placeAdded
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAddPlace: (placeName, location, image, date, type) => dispatch(addPlace(placeName, location, image, date, "place")),
        onStartAddPlace: () => dispatch(startAddPlace()),
        // onLoadPlaces: () => dispatch(getPlaces()),
    };
};

var styles =  StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        paddingTop: 10
    },
    placeinputBox:{
        // height: 80,
        width: "80%"
    },
    placholder: {
        backgroundColor: "#eee",
        borderWidth: 1,
        borderColor: "black",
        width: "80%",
        height: 150,
    },
    button: {
        margin: 8,
        marginTop: 10
    },
    previewImage: {
        width: "100%",
        height: "100%",
    },
    map: {
        display: "none"
    },
    dateContainer: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        width: "90%",
        margin: 5,
        // marginTop: 2
    },
    mapContainer: {
        width: "100%",
        justifyContent: "center",
        margin: 0,
        padding: 5,
        paddingBottom: 0
    },
    textMapContainer: {
        marginLeft: 10,
        marginBottom: 5,
        fontSize: 16,
        marginTop: 5,
        // fontWeight: 'bold',
    },
    textCommentContainer: {
        marginLeft: 10,
        marginBottom: 0,
        marginTop: 5,
        fontSize: 16,
        // fontWeight: 'bold',
    },
    placeinputBox:{
        width: "95%",
        paddingLeft: 0,
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(SharePlaceScreen);