import { View, Text } from "react-native";
import React from "react";

export default function MovieDetailsItem({ header, text }) {
  return (
    <View className="bg-custom-verylightgrey/40 pb-3 pl-3 pr-3 pt-1 gap-y-2 rounded-lg m-1 min-w-[100px]">
      <Text className="text-white text-xl font-medium text-center">
        {header}
      </Text>
      <Text className="text-center text-custom-lightgrey ">{text}</Text>
    </View>
  );
}
