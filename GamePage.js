import React, {useState, useEffect} from 'react'
import { Text, View, TouchableOpacity, StyleSheet, Alert } from "react-native";
import axios from 'axios'
export default function GamePage({ navigation }) {
    const [gameState, setgameState] = useState([[0,0,0], [0,0,0], [0,0,0]])
    const [isOccupied, setOccupied] = useState(false)
    const [nearHit, setNearHit] = useState(0)
    const [hit, setHit] = useState(0)
    const [shots, setShots] = useState(6)


    useEffect(() => {
        axios.get('https://sffdc17tb9.execute-api.ap-southeast-1.amazonaws.com/dev/')
             .then(({ data }) => {
                 setgameState(data)
             })
             .catch(err => {
                 console.log(err)
             })

    }, [])



    const placeShips = (row, col, hit) => {

        const shipPlacement= gameState
        for (let i = 0; i < shipPlacement.length; i++) {
            for (let j = 0; j < shipPlacement[i].length; j++) {
                if (row == shipPlacement[i][j][0] && col == shipPlacement[i][j][1]) {
                    if (hit) {
                        return <Text>Kena</Text>
                    }
                    return <Text>Ship</Text>
                } 
            }
        } 
        return <Text>Water</Text>
    }

    const attempt = (row, col) => {
        console.log('masuk attempt')
        const shipPlacement= gameState
          let newHit = 0
          let newShot = 0
        if (shots > 0) {
            for (let i = 0; i < shipPlacement.length; i++) {
                for (let j = 0; j < shipPlacement[i].length; j++) {
                    if (row == shipPlacement[i][j][0] && col == shipPlacement[i][j][1]) {
                        newHit = nearHit + 1
                        newShot = shots - 1
                        setNearHit(newHit)
                        setShots(newShot)
                        placeShips(row, col, true)
                        return 
                    } else {
                        newShot = shots - 1
                        setShots(newShot)
                    }
                }
            } 
        }  else {
            Alert.alert('Tembakan anda habis')
            navigation.navigate('Finish')
        }
        
    }

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row'}}>
                <TouchableOpacity style={styles.tile} onPress={ () => attempt(0,0)}>{placeShips(0,0)}</TouchableOpacity>
                <TouchableOpacity style={styles.tile} onPress={ () => attempt(0,1)}>{placeShips(0,1)}</TouchableOpacity>
                <TouchableOpacity style={styles.tile} onPress={ () => attempt(0,2)} >{placeShips(0,2)}</TouchableOpacity>
                <TouchableOpacity style={styles.tile} onPress={ () => attempt(0,3)} >{placeShips(0,3)}</TouchableOpacity>
                <TouchableOpacity style={styles.tile} onPress={ () => attempt(0,4)}>{placeShips(0,4)}</TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row'}}>
            <TouchableOpacity style={styles.tile} onPress={ () => attempt(1,0)}>{placeShips(1,0)}</TouchableOpacity>
                <TouchableOpacity style={styles.tile} onPress={ () => attempt(1,1)} >{placeShips(1,1)}</TouchableOpacity>
                <TouchableOpacity style={styles.tile} onPress={ () => attempt(1,2)} >{placeShips(1,2)}</TouchableOpacity>
                <TouchableOpacity style={styles.tile} onPress={ () => attempt(1,3)} >{placeShips(1,3)}</TouchableOpacity>
                <TouchableOpacity style={styles.tile} onPress={ () => attempt(1,4)}>{placeShips(1,4)}</TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row'}}>
                <TouchableOpacity style={styles.tile} onPress={ () => attempt(2,0)} >{placeShips(2,0)}</TouchableOpacity>
                <TouchableOpacity style={styles.tile} onPress={ () => attempt(2,1)} >{placeShips(2,1)}</TouchableOpacity>
                <TouchableOpacity style={styles.tile} onPress={ () => attempt(2,2)} >{placeShips(2,2)}</TouchableOpacity>
                <TouchableOpacity style={styles.tile} onPress={ () => attempt(2,3)} >{placeShips(2,3)}</TouchableOpacity>
                <TouchableOpacity style={styles.tile} onPress={ () => attempt(2,4)}>{placeShips(2,4)}</TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row'}}>
                <TouchableOpacity style={styles.tile} onPress={ () => attempt(3,0)}>{placeShips(3,0)}</TouchableOpacity>
                <TouchableOpacity style={styles.tile} onPress={ () => attempt(3,1)} >{placeShips(3,1)}</TouchableOpacity>
                <TouchableOpacity style={styles.tile} onPress={ () => attempt(3,2)} >{placeShips(3,2)}</TouchableOpacity>
                <TouchableOpacity style={styles.tile} onPress={ () => attempt(3,3)} >{placeShips(3,3)}</TouchableOpacity>
                <TouchableOpacity style={styles.tile} onPress={ () => attempt(3,4)} >{placeShips(3,4)}</TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row'}}>
                <TouchableOpacity style={styles.tile} onPress={ () => attempt(4,1)}>{placeShips(4,0)}</TouchableOpacity>
                <TouchableOpacity style={styles.tile} onPress={ () => attempt(4,2)} >{placeShips(4,1)}</TouchableOpacity>
                <TouchableOpacity style={styles.tile} onPress={ () => attempt(4,3)} >{placeShips(4,2)}</TouchableOpacity>
                <TouchableOpacity style={styles.tile} onPress={ () => attempt(4,4)}>{placeShips(4,3)}</TouchableOpacity>
                <TouchableOpacity style={styles.tile}>{placeShips(4,4)}</TouchableOpacity>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
                <View style={{padding: 10, flexDirection: 'column'}}>
                <Text>Kapal Hampir</Text>
                <Text>{nearHit}</Text>
                </View>
                <View style={{padding: 10}}>
                <Text>Kapal Rusak</Text>
                <Text>0</Text>
                </View>
                <View style={{padding: 10}}>
                <Text>Sisa Tembakan</Text>
                <Text>{shots}</Text>
                </View>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center"
    },
    tile: {
        height: 80,
        width: 80,
        borderWidth: 4
    }
  });