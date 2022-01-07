import {StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from "@react-navigation/native";

import HomeStack from "./routes/Stack";
import {AuthContextProvider} from "./contexts/AuthContext";

export default function App() {
    return (
        <AuthContextProvider>
            <NavigationContainer>
                <HomeStack/>
            </NavigationContainer>
        </AuthContextProvider>
    );
}

const styles = StyleSheet.create({});
