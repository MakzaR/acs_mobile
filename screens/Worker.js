import React, {useEffect, useState} from 'react';
import {
    StyleSheet,
    View,
    Text,
    FlatList,
    Pressable,
    Modal,
    TouchableWithoutFeedback,
    Keyboard, SafeAreaView, ScrollView, ActivityIndicator
} from 'react-native';

import {MaterialIcons} from "@expo/vector-icons";

import {StatusBar} from "expo-status-bar";

import Access from "../components/Access";
import Penalty from "../components/Penalty";
import PenaltyForm from "../components/PenaltyForm";
import EntryForm from "../components/EntryForm";

const API_URL = 'http://45.144.64.103:81';

export default function Worker({route}) {
    const {workerId} = route.params;

    // const [accesses, setAccesses] = useState([
    //     {objectOfWork: 'Площадка 1', timeFrom: '08.05.2020', timeTo: '09.05.2020', key: '1'},
    //     {objectOfWork: 'Площадка 2', timeFrom: '09.06.2020', timeTo: '09.08.2020', key: '2'},
    //     {objectOfWork: 'Площадка 2', timeFrom: '09.06.2020', timeTo: '09.08.2020', key: '3'},
    //     {objectOfWork: 'Площадка 2', timeFrom: '09.06.2020', timeTo: '09.08.2020', key: '4'},
    //     {objectOfWork: 'Площадка 2', timeFrom: '09.06.2020', timeTo: '09.08.2020', key: '5'},
    // ]);
    //
    // const [penalties, setPenalties] = useState([
    //     {objectOfWork: 'Площадка 1', penaltyType: 'Превышение скоростного лимита', key: '1'},
    //     {objectOfWork: 'Площадка 1', penaltyType: 'Курение в неположенном месте', key: '2'},
    // ])

    const [isLoading, setLoading] = useState(true);
    const [workerData, setWorkerData] = useState({});
    const [maxPenaltiesSum, setMaxPenaltiesSum] = useState({});

    const [penaltyModalOpen, setPenaltyModalOpen] = useState(false)
    const [entryModalOpen, setEntryModalOpen] = useState(false)

    const getWorkerData = async (workerId) => {
        const response = await fetch(API_URL + '/api/workers/' + `${workerId}`);
        const workerData = await response.json();
        setWorkerData(workerData);
        setLoading(false);
    }

    const getMaxPenaltiesSum = async () => {
        const response = await fetch(API_URL + '/api/penalties/max_penalties_sum');
        const sum = await response.json();
        setMaxPenaltiesSum(sum);
    }

    useEffect(() => {
        getWorkerData(workerId);
        getMaxPenaltiesSum();
    }, [workerData]);

    const handleExit = async (workerId) => {
        const data = {worker_id: workerId}

        const postConfig = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };

        const response = await fetch(API_URL + '/api/entry_control/exit', postConfig);

        if (!response.ok) {
            const details = await response.json();
            alert(`${details.error}`);
            return response;
        }
    }

    const convertTimestampToDate = (timestamp) => {
        const milliseconds = timestamp * 1000;
        const dateObject = new Date(milliseconds);
        return (`${dateObject.toLocaleDateString()} ${dateObject.toLocaleTimeString()}`);
    }

    const convertToLocaleDate = (dateString) => {
        const dateObject = new Date(dateString);
        return (`${dateObject.toLocaleDateString()}`);
    }

    return (
        <SafeAreaView style={styles.container}>
            {isLoading ? <ActivityIndicator style={styles.activityIndicator} size="large" color="#8497FF"/> : (
                <>
                    <ScrollView style={styles.scrollView}>
                        <View>
                            <Text style={styles.workerName}>
                                {workerData.last_name} {workerData.first_name} {workerData.patronymic}
                            </Text>
                            <View style={styles.infoBlock}>
                                <Text style={styles.text}>Должность:
                                    <Text style={styles.infoText}> {workerData.position}</Text>
                                </Text>
                                <Text style={styles.text}>Дата рождения:
                                    <Text style={styles.infoText}> {convertToLocaleDate(workerData.date_of_birth)}</Text>
                                </Text>
                                <Text style={styles.text}>Статус:
                                    {workerData.blocked ? (
                                        <Text style={styles.infoText}> Не может быть допущен</Text>) : (
                                        <>
                                            {workerData.has_entered ? (
                                                <Text style={styles.infoText}> На объекте</Text>) : (
                                                <Text style={styles.infoText}> Не на объекте</Text>)}
                                        </>
                                    )}
                                </Text>
                                {workerData.has_entered &&
                                <>
                                    <Text style={styles.text}>Объект:
                                        <Text style={styles.infoText}> {workerData.on_object}</Text>
                                    </Text>
                                    <Text style={styles.text}>Время входа:
                                        {/*<Text style={styles.infoText}> {workerData.on_object_at}</Text>*/}
                                        <Text style={styles.infoText}> {convertTimestampToDate(workerData.on_object_at)}</Text>
                                    </Text>
                                </>
                                }
                            </View>
                        </View>

                        <View>
                            <Text style={styles.heading}>Доступ к объектам</Text>
                            {workerData.accesses.length < 1 ?
                                (<Text style={styles.penaltyInfo}>Нет активных доступов</Text>) :
                                (<FlatList horizontal
                                           data={workerData.accesses}
                                           renderItem={({item}) => (<Access item={item}/>)}
                                />)
                            }
                        </View>

                        <Modal visible={penaltyModalOpen} animationType='slide'>
                            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                                <View style={styles.modalContent}>
                                    <MaterialIcons
                                        name='close'
                                        size={24}
                                        onPress={() => setPenaltyModalOpen(false)}
                                    />
                                    <PenaltyForm workerId={workerData.id} closeModal={() => setPenaltyModalOpen(false)}/>
                                </View>
                            </TouchableWithoutFeedback>
                        </Modal>

                        <View>
                            <Text style={styles.heading}>Нарушения</Text>
                            {workerData.penalties.length < 1 ?
                                (<Text style={styles.penaltyInfo}>Нет нарушений</Text>) :
                                (<>
                                    <Text style={styles.penaltyInfo}>Баллы за нарушения:
                                        <Text
                                            style={styles.penaltyNumber}> {workerData.penalties_sum} из {maxPenaltiesSum.max_penalties_sum}
                                        </Text>
                                    </Text>
                                    <Text style={styles.penaltyInfo}>Общее кол-во нарушений:
                                        <Text style={styles.penaltyNumber}> {workerData.penalties.length}</Text>
                                    </Text>
                                    <FlatList horizontal data={workerData.penalties}
                                              renderItem={({item}) => (<Penalty item={item}/>)}/>
                                </>)
                            }
                            <Pressable onPress={() => setPenaltyModalOpen(true)}>
                                <Text style={styles.buttonPenaltyText}>+ Добавить нарушение</Text>
                            </Pressable>
                        </View>

                        <Modal visible={entryModalOpen} animationType='slide'>
                            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                                <View style={styles.modalContent}>
                                    <MaterialIcons
                                        name='close'
                                        size={24}
                                        onPress={() => setEntryModalOpen(false)}
                                    />
                                    <EntryForm workerId={workerData.id} closeModal={() => setEntryModalOpen(false)} />
                                </View>
                            </TouchableWithoutFeedback>
                        </Modal>

                    </ScrollView>
                    <View style={styles.buttonBlock}>
                        <Pressable
                            style={styles.buttonAllow}
                            onPress={() => setEntryModalOpen(true)}
                        >
                            <Text style={styles.buttonText}>Допустить</Text>
                        </Pressable>
                        <Pressable
                            style={styles.buttonDeny}
                            onPress={() => handleExit(workerData.id)}
                        >
                            <Text style={styles.buttonText}>Закрыть допуск</Text>
                        </Pressable>
                    </View>
                </>)}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
    },
    scrollView: {
        backgroundColor: '#F5F5F5',
        // padding: 20,
        paddingTop: 0
    },
    workerName: {
        fontSize: 24,
        fontWeight: "bold",
        paddingLeft: 20,
        marginTop: 16
    },
    heading: {
        fontSize: 20,
        fontWeight: "bold",
        paddingLeft: 20,
        marginTop: 20
    },
    text: {
        fontSize: 16,
        // fontWeight: "bold",
        marginTop: 5,
        marginBottom: 5
    },
    infoText: {
        fontSize: 16,
        color: "#454545",
        // fontWeight: "bold",
    },
    infoBlock: {
        // backgroundColor: "white",
        paddingBottom: 10,
        paddingLeft: 20,
        marginTop: 10,
    },
    penaltyInfo: {
        fontSize: 16,
        paddingLeft: 20,
        marginVertical: 5
    },
    penaltyNumber: {
        color: "#454545",
        // fontWeight: "bold"
    },
    buttonBlock: {
        backgroundColor: "white",
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: "space-around",
        paddingHorizontal: 20,
        paddingBottom: 20
    },
    buttonPenaltyText: {
        paddingLeft: 20,
        paddingVertical: 20,
        fontSize: 16,
        fontWeight: "bold",
        color: "#8497FF",
    },
    buttonAllow: {
        height: 48,
        backgroundColor: "#60B963",
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 40,
        marginTop: 20,
    },
    buttonDeny: {
        height: 48,
        backgroundColor: "#FC7676",
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 35,
        marginTop: 20,
    },
    buttonText: {
        fontSize: 16,
        color: "white",
    },
    modalContent: {
        flex: 1,
        padding: 20
    },
    modalClose: {
        marginLeft: 370,
        marginBottom: 20
    },
    activityIndicator: {
        flex: 1,
        justifyContent: 'center',
    }
});