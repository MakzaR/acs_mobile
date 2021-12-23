import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default function Access({item}) {
    return (
        <View style={styles.infoBlock}>
            <Text style={styles.text}>Объект: <Text style={styles.infoText}>{item.objectOfWork}</Text></Text>
            <Text style={styles.text}>Дата начала допуска: <Text style={styles.infoText}>{item.timeFrom}</Text></Text>
            <Text style={styles.text}>Дата окончания допуска: <Text style={styles.infoText}>{item.timeTo}</Text></Text>
        </View>
    );
}

const styles = StyleSheet.create({
    text: {
        fontSize: 16,
        fontWeight: "bold",
        marginTop: 5,
        marginBottom: 5
    },
    infoText: {
        fontSize: 16,
        color: "#454545",
        fontWeight: "normal",
    },
    infoBlock: {
        backgroundColor: "white",
        paddingVertical: 10,
        paddingLeft: 20,
        marginTop: 10,
    },
});