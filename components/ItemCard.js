import { View, Text, Image, ImageBackground, Pressable } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { useNavigation } from "@react-navigation/native";

export default function ItemCard({ id, img, title, date, vote, type }) {
  const nav = useNavigation();
  const handleOnPress = () => {
    nav.navigate("MovieDetail", { id: id, type: type });
  };

  return (
    <Pressable onPress={handleOnPress}>
      <ImageBackground
        className="flex-1 w-[100%] h-[200px]"
        imageStyle={{
          borderRadius: 15,
          objectFit: "cover",
          width: "100%",
        }}
        source={{ uri: `https://image.tmdb.org/t/p/original${img}` }}
      >
        <LinearGradient
          className="w-[100%] h-[200px] p-4 justify-end"
          style={{ bottom: 0, flex: 1, borderRadius: 15 }}
          colors={["transparent", "rgba(0,0,0,0.5)", "#000"]}
          locations={[0, 0.6, 0.9]}
        >
          <View className="justify-between h-full">
            <View className="flex-row items-center gap-2">
              <AnimatedCircularProgress
                size={25}
                width={5}
                fill={vote * 10}
                tintColor="#0FC000"
                backgroundColor="#3d5875"
              ></AnimatedCircularProgress>
              <Text className="text-custom-green text-lg font-400 shadow-xl">
                {vote}
              </Text>
            </View>
            <Text className="text-custom-lightgrey text-md font-medium text-center">
              {title}
            </Text>
          </View>
        </LinearGradient>
      </ImageBackground>
    </Pressable>
  );
}
