import React, {useState} from 'react';
import {View, StyleSheet, Text, Pressable} from 'react-native';
import {Picker} from '@react-native-picker/picker';

const Item = Picker.Item;

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
            <Text>
                Допуск на объект
            </Text>
            <Text>Объект</Text>
            <Picker
                selectedValue={selectedObject}
                onValueChange={(itemValue) =>
                    setSelectedObject(itemValue)
                }>
                {renderObjectList()}
            </Picker>
            <Pressable>
                <Text>Одобрить</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({})