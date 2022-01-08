import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {BarCodeScanner} from 'expo-barcode-scanner';
import {useIsFocused} from '@react-navigation/native';

export default function QR({navigation}) {
    const isFocused = useIsFocused();

    const [hasPermission, setHasPermission] = useState(null);

    useEffect(() => {
        (async () => {
            const {status} = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const handleBarCodeScanned = ({data}) => {
        // alert(`ID рабочего ${data}`);
        navigation.navigate("Worker", {workerId: data});
    };

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View style={styles.container}>
            {isFocused &&
            <BarCodeScanner
                onBarCodeScanned={handleBarCodeScanned}
                style={[StyleSheet.absoluteFillObject, styles.container]}
                barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
            />}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'black'
    }
});