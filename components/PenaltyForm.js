import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, Pressable, FlatList} from 'react-native';
import {Picker} from '@react-native-picker/picker';

const API_URL = 'http://45.144.64.103:81';

export default function PenaltyForm({workerId, closeModal}) {
    const [objectsOfWork, setObjectsOfWork] = useState([]);
    const [penalties, setPenalties] = useState([]);

    const [selectedObject, setSelectedObject] = useState();
    const [selectedPenalty, setSelectedPenalty] = useState();

    async function handlePenalty(workerId, objectOfWork, penaltyTypeName) {
        const data = {worker_id: workerId, object_of_work_name: objectOfWork, penalty_type_name: penaltyTypeName}

        const postConfig = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };

        const response = await fetch(API_URL + '/api/penalties/', postConfig);

        if (!response.ok) {
            const details = await response.json();
            alert(`${details.error}`);
            return response;
        }

        closeModal();
    }

    const getPenalties = async () => {
        const response = await fetch(API_URL + '/api/penalties/types');
        const penalties = await response.json();
        setPenalties(penalties);
    }

    const getObjectsOfWork = async () => {
        const response = await fetch(API_URL + '/api/objects_of_work/');
        const objectsOfWork = await response.json();
        setObjectsOfWork(objectsOfWork);
    }

    useEffect(() => {
        getPenalties();
        getObjectsOfWork();
    }, []);

    const renderObjectList = () => {
        return Array.from(objectsOfWork).map((object) => {
            return <Picker.Item label={object.name} value={object.name} key={object.name}/>
        })
    }

    const renderPenaltyList = () => {
        return Array.from(penalties).map((penalty) => {
            return <Picker.Item label={penalty.name} value={penalty.name}
                                key={penalty.value}/>
        })
    }

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
            <Pressable style={styles.button} onPress={() => handlePenalty(workerId, selectedObject, selectedPenalty)}>
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