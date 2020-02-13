import React from "react";
import { Text, View, TouchableOpacity, Button } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

export default function WelcomePage({ navigation }) {

  return (
    <View>
      <Text>Welcome to Battleship v. 10.0</Text>
      <Text>To start playing, press start</Text>
      <Button
        title="Start Game"
        onPress={() => navigation.navigate('Game')}
      />
    </View>
  );
}
