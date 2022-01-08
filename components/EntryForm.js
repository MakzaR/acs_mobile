import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, Pressable} from 'react-native';
import {Picker} from '@react-native-picker/picker';

const API_URL = 'http://45.144.64.103:81';

export default function EntryForm() {
    const [objectsOfWork, setObjectsOfWork] = useState([]);

    const [selectedObject, setSelectedObject] = useState();

    const getObjectsOfWork = async () => {
        const response = await fetch(API_URL + '/api/objects_of_work/');
        const objectsOfWork = await response.json();
        setObjectsOfWork(objectsOfWork);
    }

    useEffect(() => {
        getObjectsOfWork();
    }, []);

    const renderObjectList = () => {
        return Array.from(objectsOfWork).map((object) => {
            return <Picker.Item label={object.name} value={object.name} key={object.name}/>
        })
    }

    return (
        <View>
            <Text style={styles.formText}>
                Допуск на объект
            </Text>
            <Text style={styles.inputLabel}>Объект</Text>
            <View style={styles.input}>
                <Picker
                    selectedValue={selectedObject}
                    onValueChange={(itemValue) =>
                        setSelectedObject(itemValue)
                    }>
                    {renderObjectList()}
                </Picker>
            </View>
            <Pressable style={styles.button}>
                <Text style={styles.buttonText}>Одобрить</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    formText: {
        fontSize: 24,
        fontWeight: "bold",
        alignSelf: "center",
        marginBottom: 14,
    },
    inputLabel: {
        fontSize: 18,
        marginBottom: 10,
        marginTop: 10,
    },
    input: {
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#AFAFAF',
        paddingLeft: 20,
        marginBottom: 16,
    },
    button: {
        height: 48,
        backgroundColor: "#637CFF",
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 50,
        marginTop: 20,
    },
    buttonText: {
        fontSize: 16,
        color: "white",
    }
});