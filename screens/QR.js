import React, {useState} from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';

export default function QR({navigation}) {
    return (
        <View>
            <Text>QR</Text>
            <Button onPress={() => navigation.push('Worker')} title='Scanned worker'/>
        </View>
    );
}

const styles = StyleSheet.create({

});