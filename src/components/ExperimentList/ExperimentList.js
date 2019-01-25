import React from 'react';
import { FlatList, StyleSheet } from 'react-native';

import ExperimentDetailItem from '../ExperimentDetailItem/ExperimentDetailItem';

const ExperimentList = props => {
    return (
        <FlatList 
            style={styles.experimentsContainer}
            data={props.places}
            renderItem={(info) => (
                <ExperimentDetailItem 
                    image={info.item.image}
                    type={info.item.type}
                    name={info.item.name}
                    date={info.item.date} 
                    comments={info.item.comments} 
                    onItemPressed={() => props.onItemSelected(info.item.key)}
                />
            )}
        />
    )
};

const styles = StyleSheet.create({
    placesContainer: {
      display: 'flex',
      flex: 1,
      width: '100%',
      height: '100%'
    }
});

export default ExperimentList;