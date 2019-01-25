import React from 'react';
import { FlatList, StyleSheet } from 'react-native';

import ExperimentListItem from '../ExperimentListItem/ExperimentListItem';

const MyExperimentsList = props => {
    return (
        <FlatList 
            style={styles.experimentsContainer}
            data={props.experiments}
            renderItem={(info) => (
                <ExperimentListItem 
                    experimentTarget={info.item.experimentTarget}
                    date={info.item.date} 
                    onItemPressed={() => props.onItemSelected(info.item.key)}
                />
            )}
        />
    )
};

const styles = StyleSheet.create({
    placesContainer: {
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default MyExperimentsList;