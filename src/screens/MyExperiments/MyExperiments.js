import React, { Component } from 'react';
import { Animated, View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import MyExperimentsList from '../../components/MyExperimentsList/MyExperimentsList';
import { getPlaces, getSymptoms, getExperiments } from '../../store/actions/index';
import { format } from 'date-fns';

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

    componentDidMount(){
        // console.log(this.props.experiments);
    }

    onNavigatorEvent = event => {
        if (event.type === "ScreenChangedEvent") {
          if (event.id === "willAppear" || event.id === "didAppear") {
            this.props.onLoadExperiments();
            // this.setState({
            //   placesLoaded: false
            // });
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
        // this.setState({
        //     placesLoaded: true
        // });
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
        const selExperiment = this.props.experiments.find( experiment => {
            return experiment.key === key;
        });
        this.props.navigator.push({
            screen: "firstApp.ExperimentDetailScreen",
            title: selExperiment.experimentTarget,
            passProps: {
                selectedExperiment: selExperiment
            }
        });
    }
    
    render () {

        return (
            <View style={styles.container}>
                <MyExperimentsList 
                    experiments={this.props.experiments.sort((a, b) => new Date(b.date) - new Date(a.date))} 
                    onItemSelected={this.itemSelectedHandler} 
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        width: '100%',
        alignItems: 'center',
    }
});

const mapDispatchToProps = dispatch => {
    return {
        onLoadExperiments: () => dispatch(getExperiments())
    };
};

const mapStateToProps = state => {
    return {
        experiments: state.experiments.experiments
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyExperimentsScreen);