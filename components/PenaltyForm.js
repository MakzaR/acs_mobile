import React, {useState} from 'react';
import {View, StyleSheet, Text, Pressable, FlatList} from 'react-native';
import {Picker} from '@react-native-picker/picker';

const Item = Picker.Item;

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
            return <Picker.Item label={penalty.penaltyType} value={penalty.key} key={penalty.key}/>
        })
    }

    const [selectedObject, setSelectedObject] = useState();
    const [selectedPenalty, setSelectedPenalty] = useState();

    return (
        <View>
            <Text>
                Добавление нарушения
            </Text>
            <Text>Место нарушения</Text>
            <Picker
                selectedValue={selectedObject}
                onValueChange={(itemValue) =>
                    setSelectedObject(itemValue)
                }>
                {renderObjectList()}
            </Picker>
            <Text>Нарушение</Text>
            <Picker
                selectedValue={selectedPenalty}
                onValueChange={(itemValue) =>
                    setSelectedPenalty(itemValue)
                }>
                {renderPenaltyList()}
            </Picker>
            <Pressable>
                <Text>+ Добавить</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({})