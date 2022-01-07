import React, {useState} from 'react';
import {TextInput, View, StyleSheet, Text, Pressable, TouchableWithoutFeedback, Keyboard} from 'react-native';
import {useAuth} from "../contexts/AuthContext";

export default function Login({navigation}) {
    const {login} = useAuth();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    async function handleLogin() {
        await login(username, password);
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.content}>
                <View style={styles.formContent}>
                    <Text style={styles.formText}>
                        Вход в систему
                    </Text>
                    <TextInput
                        style={styles.input}
                        placeholder='Логин'
                        onChangeText={setUsername}
                        value={username}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder='Пароль'
                        onChangeText={setPassword}
                        value={password}
                        secureTextEntry
                    />
                    <Pressable style={styles.button} onPress={handleLogin}>
                        <Text style={styles.buttonText}>Войти</Text>
                    </Pressable>
                </View>
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
        height: 48,
        backgroundColor: "#637CFF",
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 70,
        marginTop: 20,
    },
    buttonText: {
        fontSize: 16,
        color: "white",
    }
});