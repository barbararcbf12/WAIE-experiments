import React from 'react';
import { FlatList, Text, StyleSheet } from 'react-native';

import ListItem from '../ListItem/ListItem';

const PlaceList = props => {
    return (
        <FlatList 
            style={styles.placesContainer}
            data={props.places}
            renderItem={(info) => (
                <ListItem 
                    placeName={info.item.name}
                    placeImage={info.item.image} 
                    onItemPressed={() => props.onItemSelected(info.item.key)}
                />
            )}
        />
    )
};

const styles = StyleSheet.create({
    placesContainer: {
      width: '100%',
    }
});

export default PlaceList;