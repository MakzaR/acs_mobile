import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default function Access({item}) {
    return (
        <View>
            <Text>Объект: <Text>{item.objectOfWork}</Text></Text>
            <Text>Дата начала допуска: <Text>{item.timeFrom}</Text></Text>
            <Text>Дата окончания допуска: <Text>{item.timeTo}</Text></Text>
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