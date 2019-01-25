import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Button, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { addSymptom, addPlace } from '../../store/actions/index';
import DatePicker from 'react-native-datepicker';

import PlaceInput from "../../components/PlaceInput/PlaceInput";
import SymptomInput from "../../components/SymptomInput/SymptomInput";
import PickLocation from "../../components/PickLocation/PickLocation";
// import MainText from "../../components/UI/MainText/MainText";
// import HeadingText from "../../components/UI/HeadingText/HeadingText";
import validate from "../../utility/validation";
import { startAddSymptom, startAddPlace } from "../../store/actions/index";
import Icon from 'react-native-vector-icons/Ionicons';

const myIcon = (<Icon name="ios-checkmark" size={30} color="#000"  />);

// const myIcon = (
//     <View style={{ marginTop: -5, marginBottom: -10 }}>
//         <Icon name="ios-checkmark" size={30} color="#000" />                        
//     </View>
// );

class LogSymptom extends Component {
    static navigatorStyle = {
        navBarButtonColor: "orange"
    };

    constructor(props){
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
        this.screenState = null;
    }

    componentDidMount(){
        this.locationPickedHandler();
    }

    componentWillMount(){
        this.reset();
    }

    componentDidUpdate(){
        if(this.props.symptomAdded){
            this.props.navigator.switchToTab({tabIndex: 0});
            this.props.onStartAddSymptom();
        }
    }

    reset = () => {
        this.setState({
            controls: {
                symptomName: {
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
                    value: ""
                },
                date: { value: new Date() },
                type: "symptom",
                comments: {
                    value: ""
                },
            }
        });

        // this.locationPickedHandler();
    }

    onNavigatorEvent = event => {
        switch(event.id) {
            case 'willAppear':
            this.screenState = "willAppear";
            break;
            case 'didAppear':
            this.screenState = "didAppear";
            break;
            case 'willDisappear':
            this.screenState = "willDisappear";
            break;
            case 'didDisappear':
            this.screenState = "didDisappear";
            break;
        }
        
        if(event.type === "ScreenChangedEvent"){
            if(event.id === "willAppear"){
                this.props.onStartAddSymptom();
                // this.reset();
                // this.locationPickedHandler();
            }
        }
        
        if(event.type === "ScreenChangedEvent"){
            if(event.id === "didAppear"){
                // this.props.onStartAddSymptom();
                // this.reset();
                // this.locationPickedHandler();
            }
        }

        if(event.type === "NavBarButtonPress") {
            if(event.id === "sideDrawerToggle") {
                this._toggleDrawer();
            }
        }
        //START NEW
        if (event.type === "DeepLink" && (this.screenState == "willAppear" || this.screenState == "didAppear")) {
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

    symptomNameChagedHandler = val => {
        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    symptomName: {
                        ...prevState.controls.symptomName,
                        value: val,
                        valid: validate(val, prevState.controls.symptomName.validationRules),
                        touched: true
                    }
                }
            }
        });
    };

    onPressHandler = (symptomName, comments) => {
        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    symptomName: {
                        value: symptomName,
                        valid: true
                    },
                    type: "symptom",
                    comments: {
                        value: comments
                    },
                    // image: {
                    //     value: symptomName
                    // }
                }
            }
        })
    }

    symptomAddedHandler = () => {
        this.commentsChagedHandler();
        // this.locationPickedHandler();
        this.props.onAddSymptom(
            this.state.controls.symptomName.value, 
            this.state.controls.location.value,
            this.state.controls.image.value,
            this.state.controls.date.value,
            this.state.controls.type,
            this.state.controls.comments.value
        );
        this.reset();
        this.imageLocation.reset();
        this.props.navigator.switchToTab({tabIndex: 0});
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
    }

    commentsChagedHandler = val => {
        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    comments: {
                        // ...prevState.controls.comments,
                        value: val
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
                        // ...prevState.controls.date,
                        value: new Date(date)
                    }
                }
            }
        });
    };

    render () {
        let submitButton = (
            <Button 
                title="LOG SYMPTOM" 
                onPress={this.symptomAddedHandler}
                disabled={
                    !this.state.controls.symptomName.valid 
                }
            />
        );

        if (this.props.isLoading){
            submitButton = <ActivityIndicator />;
        }

        const inputField = (<PlaceInput 
            placeData={this.state.controls.comments}
            onChangeText={this.commentsChagedHandler}
            style = { [styles.placeinputBox]}
        />)

        return (
            <ScrollView >
                <View style={styles.container}>

                    {/* <TouchableOpacity 
                        onPress={() => this.onPressHandler("Bowel Urgency")} 
                        style={[styles.symptomBox, {backgroundColor: "#ffb300", }]}
                    >
                        <Text style={styles.textBox}>Bowel Urgency</Text>
                        <View style={{marginTop: -5, marginBottom: -10}}>
                            { this.state.controls.symptomName.value === "Bowel Urgency" ? myIcon : null }
                        </View> 
                        // <View style={styles.box}>
                        //    <Text style={styles.textBox}>Bowel Urgency </Text>{ this.state.controls.symptomName.value === "Bowel Urgency" ? myIcon : null }
                        //</View> 
                    </TouchableOpacity> */}
                    <View style = {styles.dateContainer}>
                        <Text>Date of symptom: </Text>
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
                    
                    <View style={styles.columnsContainer}>
                        <View style={styles.symptomColumn}>
                            <TouchableOpacity 
                                onPress={() => this.onPressHandler("Bloating", this.state.controls.comments.value)} 
                                style={[styles.symptomBox, {backgroundColor: "#99af72"}]}
                            >
                                <Text style={styles.textBox}>Bloating</Text>
                                <View style={{marginTop: -5, marginBottom: -10}}>
                                    { this.state.controls.symptomName.value === "Bloating" ? myIcon : null }
                                </View> 
                            </TouchableOpacity>

                            <TouchableOpacity 
                                onPress={() => this.onPressHandler("Constipation", this.state.controls.comments.value)} 
                                style={[styles.symptomBox, {backgroundColor: "#00ffff"}]}
                            >
                                <Text style={styles.textBox}>Constipation</Text>
                                <View style={{marginTop: -5, marginBottom: -10}}>
                                    { this.state.controls.symptomName.value === "Constipation" ? myIcon : null }
                                </View> 
                            </TouchableOpacity>

                            <TouchableOpacity 
                                onPress={() => this.onPressHandler("Craving", this.state.controls.comments.value)} 
                                style={[styles.symptomBox, {backgroundColor: "#ff00ff"}]}
                            >
                                <Text style={styles.textBox}>Craving</Text>
                                <View style={{marginTop: -5, marginBottom: -10}}>
                                    { this.state.controls.symptomName.value === "Craving" ? myIcon : null }
                                </View> 
                            </TouchableOpacity>

                            <TouchableOpacity 
                                onPress={() => this.onPressHandler("Diarrhea", this.state.controls.comments.value)} 
                                style={[styles.symptomBox, {backgroundColor: "#ffff00"}]}
                            >
                                <Text style={styles.textBox}>Diarrhea</Text>
                                <View style={{marginTop: -5, marginBottom: -10}}>
                                    { this.state.controls.symptomName.value === "Diarrhea" ? myIcon : null }
                                </View> 
                            </TouchableOpacity>
                        </View>

                        <View style={styles.symptomColumn}>
                            <TouchableOpacity 
                                onPress={() => this.onPressHandler("Bowel Moviments")} 
                                style={[styles.symptomBox, {backgroundColor: "#07a8a8"}]}
                            >
                                <Text style={[styles.textBox]}>Bowel Moviments</Text>
                                <View style={{marginTop: -5, marginBottom: -10}}>
                                    { this.state.controls.symptomName.value === "Bowel Moviments" ? myIcon : null }
                                </View> 
                            </TouchableOpacity>

                            <TouchableOpacity 
                                onPress={() => this.onPressHandler("Heartburn", this.state.controls.comments.value)} 
                                style={[styles.symptomBox, {backgroundColor: "#00ff00"}]}
                            >
                                <Text style={styles.textBox}>Heartburn</Text>
                                <View style={{marginTop: -5, marginBottom: -10}}>
                                    { this.state.controls.symptomName.value === "Heartburn" ? myIcon : null }
                                </View> 
                            </TouchableOpacity>

                            <TouchableOpacity 
                                onPress={() => this.onPressHandler("Nausea / Vomit", this.state.controls.comments.value)} 
                                style={[styles.symptomBox, {backgroundColor: "#bb8296"}]}
                            >
                                <Text style={styles.textBox}>Nausea / Vomit</Text>
                                <View style={{marginTop: -5, marginBottom: -10}}>
                                    { this.state.controls.symptomName.value === "Nausea / Vomit" ? myIcon : null }
                                </View> 
                            </TouchableOpacity>

                            <TouchableOpacity 
                                onPress={() => this.onPressHandler("Other", this.state.controls.comments.value)} 
                                style={[styles.symptomBox, {backgroundColor: "#4f8eef"}]}
                            >
                                <Text style={styles.textBox}>Other</Text>
                                <View style={{marginTop: -5, marginBottom: -10}}>
                                    { this.state.controls.symptomName.value === "Other" ? myIcon : null }
                                </View> 
                            </TouchableOpacity>
                        </View>
                    </View>
                    
                    <View style={styles.mapContainer}>
                        <Text style={styles.textCommentContainer}>Comments:</Text>
                        {inputField}
                    </View>

                    <View style={styles.mapContainer}>
                        <Text style={styles.textMapContainer}>Pick a location:</Text>
                        {/* {this.state.controls.symptomName === 'other' ? inputField : null } */}
                        <PickLocation style={styles.map} onLocationPick={this.locationPickedHandler} ref={ref => (this.imageLocation = ref)} />
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
        // symptomAdded: state.symptoms.symptomAdded
        symptomAdded: state.places.placeAdded
    };
};

const mapDispatchToProps = dispatch => {
    return {
        // onAddSymptom: (symptomName, location, image) => dispatch(addSymptom(symptomName, location, image)),
        // onStartAddSymptom: () => dispatch(startAddSymptom()),
        onAddSymptom: (symptomName, location, image, date, type, comments) => dispatch(addPlace(symptomName, location, image, date, "symptom", comments)),
        onStartAddSymptom: () => dispatch(startAddPlace())
    };
};

var styles =  StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        paddingTop: 15
    },
    columnsContainer: {
        width: "100%",
        justifyContent: "center",
        flexDirection: "row",
    },
    symptomColumn: {
        flexDirection: "column",
        width: "45%",
        margin: 5
    },
    box:{
        flex: 1,
        flexDirection: "row",
        alignItems: "baseline",
        justifyContent: "space-between",
        width: "100%",
        marginTop: -10, 
        marginBottom: -10,
        height: 40,
    },
    icon: {
        alignItems: "flex-end",
    },
    symptominputBox:{
        height: 40,
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
        margin: 5,
        marginTop: 0
    },
    previewImage: {
        width: "100%",
        height: "100%",
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
        // fontWeight: 'bold',
    },
    map: {
        height: "1",
        marginBottom: 5
    },
    symptomBox: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignContent: "space-between",
        width: "100%",
        padding: 10,
        paddingTop: 12,
        paddingBottom: 12,
        marginBottom: 7,
        borderRadius: 5,
        //backgroundColor: "#ffb300"
    },
    textBox: {
        width: "95%",
        fontSize: 14,
    },
    textCommentContainer: {
        marginLeft: 10,
        marginBottom: 0,
        fontSize: 16,
        marginTop: 5,
        // fontWeight: 'bold',
    },
    placeinputBox:{
        width: "95%",
        paddingLeft: 0,
    },
    dateContainer: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        width: "90%",
        margin: 5,
        marginTop: 0
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(LogSymptom);