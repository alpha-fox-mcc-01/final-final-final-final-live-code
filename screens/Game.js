import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons as Icon } from 'react-native-vector-icons';
import axios from 'axios';

const Game = ({ navigation }) => {
  const [gameState, setGameState] = useState([
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ]);
  const [almostShip, setAlmostShip] = useState(0);
  const [destroyShip, setDestroyShip] = useState(0);
  const [shotLeft, setShotLeft] = useState(6);

  useEffect(() => {
    setGameState([
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ]);
    initializeBoard();
  }, []);

  const initializeBoard = () => {
    setShotLeft(6);
    setAlmostShip(0);
    setDestroyShip(0);
    // axios
    //   .get('https://sffdc17tb9.execute-api.ap-southeast-1.amazonaws.com/dev/')
    //   .then(ships => {
    //     let counter = 1;
    //     const board = gameState.slice();
    //     for (let i = 0; i < ships.data.length; i++) {
    //       const el = 0;
    //       for (let j = 0; j < ships.data[i].length; j++) {
    //         el = ships.data[i][j];
    //         board[el[0]][el[1]] = counter;
    //       }
    //       counter++;
    //     }
    //   });

    setGameState([
      [1, 1, 1, 0, 0],
      [2, 2, 0, 0, 0],
      [3, 3, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ]);
  };

  const renderTile = (row, col) => {
    if (gameState[row][col] === 'o') {
      return <Icon name='skull-crossbones' size={40} color='green' />;
    } else if (gameState[row][col] === 'x') {
      return <Icon name='close' size={40} color='red' />;
    }
    return <Icon name='waves' size={40} color='#006994' />;
  };

  const checkShip = () => {
    let ship1 = 0;
    let ship2 = 0;
    let ship3 = 0;
    for (let i = 0; i < gameState.length; i++) {
      for (let j = 0; j < gameState[i].length; j++) {
        const ship = gameState[i][j];
        if (ship === 1) {
          ship1++;
        } else if (ship === 2) {
          ship2++;
        } else if (ship === 3) {
          ship3++;
        }
      }
    }

    let tempAlmostShip = 0;
    if (ship1 < 3) {
      tempAlmostShip++;
    }
    if (ship2 < 2) {
      tempAlmostShip++;
    }
    if (ship3 < 2) {
      tempAlmostShip++;
    }
    setAlmostShip(tempAlmostShip);

    let tempDestroyShip = 0;
    if (ship1 === 0) {
      tempDestroyShip++;
    }
    if (ship2 === 0) {
      tempDestroyShip++;
    }
    if (ship3 === 0) {
      tempDestroyShip++;
    }
    setDestroyShip(tempDestroyShip);
  };

  const onPressTile = (row, col) => {
    const board = gameState.slice();
    if (
      gameState[row][col] > 0 &&
      gameState[row][col] !== 'x' &&
      gameState[row][col] !== 'o'
    ) {
      board[row][col] = 'o';
      checkShip();
      setGameState(board);
      const shot = shotLeft - 1;
      if (shot === 0) {
        initializeBoard();
        navigation.navigate('Finish', { almostShip, destroyShip });
      }
      setShotLeft(shot);
    } else if (
      gameState[row][col] === 0 &&
      gameState[row][col] !== 'x' &&
      gameState[row][col] !== 'o'
    ) {
      board[row][col] = 'x';
      setGameState(board);
      const shot = shotLeft - 1;
      if (shot === 0) {
        initializeBoard();
        navigation.navigate('Finish', { almostShip, destroyShip });
      }
      setShotLeft(shot);
    }
    // const shot = shotLeft - 1;
    // if (shot === 0) {
    //   initializeBoard();
    //   navigation.navigate('Finish', { almostShip, destroyShip });
    // }
    // setShotLeft(shot);
    return;
  };

  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 15,
          fontWeight: 'bold',
          marginTop: 80,
          color: 'white',
          backgroundColor: '#006994',
          padding: 20,
        }}
      >
        Take your best shots
      </Text>
      <View>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            style={[
              styles.tile,
              { justifyContent: 'center', alignItems: 'center' },
            ]}
            onPress={() => onPressTile(0, 0)}
          >
            {renderTile(0, 0)}
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tile,
              { justifyContent: 'center', alignItems: 'center' },
            ]}
            onPress={() => onPressTile(0, 1)}
          >
            {renderTile(0, 1)}
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tile,
              { justifyContent: 'center', alignItems: 'center' },
            ]}
            onPress={() => onPressTile(0, 2)}
          >
            {renderTile(0, 2)}
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tile,
              { justifyContent: 'center', alignItems: 'center' },
            ]}
            onPress={() => onPressTile(0, 3)}
          >
            {renderTile(0, 3)}
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tile,
              { justifyContent: 'center', alignItems: 'center' },
            ]}
            onPress={() => onPressTile(0, 4)}
          >
            {renderTile(0, 4)}
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            style={[
              styles.tile,
              { justifyContent: 'center', alignItems: 'center' },
            ]}
            onPress={() => onPressTile(1, 0)}
          >
            {renderTile(1, 0)}
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tile,
              { justifyContent: 'center', alignItems: 'center' },
            ]}
            onPress={() => onPressTile(1, 1)}
          >
            {renderTile(1, 1)}
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tile,
              { justifyContent: 'center', alignItems: 'center' },
            ]}
            onPress={() => onPressTile(1, 2)}
          >
            {renderTile(1, 2)}
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tile,
              { justifyContent: 'center', alignItems: 'center' },
            ]}
            onPress={() => onPressTile(1, 3)}
          >
            {renderTile(1, 3)}
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tile,
              { justifyContent: 'center', alignItems: 'center' },
            ]}
            onPress={() => onPressTile(1, 4)}
          >
            {renderTile(1, 4)}
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            style={[
              styles.tile,
              { justifyContent: 'center', alignItems: 'center' },
            ]}
            onPress={() => onPressTile(2, 0)}
          >
            {renderTile(2, 0)}
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tile,
              { justifyContent: 'center', alignItems: 'center' },
            ]}
            onPress={() => onPressTile(2, 1)}
          >
            {renderTile(2, 1)}
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tile,
              { justifyContent: 'center', alignItems: 'center' },
            ]}
            onPress={() => onPressTile(2, 2)}
          >
            {renderTile(2, 2)}
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tile,
              { justifyContent: 'center', alignItems: 'center' },
            ]}
            onPress={() => onPressTile(2, 3)}
          >
            {renderTile(2, 3)}
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tile,
              { justifyContent: 'center', alignItems: 'center' },
            ]}
            onPress={() => onPressTile(2, 4)}
          >
            {renderTile(2, 4)}
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            style={[
              styles.tile,
              { justifyContent: 'center', alignItems: 'center' },
            ]}
            onPress={() => onPressTile(3, 0)}
          >
            {renderTile(3, 0)}
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tile,
              { justifyContent: 'center', alignItems: 'center' },
            ]}
            onPress={() => onPressTile(3, 1)}
          >
            {renderTile(3, 1)}
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tile,
              { justifyContent: 'center', alignItems: 'center' },
            ]}
            onPress={() => onPressTile(3, 2)}
          >
            {renderTile(3, 2)}
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tile,
              { justifyContent: 'center', alignItems: 'center' },
            ]}
            onPress={() => onPressTile(3, 3)}
          >
            {renderTile(3, 3)}
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tile,
              { justifyContent: 'center', alignItems: 'center' },
            ]}
            onPress={() => onPressTile(3, 4)}
          >
            {renderTile(3, 4)}
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            style={[
              styles.tile,
              { justifyContent: 'center', alignItems: 'center' },
            ]}
            onPress={() => onPressTile(4, 0)}
          >
            {renderTile(4, 0)}
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tile,
              { justifyContent: 'center', alignItems: 'center' },
            ]}
            onPress={() => onPressTile(4, 1)}
          >
            {renderTile(4, 1)}
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tile,
              { justifyContent: 'center', alignItems: 'center' },
            ]}
            onPress={() => onPressTile(4, 2)}
          >
            {renderTile(4, 2)}
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tile,
              { justifyContent: 'center', alignItems: 'center' },
            ]}
            onPress={() => onPressTile(4, 3)}
          >
            {renderTile(4, 3)}
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tile,
              { justifyContent: 'center', alignItems: 'center' },
            ]}
            onPress={() => onPressTile(4, 4)}
          >
            {renderTile(4, 4)}
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          height: 150,
          backgroundColor: '#006994',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}
      >
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ color: 'white' }}>Kapal Hampir</Text>
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 50 }}>
            {almostShip}
          </Text>
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ color: 'white' }}>Kapal Rusak</Text>
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 50 }}>
            {destroyShip}
          </Text>
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ color: 'white' }}>Sisa Tembakan</Text>
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 50 }}>
            {shotLeft}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Game;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  tile: {
    height: 50,
    width: 50,
    borderWidth: 3,
    borderColor: '#000080',
  },
});
