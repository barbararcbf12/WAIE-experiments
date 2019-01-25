import React, { Component } from 'react';
import { View, Text, Image, Button, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { addExperiment } from '../../store/actions/index';

import ExperimentInput from "../../components/ExperimentInput/ExperimentInput";
import MainText from "../../components/UI/MainText/MainText";
import HeadingText from "../../components/UI/HeadingText/HeadingText";
import validate from "../../utility/validation";
import { startAddExperiment } from "../../store/actions/index";
import DatePicker from 'react-native-datepicker';
import { format } from 'date-fns';

class SetExperimentScreen extends Component {
    static navigatorStyle = {
        navBarButtonColor: "orange"
    };

    constructor(props){
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
        this.screenState = null;
        // this.state = { chosenDate: new Date() };//
        // this.setDate = this.setDate.bind(this);//
    }

    // setDate(newDate) {
    //     this.setState({chosenDate: newDate})//
    // }
    

    componentWillMount(){
        this.reset();
    }

    componentDidUpdate(){
        if(this.props.experimentAdded){
            // this.props.navigator.switchToTab({tabIndex: 0});
            // this.props.navigator.push({screen: 'firstApp.MyExperimentScreen', title: 'My Experiments'});
            this.props.onStartAddExperiment();
        }
    }

    reset = () => {
        this.setState({
            controls: {
                experimentTarget: {
                    value: "",
                    valid: false,
                    touched: false,
                    validationRules: {
                        notEmpty: true
                    }
                },
                date: { value: new Date() },
                // date: {
                    // value: "",
                    // valid: false,
                    // touched: false,
                    // validationRules: {
                    //     notEmpty: true
                    // }
                // },
                length: {
                    value: "",
                    valid: false,
                    touched: false,
                    validationRules: {
                        notEmpty: true
                    }
                }
            }
        })
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
                this.props.onStartAddExperiment();
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

    lengthChagedHandler = val => {
        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    length: {
                        ...prevState.controls.length,
                        value: val,
                        valid: validate(val, prevState.controls.length.validationRules),
                        touched: true
                    }
                }
            }
        });
    };

    dateChagedHandler = val => {
        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    date: {
                        ...prevState.controls.date,
                        value: val,
                        // valid: validate(val, prevState.controls.date.validationRules),
                        // touched: true
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

    experimentTargetChagedHandler = val => {
        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    experimentTarget: {
                        ...prevState.controls.experimentTarget,
                        value: val,
                        valid: validate(val, prevState.controls.experimentTarget.validationRules),
                        touched: true
                    }
                }
            }
        });
    };

    experimentAddedHandler = () => {
        this.props.onAddExperiment(
            this.state.controls.experimentTarget.value, 
            this.state.controls.date.value,
            this.state.controls.length.value
        );
        this.reset();
        // this.props.navigator.push({tabIndex: 0});
        this.props.navigator.push({screen: 'firstApp.MyExperimentScreen', title: 'My Experiments'});
    };

    render () {
        let submitButton = (
            <Button 
                title="SAVE EXPERIMENT" 
                onPress={this.experimentAddedHandler}
                disabled={
                    !this.state.controls.experimentTarget.valid || 
                    // !this.state.controls.date.valid ||
                    !this.state.controls.length.valid
                }
            />
        );

        if (this.props.isLoading){
            submitButton = <ActivityIndicator />;
        }

        return (
            <ScrollView >
                <View style={styles.container}>

                    <Text style = {styles.labels}>What is the target of your experiment?</Text>

                    <ExperimentInput 
                        placeholder="e.g.: Tomato"
                        experimentData={this.state.controls.experimentTarget}
                        onChangeText={this.experimentTargetChagedHandler}
                        style = {styles.targetinputBox}
                    />

                    <Text style = {styles.labels}>Date of start?</Text>

                    {/* <ExperimentInput 
                        placeholder="e.g.: MM/DD/YYYY"
                        experimentData={this.state.controls.date}
                        onChangeText={this.dateChagedHandler}
                        style = {styles.dateinputBox}
                    />  */}

                    {/* {Platform.OS === 'ios' ? iosDate : androidDate} */}

                    <DatePicker
                        style={{width: 200}}
                        date={this.state.controls.date.value}
                        mode="date"
                        placeholder="select date"
                        format="MM/DD/YYYY"
                        minDate="01/01/2019"
                        // maxDate="3000-06-01"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                        dateIcon: {
                            position: 'absolute',
                            left: 205,
                            top: 4,
                            marginLeft: 0
                        },
                        dateInput: {
                            marginLeft: 8
                        }
                        // ... You can check the source to find the other keys.
                        }}
                        onDateChange={date => this.datePickerChagedHandler(date)}
                        // onDateChange={(date) => {this.setState({date: date})}}
                    />

                    <Text style = {styles.labels}>Length of the experiment?</Text>

                    <View style={styles.containerDays}>
                        <ExperimentInput 
                            placeholder="e.g.: 7"
                            experimentData={this.state.controls.length}
                            onChangeText={this.lengthChagedHandler}
                            style = {styles.lengthinputBox}
                        />
                        <Text style = {styles.labels}>days</Text>
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
        experimentAdded: state.experiments.experimentAdded
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAddExperiment: (experimentTarget, date, length) => dispatch(addExperiment(experimentTarget, date, length)),
        onStartAddExperiment: () => dispatch(startAddExperiment())
    };
};

var styles =  StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "flex-start",
        margin: 10
    },
    containerDays: {
        flexDirection: "row",
        alignItems: "flex-start"
    },
    labels:{
        fontSize: 16,
        marginTop: 15,
        marginLeft: 10
    },
    targetinputBox:{
        height: 40,
        // width: "80%"
    },
    dateinputBox:{
        height: 40,
        width: "50%",
        marginTop: 10
    },
    lengthinputBox:{
        height: 40,
        width: "30%"
    },
    placholder: {
        backgroundColor: "#eee",
        borderWidth: 1,
        borderColor: "black",
        width: "80%",
        height: 150,
    },
    button: {
        width: "100%",
        alignItems: "center",
        margin: 8,
        marginTop: 30
    },
    previewImage: {
        width: "100%",
        height: "100%",
    },
    map: {
        display: "none"
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(SetExperimentScreen);