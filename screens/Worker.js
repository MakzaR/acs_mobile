import React, {useState} from 'react';
import {StyleSheet, View, Text, Button, FlatList, Pressable} from 'react-native';

import Access from "../components/Access";
import Penalty from "../components/Penalty";

export default function Worker({navigation}) {

    const [accesses, setAccesses] = useState([
        {objectOfWork: 'Площадка 1', timeFrom: '08.05.2020', timeTo: '09.05.2020', key: '1'},
        {objectOfWork: 'Площадка 2', timeFrom: '09.06.2020', timeTo: '09.08.2020', key: '2'},
    ]);

    const [penalties, setPenalties] = useState([
        {objectOfWork: 'Площадка 1', penaltyType: 'Превышение скоростного лимита', key: '1'},
        {objectOfWork: 'Площадка 1', penaltyType: 'Курение в неположенном месте', key: '2'},
    ])

    return (
        <View>
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

            <View>
                <Text>Нарушения</Text>
                <Text>Баллы за нарушения: <Text>12</Text></Text>
                <FlatList data={penalties} renderItem={({item}) => (<Penalty item={item}/>)}/>
                <Pressable>
                    <Text>+ Добавить нарушение</Text>
                </Pressable>
            </View>

            <View>
                <Pressable>
                    <Text>Одобрить</Text>
                </Pressable>
                <Pressable>
                    <Text>Отклонить</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({}
);