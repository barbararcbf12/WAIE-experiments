import React, { Component } from 'react';
import { Animated, View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { getPlaces, getExperiments } from '../../store/actions/index';
import { format, addDays } from 'date-fns';
import isWithinRange from 'date-fns/is_within_range';
import ExperimentList from '../../components/ExperimentList/ExperimentList';

class MyExperimentsScreen extends Component {
    static navigatorStyle = {
      navBarButtonColor: "orange"
    };
  
    state = {
      experimentsLoaded: false
    };
  
    constructor(props) {
      super(props);
      this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
    }

    onNavigatorEvent = event => {
        if (event.type === "ScreenChangedEvent") {
          if (event.id === "willAppear") {
            this.props.onLoadExperiments();
          }
        }
        if (event.type === "NavBarButtonPress") {
          if (event.id === "sideDrawerToggle") {
            this.props.navigator.toggleDrawer({
              side: "left"
            });
          }
        }
    };

    experimentsSearchHandler = () => {
        Animated.timing(this.state.removeAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
        }).start(() => {
            this.setState({
                experimentsLoaded: true
            });
            this.experimentsLoadedHandler();
        });
    };
    
    itemSelectedHandler = key => {
        let placesAndSymptoms = this.props.places.concat(this.props.symptoms).sort((a, b) => new Date(b.date) - new Date(a.date)).reverse();
        const selPlace = placesAndSymptoms.find( place => {
            return place.key === key;
        });
        this.props.navigator.push({
            screen: "firstApp.PlaceDetailScreen",
            title: format(selPlace.date, 'DD/MMM/YY - HH:mm'),
            passProps: {
                selectedPlace: selPlace
            }
        });
    }
    
    render () {

        const startDate = this.props.selectedExperiment.date;
        const endDate = addDays( startDate, this.props.selectedExperiment.length ) ;
        let experimentData = [];

        const placesAndSymptoms = this.props.places.sort((a, b) => new Date(b.date) - new Date(a.date)).reverse();
        placesAndSymptoms.map( item => {
            if ( isWithinRange(  new Date(item.date) , new Date(startDate), new Date(endDate) ) ){
                experimentData.push(item);
            }

        });

        return (
            <View style={styles.container}>
                <ExperimentList 
                    style={styles.container}
                    places={experimentData} 
                    onItemSelected={this.itemSelectedHandler} 
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      display: 'flex',
      flex: 1,
      width: '100%',
      height: '100%'
    },
    buttonContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    searchButton: {
        borderColor: "orange",
        borderWidth: 3,
        borderRadius: 50,
        padding: 20,
    },
    searchButtonText: {
        color: "orange",
        fontWeight: "bold",
        fontSize: 26,
    }
});

const mapDispatchToProps = dispatch => {
    return {
        onLoadExperiments: () => dispatch(getExperiments()),
        onLoadPlaces: () => dispatch(getPlaces()),
    };
};

const mapStateToProps = state => {
    return {
        experiments: state.experiments.experiments,
        places: state.places.places,
        symptoms: state.symptoms.symptoms
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyExperimentsScreen);