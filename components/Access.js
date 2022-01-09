import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default function Access({item}) {
    const convertTimestampToDate = (timestamp) => {
        const milliseconds = timestamp * 1000;
        const dateObject = new Date(milliseconds);
        return (`${dateObject.toLocaleDateString()} ${dateObject.toLocaleTimeString()}`);
    }

    return (
        <View style={styles.infoBlock}>
            <Text style={styles.infoText}>{item.object_of_work}</Text>
            <Text style={styles.infoText}>{convertTimestampToDate(item.time_from)} - {convertTimestampToDate(item.time_to)}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    infoText: {
        fontSize: 16,
        color: "#454545",
        fontWeight: "normal",
        marginTop: 5,
        marginBottom: 5
    },
    infoBlock: {
        borderWidth: 1,
        borderColor: "#E9E9E9",
        backgroundColor: "white",
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginTop: 10,
        marginHorizontal: 5
    },
});