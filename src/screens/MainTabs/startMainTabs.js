import { Navigation } from 'react-native-navigation';
import { Platform } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';

const startMainTabs = () => {
    Promise.all([
        Icon.getImageSource(Platform.OS === "android" ? "md-home" : "ios-home", 40), //"md-map" : "ios-map", 30),
        Icon.getImageSource(Platform.OS === "android" ? "md-camera" : "ios-camera", 50), //"md-share-alt" : "ios-share", 30),
        Icon.getImageSource(Platform.OS === "android" ? "md-menu" : "ios-menu", 40),
        Icon.getImageSource(Platform.OS === "android" ? "md-text" : "ios-text", 40),
        Icon.getImageSource(Platform.OS === "android" ? "md-flask" : "ios-flask", 40)
    ]).then(sources => {
        Navigation.startTabBasedApp({
            tabs: [
                {
                    screen: "firstApp.FindPlaceScreen",
                    label: "My Activity",
                    title: "My Activity",
                    icon: sources[0],
                    navigatorButtons: {
                        leftButtons: [
                            {
                                icon: sources[2],
                                title: 'Menu',
                                id: "sideDrawerToggle"
                            }
                        ],
                        // rightButtons: [
                        //     {
                        //         icon: sources[2],
                        //         title: 'Menu',
                        //         id: "sideDrawerToggle"
                        //     }
                        // ]
                    }
                },
                {
                    screen: "firstApp.SetExperimentScreen",
                    label: "Set Experiment",
                    title: "Set Experiment",
                    icon: sources[4],
                    navigatorButtons: {
                        leftButtons: [
                            {
                                icon: sources[2],
                                title: 'Menu',
                                id: "sideDrawerToggle"
                            }
                        ]
                    }
                },
                {
                    screen: "firstApp.LogSymptomScreen",
                    label: "Log Symptom",
                    title: "Log Symptom",
                    icon: sources[3],
                    navigatorButtons: {
                        leftButtons: [
                            {
                                icon: sources[2],
                                title: 'Menu',
                                id: "sideDrawerToggle"
                            }
                        ]
                    }
                },
                {
                    screen: "firstApp.SharePlaceScreen",
                    label: "Log Meal",
                    title: "Log Meal",
                    icon: sources[1],
                    navigatorButtons: {
                        leftButtons: [
                            {
                                icon: sources[2],
                                title: 'Menu',
                                id: "sideDrawerToggle"
                            }
                        ]
                    }
                },
            ],
            // sideMenu: {
            //     left: {
            //       component: {
            //         name: 'firstApp.SideDrawerScreen',
            //         // passProps: {
            //         //   text: 'This is a left side menu screen'
            //         // }
            //       },
            //     }
            // },
            drawer: {
                left: {
                    screen: "firstApp.SideDrawerScreen",
                },
                disableOpenGesture: 'true'
            },
            tabsStyle: {
                tabBarSelectedButtonColor: "orange"
            },
            appStyle: {
                tabBarSelectedButtonColor: "orange"
            },
        });

    });
    
};

export default startMainTabs;