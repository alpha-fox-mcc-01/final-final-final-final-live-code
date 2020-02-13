import React from 'react'
import { View, Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

import styles from './Welcome.style'
export default function Welcome({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Prepare yer sheeeps!</Text>
      <TouchableOpacity
        style={styles.toBattle}
        onPress={() => {
          navigation.navigate('Game')
        }}
      >
        <View>
          <Text style={{ fontSize: 36 }}>To batle!</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}
