import React, { Component } from 'react';
import { View, Dimensions, StyleSheet, Alert } from 'react-native';
import { VictoryZoomContainer, VictoryChart, VictoryAxis, VictoryScatter, VictoryTooltip } from 'victory-native';
import { getPlaces, getSymptoms } from '../../store/actions/index';
import CatPoint  from "./CatPoint";
import { connect } from 'react-redux';
import { format } from 'date-fns';

class Chart extends Component {

    constructor() {
        super();
        this.state = {
          dataComponentName: "",
          yDomain: null,
          yZoom: null 
        };
    }

    button(local) {
        Alert.alert(
          'Alert Title',
          'Alert message from ' + local,
          [
            {text: 'NO', onPress: () => console.warn('NO Pressed'), style: 'cancel'},
            {text: 'YES', onPress: () => console.warn('YES Pressed')},
          ]
        );
      }

    timeToNumber(num){
        let result = (num / 60) * 100;
        return result;
    }
  
    render() {

        const currentDate = new Date();
        const sevenDaysBeforeToday = new Date().setDate(new Date().getDate() - 7);
        const oneYearFromToday = new Date().setDate(new Date().getDate() + 365);
        const oneYearBeforeToday = new Date().setDate(new Date().getDate() - 365);

        if(this.props.selFilter != 'All'){
            this.state.yDomain = null;
            this.state.yZoom = null;
        }else{
            this.state.yDomain = [ new Date(oneYearBeforeToday), new Date(oneYearFromToday) ];
            this.state.yZoom = [ new Date(sevenDaysBeforeToday), new Date(currentDate) ];
        }

        let placesList = [].concat(this.props.placesAndSymptoms);

        const placesData = placesList.map( (place, index) => {
            let day = place.date.substring(0, 10)
            let hour = parseInt(format(place.date, 'HH'));
            let minutes = parseInt(this.timeToNumber(format(place.date, 'mm')));
            let time = Number(hour + "." + minutes); 
            let currentTimeDate = new Date(place.date);

            return (
                <VictoryScatter
                    standalone={false}
                    name={ place.date + index }
                    key={ place.date + index } 
                    data={[{ x: time, y: new Date(day) }]} 
                    dataComponent={
                        <CatPoint 
                            type={place.type} 
                            name={place.name} 
                            image={place.image}
                        />
                    }
                    events={[{
                        target: 'data',
                        eventHandlers: {
                            onPressIn: () => this.props.onItemSelected(place.key)
                        }
                    }]}
                />
            );
        });

    return (
          <View style={styles.container} > 
            <VictoryChart 
                padding={{ top: 30, left: 55, right: 5, bottom: 25 }}
                responsive={true}
                width={Dimensions.get('window').width}
                height={Dimensions.get('window').height}
                domainPadding={{ x: 10, y: 10 }}
                allowZoom={true} 
                domain={ { x: [ 0,24 ] , y: [ new Date(oneYearBeforeToday), new Date(oneYearFromToday) ] } }
                containerComponent={
                    <VictoryZoomContainer 
                        pointerEvents="none"
                        minimumZoom={{ x: 1, y: 86400000 }} 
                        zoomDomain={ {  x: [ 7,19 ] , y: [ new Date(sevenDaysBeforeToday), new Date(currentDate) ] } }
                    /> 
                }    
            >
                <VictoryAxis dependentAxis 
                    crossAxis={false}
                    orientation="left"
                    scale={{ y: "time" }}
                    style={{
                      tickLabels: { fontSize: 12 },
                      grid: { stroke: "rgba(0,0,0,.25)" },
                      ticks: { size: 5, stroke: "rgba(0,0,0,.25)", paddingLeft: -3 },
                      axisLabel: {padding: 0, marginRight: 0}
                    }}
                />
                <VictoryAxis 
                    offsetX={100}
                    crossAxis={false}
                    offsetY={30}
                    orientation="top"
                    scale={{ x: "linear" }} 
                    style={{ 
                        tickLabels: { angle: 0, fontSize: 12 },
                        grid: { stroke: "rgba(0,0,0,.25)" }, 
                    }}
                />
                        
                {placesData}

            </VictoryChart>
        </View>
      );
    }
}

const styles = StyleSheet.create({
    container: {
    //   flex: 1,
        display: "flex",
        flexWrap: "wrap",
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
        paddingLeft: 0,
        paddingRight: 0,
        margin: 0
    },
    filterContainer: {
        height: 44,
        width: 500,
        backgroundColor: "#ccc",
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
    pseudoScrollView: {
        backgroundColor: 'black', 
        opacity: 0,
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0
    }

});
  
const mapDispatchToProps = dispatch => {
    return {
        onLoadPlaces: () => dispatch(getPlaces()),
        onLoadSymptoms: () => dispatch(getSymptoms())
    };
};

const mapStateToProps = state => {
    return {
        places: state.places.places,
        symptoms: state.symptoms.symptoms
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Chart);