import React, { Component } from 'react';
import { View, Text, Dimensions, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import { connect } from "react-redux";
import { authLogout } from "../../store/actions/index";
const Navigation = require('react-native-navigation');

class SideDrawer extends Component {

    constructor(props){
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
        // rootNavigator = this.props.navigator;
    }

    onNavigatorEvent = event => {
        if (event.type === "NavBarButtonPress") {
            if (event.id === "sideDrawerToggle") {
                this._toggleDrawer();
            }
        }
    }

    onGoToExperiments() { 
        // this._toggleDrawer();
        // const visibleScreenInstanceId = Navigation.getCurrentlyVisibleScreenId();
        // visibleScreenInstanceId.then((result)=>{
            this.props.navigator.handleDeepLink({
                link: "firstApp.MyExperimentScreen",
                // payload: result.screenId
            });
        // })
        // this.props.navigator.dismissModal();
    };

    _toggleDrawer() {
        this.props.navigator.toggleDrawer({
            side: 'left',
            to: 'closed'
        });
    }


    render(){
        return (
            <View style={[ styles.container, { width: Dimensions.get("window").width * 0.8 } ]}>
                <TouchableOpacity onPress={this.props.onLogout}>
                    <View style={styles.drawerItam}>
                        <Icon 
                            name={Platform.OS === "android" ? "md-log-out" : "ios-log-out"} 
                            size={30} 
                            color="#bbb"
                            style={styles.drawerIconItem}
                        />
                        <Text>Sign Out</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={ () => this.onGoToExperiments() }>
                    <View style={styles.drawerItam}>
                        <Icon 
                            name={Platform.OS === "android" ? "md-flask" : "ios-flask"} 
                            size={30} 
                            color="#bbb"
                            style={styles.drawerIconItem}
                        />
                        <Text>My Experiments</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 50,
        backgroundColor: 'white',
        flex: 1,
    },
    drawerItam: {
        flexDirection: "row",
        alignItems: "center",
        padding: 15,
        backgroundColor: "#eee",
        marginBottom: 2
    },
    drawerIconItem: {
        marginRight: 10,
    }
});

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(authLogout())
    };
};

export default connect(null, mapDispatchToProps)(SideDrawer);