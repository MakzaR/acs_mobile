import React from 'react';
import {Button, TextInput, View, StyleSheet, Text, Pressable, TouchableWithoutFeedback, Keyboard} from 'react-native';
import {Formik} from 'formik';

export default function Login({navigation}) {
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.content}>
                <Formik
                    initialValues={{
                        login: '',
                        password: ''
                    }}
                    onSubmit={(values, actions) => {
                        actions.resetForm();
                    }}
                >
                    {({handleChange, handleBlur, handleSubmit, values}) => (
                        <View style={styles.formContent}>
                            <Text style={styles.formText}>
                                Вход в систему
                            </Text>
                            <TextInput
                                style={styles.input}
                                placeholder='Логин'
                                onChangeText={handleChange('login')}
                                value={values.login}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder='Пароль'
                                onChangeText={handleChange('password')}
                                value={values.password}
                                secureTextEntry
                            />

                            <Pressable style={styles.button} onPress={() => navigation.navigate('QR')}>
                                <Text style={styles.text}>Войти</Text>
                            </Pressable>
                            {/*<Button*/}
                            {/*    style={styles.button}*/}
                            {/*    onPress={() => navigation.navigate('QR')}*/}
                            {/*    title="Войти"*/}
                            {/*/>*/}
                        </View>
                    )}
                </Formik>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        backgroundColor: "white",
        alignItems: 'center',
        justifyContent: 'center',
    },
    formContent: {
        flex: 1,
        width: "100%",
        justifyContent: 'center',
        padding: "12%",
    },
    formText: {
        fontSize: 24,
        fontWeight: "bold",
        alignSelf: "center",
        marginBottom: 24,
    },
    input: {
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#AFAFAF',
        padding: 10,
        paddingLeft: 20,
        marginBottom: 16,
    },
    button: {
        width: "64%",
        height: 48,
        backgroundColor: "#637CFF",
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
    },
    text: {
        fontSize: 16,
        color: "white",
    }
})