import { View, Text, Image, ImageBackground, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

export default function ItemCard({ id, img, title, vote, userID }) {
  const [data, setData] = useState([]);
  const [cast, setCast] = useState([]);
  const nav = useNavigation();

  useEffect(() => {
    const options = {
      method: "GET",
      url: `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYTczZmM1ZTExNmU0ZjU4OTllNzExMjBmYTIwZDRkZSIsInN1YiI6IjYyYzE4YWU1MjJlNDgwMGZhOGYxZWMxMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lv9_uKWjg2nv5o_oszOERscOnwPuLLxgdExnkxrpoTI",
      },
    };
    axios
      .request(options)
      .then(function (response) {
        setData(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });

    const castOptions = {
      method: "GET",
      url: `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`,
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYTczZmM1ZTExNmU0ZjU4OTllNzExMjBmYTIwZDRkZSIsInN1YiI6IjYyYzE4YWU1MjJlNDgwMGZhOGYxZWMxMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lv9_uKWjg2nv5o_oszOERscOnwPuLLxgdExnkxrpoTI",
      },
    };

    axios
      .request(castOptions)
      .then(function (response) {
        setCast(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  const handleOnPress = () => {
    nav.navigate("MovieDetail", { data: data, cast: cast, userid: userID });
  };

  return (
    <Pressable onPress={handleOnPress} className="m-2">
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
          style={{ borderRadius: 15 }}
          colors={["transparent", "rgba(0,0,0,0.5)", "#000"]}
          locations={[0, 0.6, 0.9]}
        >
          <View className="justify-between h-full">
            <View className="flex-row items-center gap-2">
              <AnimatedCircularProgress
                size={25}
                width={5}
                style={{ width: 20, height: 20 }}
                fill={vote * 10}
                tintColor="#0FC000"
                backgroundColor="#3d5875"
              />
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
