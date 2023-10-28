import { View, Text, Image, ImageBackground } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";

export default function ItemCard({ id, img, title, date }) {
  return (
    <ImageBackground
      className="flex-1 w-[90%] object-contain h-[300px]"
      imageStyle={{ borderRadius: 15 }}
      source={{ uri: `https://image.tmdb.org/t/p/original${img}` }}
    >
      <LinearGradient
        className="w-[90%] p-4 justify-end"
        style={{ bottom: 0, flex: 1, borderRadius: 15 }}
        colors={["transparent", "rgba(0,0,0,0.5)", "#000"]}
        locations={[0, 0.6, 0.9]}
      >
        <View>
          <Text className="text-custom-lightgrey text-xl text-center">
            {title}
          </Text>
          <View></View>
        </View>
      </LinearGradient>
    </ImageBackground>
  );
}
