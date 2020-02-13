import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import axios from 'axios'

import styles from './Game.style'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default function Game({ navigation }) {
  const [shipPart, setShipPart] = useState(7)
  const [ammo, setAmmo] = useState(15)
  const [board, setBoard] = useState([])
  const [alert, setAlert] = useState('press the tiles')

  const shipLocations = [
    [
      [0, 0],
      [0, 1],
    ],
    [
      [1, 3],
      [1, 4],
    ],
    [
      [4, 1],
      [4, 2],
      [4, 3],
    ],
  ]

  function generateBoard(shipLocations) {
    let board = []
    for (let i = 0; i < 5; i++) {
      let row = []
      for (let j = 0; j < 5; j++) {
        row[j] = 0
      }
      board.push(row)
    }
    shipLocations.forEach((ship) => {
      // console.log('------------------------')
      ship.forEach((part) => {
        board[part[0]][part[1]] = 2
      })
    })
    return board
  }

  function fire(x, y) {
    setAmmo(ammo - 1)
    console.log(board)
    if (board[x][y] == 2) {
      setAlert('HIT !!!')
      setTimeout(() => {
        setAlert('')
      }, 1500)
      const newBoard = board
      newBoard[x][y] = 1
      setBoard(newBoard)
      setShipPart(shipPart - 1)
    } else {
      setAlert('miss')
      setTimeout(() => {
        setAlert('')
      }, 1500)
    }
    if (shipPart == 0) {
      navigation.navigate('Finish', { status: 'You Win' })
    }
    if (ammo < 1) {
      navigation.navigate('Finish', { status: 'You Lose' })
    }
  }
  useEffect(() => {
    axios.get('https://sffdc17tb9.execute-api.ap-southeast-1.amazonaws.com/dev/').then(({ data }) => {
      setBoard(generateBoard(data))
      console.log(board)
    })
  }, [])

  return (
    <>
      <View style={styles.container}>
        {board.map((row, xIndex) => {
          return (
            <View style={styles.board}>
              {row.map((coordinate, yIndex) =>
                coordinate == 2 ? (
                  <TouchableOpacity
                    key={`${xIndex},${yIndex}`}
                    style={styles.seaTilesEmpty}
                    onPress={() => {
                      fire(xIndex, yIndex)
                    }}
                  ></TouchableOpacity>
                ) : coordinate == 1 ? (
                  <TouchableOpacity
                    style={styles.seaTileHit}
                    onPress={() => {
                      fire(xIndex, yIndex)
                    }}
                  >
                    <Text>🚢!</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={styles.seaTilesEmpty}
                    onPress={() => {
                      fire(xIndex, yIndex)
                    }}
                  ></TouchableOpacity>
                )
              )}
            </View>
          )
        })}
        <Text style={styles.alert}>{alert}</Text>
      </View>

      <View style={styles.bottomSection}>
        <View>
          <Text>Kapal Hampir</Text>
          <Text>0</Text>
        </View>
        <View>
          <Text>Kapal Rusak</Text>
          <Text>0</Text>
        </View>
        <View>
          <Text>Sisa Tembakan</Text>
          <Text>{ammo}</Text>
        </View>
      </View>
    </>
  )
}
