import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import axios from "axios";

export default function Game({ navigation }) {
  const [shipsHit, setShipsHit] = useState(0);
  const [shipsDestroyed, setShipsDestroyed] = useState(0);
  const [shots, setShots] = useState(6);
  const [ships, setShips] = useState([]);

  const handlePress = (row, col) => {
    let updatedBoard = [];
    for (let i = 0; i < gameBoard.length; i++) {
      let updatedRow = [];
      for (let j = 0; j < gameBoard[i].length; j++) {
        if (i === row && j === col) {
          updatedRow.push({ ...gameBoard[i][j], isClicked: true });
        } else {
          updatedRow.push(gameBoard[i][j]);
        }
      }
      updatedBoard.push(updatedRow);
    }
    setGameBoard(updatedBoard);
    setShots(shots - 1);
  };

  const [gameBoard, setGameBoard] = useState(false);

  const showCell = (row, col) => {
    let cell = gameBoard[row][col];
    if (cell.isClicked) {
      return <Text style={styles.ship}>{cell.value}</Text>;
    }
    return <View />;
  };

  useEffect(() => {
    axios({
      method: "GET",
      url: "https://sffdc17tb9.execute-api.ap-southeast-1.amazonaws.com/dev/"
    })
      .then(({ data }) => {
        let filledBoard = [];
        for (let i = 0; i < 5; i++) {
          let row = [];
          for (let j = 0; j < 5; j++) {
            let isShip = false;
            data.forEach(ship => {
              ship.forEach(coordinate => {
                if (coordinate[0] === i && coordinate[1] === j) {
                  isShip = true;
                }
              });
            });
            if (isShip) {
              row.push({ value: "X", isClicked: false });
            } else {
              row.push({ value: "O", isClicked: false });
            }
          }
          filledBoard.push(row);
        }
        setShips(data);
        setGameBoard(filledBoard);
      })
      .catch(console.log);
  }, []);

  useEffect(() => {
    let shipsHit = 0;
    let shipsDestroyed = 0;
    ships.forEach(ship => {
      let hitsTaken = 0;
      let shipLength = ship.length;
      ship.forEach(coordinate => {
        for (let i = 0; i < 5; i++) {
          for (let j = 0; j < 5; j++) {
            if (
              coordinate[0] === i &&
              coordinate[1] === j &&
              gameBoard[i][j].isClicked
            ) {
              hitsTaken++;
            }
          }
        }
      });
      if (hitsTaken) shipsHit++;
      if (hitsTaken === shipLength) shipsDestroyed++;
    });
    setShipsHit(shipsHit);
    setShipsDestroyed(shipsDestroyed);
  }, [gameBoard]);

  useEffect(() => {
    if (shots === 0) {
      navigation.push("Results", { hits: shipsHit, destroyed: shipsDestroyed });
    }
  }, [shots]);

  return (
    gameBoard && (
      <>
        <View style={styles.container}>
          {gameBoard.map((row, i) => (
            <View style={styles.boardRow} key={Math.random()}>
              <View style={styles.boardRow}>
                {row.map((cell, j) => (
                  <TouchableOpacity
                    style={styles.boardCell}
                    key={Math.random()}
                    onPress={() => handlePress(i, j)}
                  >
                    {showCell(i, j)}
                    {/* <Text style={styles.ship}>{cell}</Text> */}
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ))}
        </View>
        <View style={styles.statsBoard}>
          <View>
            <Text style={{ fontSize: 15 }}>Kapal Hampir</Text>
            <Text style={{ fontSize: 40, alignSelf: "center" }}>
              {shipsHit}
            </Text>
          </View>
          <View>
            <Text style={{ fontSize: 15 }}>Kapal Rusak </Text>
            <Text style={{ fontSize: 40, alignSelf: "center" }}>
              {shipsDestroyed}
            </Text>
          </View>
          <View>
            <Text style={{ fontSize: 15 }}>Sisa Tembakan</Text>
            <Text style={{ fontSize: 40, alignSelf: "center" }}>{shots}</Text>
          </View>
        </View>
      </>
    )
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  boardRow: {
    flexDirection: "row"
  },
  boardCell: {
    height: 70,
    width: 70,
    borderWidth: 0.7,
    alignItems: "center",
    justifyContent: "center"
  },
  statsBoard: {
    height: 170,
    marginBottom: 0,
    marginTop: "auto",
    flexDirection: "row",
    padding: 15,
    justifyContent: "space-around"
  },
  ship: {
    fontSize: 40
  }
});
