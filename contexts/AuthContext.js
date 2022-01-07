import React, {useContext, useEffect, useState} from 'react'
import * as SecureStore from 'expo-secure-store';

const API_URL = 'http://45.144.64.103:81';

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

function Auth() {
    const [userToken, setUserToken] = useState(null);
    // const [loading, setLoading] = useState(true);

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
        const userToken = await response.text();

        setUserToken(userToken);
        await SecureStore.setItemAsync('userToken', userToken);
    }

    // useEffect(() => {
    //     const currentUserToken = SecureStore.getItemAsync('userToken');
    //     if (currentUserToken) {
    //         setUserToken(currentUserToken);
    //     }
    //     setLoading(false);
    // }, [])

    const logout = async () => {
        await SecureStore.deleteItemAsync('userToken');
        setUserToken(null);
    }

    // const value = {
    //     userToken,
    //     login,
    //     // logout
    // }
    //
    // return (
    //     <AuthContext.Provider value={value}>
    //         {!loading && props.children}
    //     </AuthContext.Provider>
    // )

    return {userToken, login, logout}
}

export const AuthContextProvider = (props) => {
    const auth = Auth();
    return (
        <AuthContext.Provider value={auth}>
            {props.children}
        </AuthContext.Provider>);
};