import { Pressable, StyleSheet, Text } from "react-native";
import React from "react";

import { useNavigation } from "@react-navigation/native";

export default function CategoryItem({ name }) {
  const nav = useNavigation();
  const handleOnPress = () => {
    nav.navigate("Category", { name: name });
  };
  return (
    <Pressable
      onPress={handleOnPress}
      className="border border-custom-lightgrey rounded-2xl"
    >
      <Text className="text-custom-lightgrey px-4 py-2">{name}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({});
