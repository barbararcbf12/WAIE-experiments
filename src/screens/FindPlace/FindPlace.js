import React, { Component } from 'react';
import { Animated, View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import PlaceList from '../../components/PlaceList/PlaceList';
import { getPlaces } from '../../store/actions/index';
import Chart from "../../components/Chart/Chart";

class ChartScreen extends Component {
    static navigatorStyle = {
      navBarButtonColor: "orange"
    };
  
    state = {
      placesLoaded: false,
      removeAnim: new Animated.Value(1),
      placesAnim: new Animated.Value(0)
    };
  
    constructor(props) {
      super(props);
      this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
    }

    componentDidMount(){
        console.log(this.props.places);
    }

    onNavigatorEvent = event => {
        if (event.type === "ScreenChangedEvent") {
          if (event.id === "willAppear") {
            this.props.onLoadPlaces();
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

    placesLoadedHandler = () => {
        Animated.timing(this.state.placesAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }).start();
    };

    placesSearchHandler = () => {
        // this.setState({
        //     placesLoaded: true
        // });
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
        const selPlace = this.props.places.find(place => {
            return place.key === key;
        });
        this.props.navigator.push({
            screen: "firstApp.PlaceDetailScreen",
            title: selPlace.name,
            passProps: {
                selectedPlace: selPlace
            }
        });
    }

    // getDates = () => {
    //     let dataB = [];
    //     this.props.places.map( point => {
    //         dataB.push({ 
    //             a: point.date, 
    //             b: point.date
    //     })
    //     return dataB;
    //     })
    // }
    
    render () {
        // let content = (
        //     <Animated.View
        //         style={{
        //             opacity: this.state.removeAnim,
        //             transform: [{
        //                 scale: this.state.removeAnim.interpolate({
        //                     inputRange: [0,1],
        //                     outputRange: [12, 1]
        //                 })
        //             }]
        //     }}>
        //         <TouchableOpacity onPress={this.placesSearchHandler}>
        //             <View style={styles.searchButton}>
        //                 <Text style={styles.searchButtonText}>Find Places</Text>
        //             </View>
        //         </TouchableOpacity>
        //     </Animated.View>
        // );
        
        // if (this.state.placesLoaded){
            // content = (
            //     <Animated.View
            //         style={{
            //             opacity: this.state.placesAnim,
            //         }}
            //     >
            //         <PlaceList 
            //             places={this.props.places} 
            //             onItemSelected={this.itemSelectedHandler} 
            //         />
            //     </Animated.View>
            // );
        // }
        return (
            // <View> // style= {this.state.placesLoaded ? null : styles.buttonContainer}>
                // {/* {content} */}
            <View style={styles.container}>
                <PlaceList 
                    places={this.props.places} 
                    onItemSelected={this.itemSelectedHandler} 
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 80,
        justifyContent: "center",
        alignItems: "center",
    },
});

const mapDispatchToProps = dispatch => {
    return {
        onLoadPlaces: () => dispatch(getPlaces())
    };
};

const mapStateToProps = state => {
    return {
        places: state.places.places
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChartScreen);
