import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Finish = ({ route, navigation }) => {
  const { almostShip } = route.params;
  const { destroyShip } = route.params;
  const [message, setMessage] = useState('');

  useEffect(() => {
    getResult();
  }, []);

  const getResult = () => {
    console.log('masuk');
    console.log(almostShip);
    if (destroyShip === 1) {
      setMessage(
        `Nice, you destroy 1 ship and almost destroy ${almostShip - 1} ship(s)`
      );
    } else if (destroyShip === 2) {
      setMessage(
        `Congratulations you destroy 2 ship and almost destroy ${almostShip -
          1} ship(s)`
      );
    } else if (destroyShip === 3) {
      setMessage(
        `You are the best. You destroy all enemies ship. Great job General.`
      );
    }
  };

  const onPlayPress = () => {
    navigation.navigate('Game', { almostShip, destroyShip });
  };

  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 15,
          fontWeight: 'bold',
          marginHorizontal: 30,
          marginBottom: 30,
          backgroundColor: '#000080',
          color: 'aqua',
          padding: 20,
        }}
      >
        {message}
      </Text>
      <TouchableOpacity
        style={{
          width: 100,
          backgroundColor: '#006994',
          padding: 10,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => onPlayPress()}
      >
        <Text style={{ color: 'white' }}>Play Again</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Finish;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
