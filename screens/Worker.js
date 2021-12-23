import React, {useState} from 'react';
import {
    StyleSheet,
    View,
    Text,
    FlatList,
    Pressable,
    Modal,
    TouchableWithoutFeedback,
    Keyboard
} from 'react-native';

import {MaterialIcons} from "@expo/vector-icons";

import Access from "../components/Access";
import Penalty from "../components/Penalty";
import PenaltyForm from "../components/PenaltyForm";
import EntryForm from "../components/EntryForm";

export default function Worker({navigation}) {

    const [accesses, setAccesses] = useState([
        {objectOfWork: 'Площадка 1', timeFrom: '08.05.2020', timeTo: '09.05.2020', key: '1'},
        {objectOfWork: 'Площадка 2', timeFrom: '09.06.2020', timeTo: '09.08.2020', key: '2'},
    ]);

    const [penalties, setPenalties] = useState([
        {objectOfWork: 'Площадка 1', penaltyType: 'Превышение скоростного лимита', key: '1'},
        {objectOfWork: 'Площадка 1', penaltyType: 'Курение в неположенном месте', key: '2'},
    ])

    const [penaltyModalOpen, setPenaltyModalOpen] = useState(false)
    const [entryModalOpen, setEntryModalOpen] = useState(false)

    return (
        <View style={styles.content}>
            <View>
                <Text>Иванов Иван Иванович</Text>
                <Text>Должность: <Text>Грузчик</Text></Text>
                <Text>Дата рождения: <Text>11.11.1987</Text></Text>
                <Text>Статус: <Text>Не на объекте</Text></Text>
            </View>

            <View>
                <Text>Документы</Text>
                <Text>Удостоверение личности</Text>
            </View>

            <View>
                <Text>Доступ к объектам</Text>
                <FlatList data={accesses} renderItem={({item}) => (<Access item={item}/>)}/>
            </View>

            <Modal visible={penaltyModalOpen} animationType='slide'>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.modalContent}>
                        <MaterialIcons
                            name='close'
                            size={24}
                            onPress={() => setPenaltyModalOpen(false)}
                        />
                        <PenaltyForm/>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>

            <View>
                <Text>Нарушения</Text>
                <Text>Баллы за нарушения: <Text>12</Text></Text>
                <FlatList data={penalties} renderItem={({item}) => (<Penalty item={item}/>)}/>
                <Pressable onPress={() => setPenaltyModalOpen(true)}>
                    <Text>+ Добавить нарушение</Text>
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
                        <EntryForm/>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>

            <View>
                <Pressable onPress={() => setEntryModalOpen(true)}>
                    <Text>Одобрить</Text>
                </Pressable>
                <Pressable>
                    <Text>Отклонить</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        padding: 20
    },
    modalContent: {
        flex: 1,
        padding: 20
    },
    modalClose: {
        marginLeft: 370,
        marginBottom: 20
    }
});