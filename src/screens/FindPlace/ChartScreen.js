import React, { Component } from 'react';
import firebase from 'react-native-firebase';
import { Animated, View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { getPlaces } from '../../store/actions/index';
import Chart from "../../components/Chart/Chart";
import ChartFilters from "../../components/ChartFilters/ChartFilters";
import { format } from 'date-fns';
import Icon from 'react-native-vector-icons/Ionicons';

const myIcon = (<Icon name="ios-options" size={30} color="#000" />)

class FindPlaceScreen extends Component {

    static navigatorStyle = {
      navBarButtonColor: "orange"
    };
  
    state = {
        placesLoaded: false,
        removeAnim: new Animated.Value(1),
        placesAnim: new Animated.Value(0),
        selFilter: 'All',
        modalVisible: false,
    };
  
    constructor(props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }

    componentDidMount(){
        this.props.onLoadPlaces();
        this.setState(prevState => {
            return {
                ...prevState.placesAndSymptoms,
                placesAndSymptoms: this.props.places
            }
        });
    }

    onNavigatorEvent = event => {
        console.log(event);
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

        if (event.type === "ScreenChangedEvent" || event.type === "bottomTabSelected" || event.type === "NavBarButtonPress") {
          if (event.id === "willAppear" || event.id === "didAppear" || event.id === "willDisappear" || event.id === "didDisappear") {
            this.props.onLoadPlaces();
            this.onHandleFilter(this.props.places);
            this.setState(prevState => {
                return {
                    ...prevState.placesAndSymptoms,
                    placesAndSymptoms: this.props.places
                }
            });
          }
        }

        if (event.type === "NavBarButtonPress") {
            if (event.id === "sideDrawerToggle") {
                this._toggleDrawer();
            }
        }

        
        if (event.type === "DeepLink" && (this.screenState === "willAppear" || this.screenState == "didAppear")) {
            const parts = event.link;
            if (parts == 'firstApp.MyExperimentScreen') {
                this._toggleDrawer();
                this.onGoToExperiments();
            }
        }
        
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

    placesLoadedHandler = () => {
        Animated.timing(this.state.placesAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }).start();
    };

    placesSearchHandler = () => {
        Animated.timing(this.state.removeAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
        }).start(() => {
            this.setState({
                placesLoaded: true
            });
            this.placesLoadedHandler();
        });
    };
    
    itemSelectedHandler = key => {
        let placesAndSymptoms = this.props.places.sort((a, b) => new Date(b.date) - new Date(a.date)).reverse();
        const selPlace = placesAndSymptoms.find( place => {
            return place.key === key;
        });
        this.props.navigator.push({
            screen: "firstApp.PlaceDetailScreen",
            title: format(selPlace.date, 'DD MMM YY - HH:mm'),
            passProps: {
                selectedPlace: selPlace
            }
        });
    }

    onHandleFilter = data => {
        let placesAndSymptoms = [];
        let symptomFilter = [];
        if(this.state.selFilter != "All"){
            data.map( item => {
                if( item.type === "symptom" && item.name === this.state.selFilter){
                    symptomFilter.push(item.date);
                }
            });

            data.map( item => {
                symptomFilter.map( filter => {
                    if( format(item.date, "MMDDYY").toString() === format(filter, "MMDDYY").toString() ){
                        placesAndSymptoms.push(item);
                    }
                });
            });
            placesAndSymptoms.sort((a, b) => new Date(b.date) - new Date(a.date)).reverse();
            return placesAndSymptoms;
        }
        if(this.state.selFilter === "All"){
            placesAndSymptoms = data.sort((a, b) => new Date(b.date) - new Date(a.date)).reverse();
            return placesAndSymptoms; 
        }
    }

    onPress(filter) {
        this.setState(prevState => {
            return {
                ...prevState.filter,
                selFilter: filter,
            }
        });
        this.setModalVisible();
        this.onHandleFilter(this.props.places);
    }
    
    setModalVisible(visible) {
        this.setState({modalVisible: !this.state.modalVisible});
    }
  
    render () {

        let placesAndSymptoms = this.onHandleFilter(this.props.places);

        const filterButton = (
            <View style={styles.filtersContainer}>
                <ChartFilters onPress={this.onPress.bind(this)} filter={this.state.selFilter}/>
            </View>
        );

        return (
            
            <View>
                <View style={styles.filtersContainer}  >
                    <TouchableOpacity  style={styles.filter} onPress={() => this.setModalVisible(true)} modalVisible={this.state.modalVisible}>
                        { myIcon }
                    </TouchableOpacity>
                    <View>
                        <Text>Data filtered by:</Text>
                        <Text style={styles.selectedFilter}>{this.state.selFilter}</Text>
                    </View>
                </View>

                { this.state.modalVisible ? filterButton : null }

                <View>
                    <Chart 
                        selFilter={this.state.selFilter}
                        placesAndSymptoms={placesAndSymptoms}
                        onItemSelected={this.itemSelectedHandler} 
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    buttonContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    iconBox: { 
        marginLeft: 5, 
        marginTop: -10, 
        marginBottom: -15 
    },
    filtersContainer: {
        display: "flex",
        flexDirection: 'row',
        // height: 44,
        width: '100%',
        backgroundColor: "orange",
    },
    filter: {
        height: 40,
        width: 40,
        margin: 5,
        marginTop: 2,
        marginBottom: 2,
        padding: 5,
        borderWidth: 1,
        backgroundColor: "#fff",
        borderRadius: 5,
    },
    selectedFilter: {
        fontSize: 16,
        fontWeight: 'bold'
    }
});

const mapDispatchToProps = dispatch => {
    return {
        onLoadPlaces: () => dispatch(getPlaces()),
    };
};

const mapStateToProps = state => {
    return {
        places: state.places.places,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FindPlaceScreen);