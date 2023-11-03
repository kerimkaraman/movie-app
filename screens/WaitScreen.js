import { View, Text } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";

export default function WaitScreen() {
  return (
    <LinearGradient
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      colors={["#F10E49", "#13171B"]}
    >
      <Text className="text-center text-3xl text-white">Loading...</Text>
    </LinearGradient>
  );
}
