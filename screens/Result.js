import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Button } from "react-native";

export default function Result({ navigation, route }) {
  return (
    <>
      <View style={styles.container}>
        <Text style={{ fontSize: 30 }}>RESULTS</Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            marginTop: 30,
            width: 300,
            marginBottom: 50
          }}
        >
          <View>
            <Text style={{ fontSize: 15 }}>Kapal Hampir</Text>
            <Text style={{ fontSize: 40, alignSelf: "center" }}>
              {route.params.hits}
            </Text>
          </View>
          <View>
            <Text style={{ fontSize: 15 }}>Kapal Rusak </Text>
            <Text style={{ fontSize: 40, alignSelf: "center" }}>
              {route.params.destroyed}
            </Text>
          </View>
        </View>
        <Button
          title="Back to Title"
          onPress={() => navigation.push("Welcome")}
        />
      </View>
    </>
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
