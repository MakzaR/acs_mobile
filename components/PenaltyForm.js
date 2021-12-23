import React, {useState} from 'react';
import {View, StyleSheet, Text, Pressable, FlatList} from 'react-native';
import {Picker} from '@react-native-picker/picker';

export default function PenaltyForm() {
    const objects = [
        {objectName: 'Площадка 1', key: '1'},
        {objectName: 'Площадка 2', key: '2'},
    ];

    const penalties = [
        {penaltyType: 'Превышение скоростного лимита', key: '1'},
        {penaltyType: 'Курение в неположенном месте', key: '2'},
    ];

    const renderObjectList = () => {
        return objects.map((object) => {
            return <Picker.Item label={object.objectName} value={object.key} key={object.key}/>
        })
    }

    const renderPenaltyList = () => {
        return penalties.map((penalty) => {
            return <Picker.Item label={penalty.penaltyType} value={penalty.key}
                                key={penalty.key}/>
        })
    }

    const [selectedObject, setSelectedObject] = useState();
    const [selectedPenalty, setSelectedPenalty] = useState();

    return (
        <View>
            <Text style={styles.formText}>
                Добавление нарушения
            </Text>
            <Text style={styles.inputLabel}>Место нарушения</Text>
            <View style={styles.input}>
                <Picker
                    selectedValue={selectedObject}
                    onValueChange={(itemValue) =>
                        setSelectedObject(itemValue)
                    }>
                    {renderObjectList()}
                </Picker>
            </View>
            <Text style={styles.inputLabel}>Нарушение</Text>
            <View style={styles.input}>
                <Picker
                    style={{borderWidth: 1}}
                    selectedValue={selectedPenalty}
                    onValueChange={(itemValue) =>
                        setSelectedPenalty(itemValue)
                    }>
                    {renderPenaltyList()}
                </Picker>
            </View>
            <Pressable style={styles.button}>
                <Text style={styles.buttonText}>+ Добавить</Text>
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