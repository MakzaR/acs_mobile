import React from 'react';
import {createStackNavigator} from "@react-navigation/stack";
import {useAuth} from "../contexts/AuthContext";

import Login from "../screens/Login";
import QR from "../screens/QR";
import Worker from "../screens/Worker";


const Stack = createStackNavigator();

export default function HomeStack() {
    const {userToken} = useAuth();

    return (
        <Stack.Navigator>
            {userToken == null ? (
                <Stack.Screen
                    name={'Login'}
                    component={Login}
                    options={{
                        headerShown: false
                    }}
                />
            ) : (
                <>
                    <Stack.Screen
                        name={'QR'}
                        component={QR}
                        options={{
                            headerShown: false,
                            unmountOnBlur: true
                        }}
                    />
                    <Stack.Screen
                        name={'Worker'}
                        component={Worker}
                        options={{
                            title: 'Информация о сотруднике',
                        }}
                    />
                </>
            )}
        </Stack.Navigator>
    );
};