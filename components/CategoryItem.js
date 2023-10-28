import { Pressable, StyleSheet, Text } from "react-native";
import React from "react";

export default function CategoryItem({ name }) {
  return (
    <Pressable className="border border-custom-lightgrey rounded-2xl">
      <Text className="text-custom-lightgrey px-4 py-2">{name}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({});
