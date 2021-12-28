import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default function Access({item}) {
    return (
        <View style={styles.infoBlock}>
            <Text style={styles.infoText}>{item.objectOfWork}</Text>
            <Text style={styles.infoText}>{item.timeFrom} - {item.timeTo}</Text>
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