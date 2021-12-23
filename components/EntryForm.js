import React, {useState} from 'react';
import {View, StyleSheet, Text, Pressable} from 'react-native';
import {Picker} from '@react-native-picker/picker';

export default function EntryForm() {
    const objects = [
        {objectName: 'Площадка 1', key: '1'},
        {objectName: 'Площадка 2', key: '2'},
    ];

    const renderObjectList = () => {
        return objects.map((object) => {
            return <Picker.Item label={object.objectName} value={object.key} key={object.key}/>
        })
    }

    const [selectedObject, setSelectedObject] = useState();

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