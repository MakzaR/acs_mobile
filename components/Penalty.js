import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default function Penalty({item}) {
    return (
        <View>
            <Text>Нарушение: <Text>{item.penaltyType}</Text></Text>
            <Text>Место нарушения: <Text>{item.objectOfWork}</Text></Text>
        </View>
    );
}

const styles = StyleSheet.create({
    // text: {
    //     fontSize: 16,
    //     marginTop: 16,
    //     padding: 10,
    //     borderColor: '#bbb',
    //     borderWidth: 1,
    //     borderRadius: 5,
    // },
});