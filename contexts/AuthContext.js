import React, {useContext, useState} from 'react'
import * as SecureStore from 'expo-secure-store';

const API_URL = 'http://45.144.64.103:81';

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

function Auth() {
    const [userToken, setUserToken] = useState(null);

    const login = async (username, password) => {
        const data = {username, password}

        const postConfig = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };

        const response = await fetch(API_URL + '/api/auth/', postConfig);

        if (!response.ok) {
            const details = await response.json();
            alert(`${details.detail}`);
            // throw new Error(details.detail);
            // return response;
            return response;
        }

        const userToken = await response.text();
        setUserToken(userToken);
        await SecureStore.setItemAsync('userToken', userToken);
    }

    const logout = async () => {
        await SecureStore.deleteItemAsync('userToken');
        setUserToken(null);
    }

    return {userToken, login, logout}
}

export const AuthContextProvider = (props) => {
    const auth = Auth();
    return (
        <AuthContext.Provider value={auth}>
            {props.children}
        </AuthContext.Provider>);
};