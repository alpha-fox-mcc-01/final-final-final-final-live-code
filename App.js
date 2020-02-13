import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import styles from './App.style'
import Game from './Game'
import Welcome from './Welcome'
import Finish from './Finish'

const Stack = createStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode='none'>
        <Stack.Screen name='Welcome' component={Welcome} />
        <Stack.Screen name='Game' component={Game} />
        <Stack.Screen name='Finish' component={Finish} />
      </Stack.Navigator>
    </NavigationContainer>

    // <View style={styles.container}>
    //   <Text>halo</Text>
    // </View>
  )
}
