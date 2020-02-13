import React from 'react'
import { View, Text } from 'react-native'

import styles from './App.style'

export default function Finish({ route }) {
  return (
    <View style={styles.container}>
      <Text>{route.params.status}</Text>
    </View>
  )
}
