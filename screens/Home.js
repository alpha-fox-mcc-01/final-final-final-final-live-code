import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

const Home = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 30, fontWeight: 'bold', marginBottom: 50 }}>
        BattleShip
      </Text>
      <Text
        style={{
          fontSize: 15,
          marginBottom: 30,
          backgroundColor: 'black',
          padding: 15,
          color: 'aqua',
        }}
      >
        Hit Play if you ready to blow some ships
      </Text>
      <Button title='Play' onPress={() => navigation.navigate('Game')} />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
