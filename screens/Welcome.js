import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function Welcome({ navigation, route }) {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 40 }}>B A T T L E S H I P</Text>
      <TouchableOpacity>
        <Text
          style={{
            fontSize: 20,
            marginTop: 20,
            borderWidth: 1,
            padding: 10,
            borderRadius: 10
          }}
          onPress={() => navigation.push("Game")}
        >
          PLAY GAME
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
