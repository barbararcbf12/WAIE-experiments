import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';

import AuthScreen from './src/screens/Auth/Auth';
import SharePlaceScreen from './src/screens/SharePlace/SharePlace';
import ChartScreen from './src/screens/FindPlace/ChartScreen';
import PlaceDetailScreen from './src/components/PlaceDetail/PlaceDetail';
import SideDrawerScreen from './src/screens/SideDrawer/SideDrawer';
import LogSymptomScreen from './src/screens/LogSymptom/LogSymptom';
import SetExperimentScreen from './src/screens/SetExperiment/SetExperiment';
import MyExperimentScreen from './src/screens/MyExperiments/MyExperiments';
import ExperimentDetailScreen from './src/components/ExperimentsDetailScreen/ExperimentsDetailScreen'

import configureStore from './src/store/configureStore';

const store = configureStore();

// Register screens
Navigation.registerComponent(
  'firstApp.AuthScreen', 
  () => AuthScreen, 
  store, 
  Provider
);

Navigation.registerComponent(
  'firstApp.SharePlaceScreen', 
  () => SharePlaceScreen, 
  store, 
  Provider
);

Navigation.registerComponent(
  'firstApp.FindPlaceScreen', 
  () => ChartScreen, 
  store, 
  Provider
);

Navigation.registerComponent(
  'firstApp.PlaceDetailScreen', 
  () => PlaceDetailScreen, 
  store, 
  Provider
);

Navigation.registerComponent(
  'firstApp.SideDrawerScreen', 
  () => SideDrawerScreen,
  store,
  Provider
);

Navigation.registerComponent(
  'firstApp.LogSymptomScreen', 
  () => LogSymptomScreen,
  store,
  Provider
);

Navigation.registerComponent(
  'firstApp.SetExperimentScreen', 
  () => SetExperimentScreen,
  store,
  Provider
);

Navigation.registerComponent(
  'firstApp.MyExperimentScreen', 
  () => MyExperimentScreen,
  store,
  Provider
);

Navigation.registerComponent(
  'firstApp.ExperimentDetailScreen', 
  () => ExperimentDetailScreen,
  store,
  Provider
);

// Start a app
Navigation.startSingleScreenApp({
  screen: {
    screen: "firstApp.AuthScreen",
    title: "What Am I Eating - Experiments"
  }
});


