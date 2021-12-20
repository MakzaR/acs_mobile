import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from "@react-navigation/native";

import HomeStack from "./routes/Stack";

export default function App() {
  return (
      <NavigationContainer>
        <HomeStack/>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({

});
