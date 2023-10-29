import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import MovieDetailsItem from "../components/MovieDetailsItem";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { ref, onValue } from "firebase/database";
import { DATABASE } from "../firebaseConfig";

export default function MovieDetails({ route }) {
  const { data, cast } = route.params;
  const [movie, setMovie] = useState([data]);
  const [credit, setCredit] = useState([cast.cast]);
  const [color, setColor] = useState("white");
  const nav = useNavigation();
  const handleGoBack = () => {
    nav.goBack();
  };

  const handleFavorite = () => {
    color === "white" ? setColor("red") : setColor("white");
  };

  return (
    <LinearGradient style={{ flex: 1 }} colors={["#F10E49", "#13171B"]}>
      {movie.map((mov) => {
        const {
          backdrop_path,
          poster_path,
          budget,
          title,
          name,
          runtime,
          status,
          vote_count,
          genres,
          vote_average,
          overview,
        } = mov;
        return (
          <ScrollView>
            <ImageBackground
              className="w-full h-[400px]"
              source={{
                uri: `https://image.tmdb.org/t/p/original${poster_path}`,
              }}
            >
              <View className="mt-20 z-10 flex-row items-center justify-between mx-5">
                <View className=" bg-black w-[60px] items-center p-3 rounded-full">
                  <Ionicons
                    onPress={handleGoBack}
                    name="chevron-back"
                    size={36}
                    color="white"
                  />
                </View>
                <View className=" bg-black w-[60px] items-center p-3 rounded-full">
                  <Ionicons
                    onPress={handleFavorite}
                    name="heart"
                    size={36}
                    color={color}
                  />
                </View>
              </View>
            </ImageBackground>
            <View className="mt-10 mx-auto z-10">
              <View className=" items-center p-4">
                <Image
                  className="w-[300px] mt-[-250px] h-[400px] mx-auto rounded-md"
                  source={{
                    uri: `https://image.tmdb.org/t/p/original${backdrop_path}`,
                  }}
                />
                <View className="flex-row items-center gap-x-1 mt-2">
                  <Ionicons name="stopwatch-outline" size={16} color="white" />
                  <Text className="text-custom-lightgrey">{runtime} mins.</Text>
                </View>
                <Text className="text-custom-lightgrey text-2xl mt-5 text-center font-medium">
                  {title != undefined ? title : name}
                </Text>
              </View>
              <View className="mt-5 p-4 gap-y-2">
                <View className="flex-row flex-wrap gap-2 mx-auto mb-2 justify-center">
                  {genres.map((genre) => {
                    return (
                      <View className="border border-custom-lightgrey rounded-2xl px-3 py-1">
                        <Text className="text-custom-lightgrey ">
                          {genre.name}
                        </Text>
                      </View>
                    );
                  })}
                </View>
                <View className="flex-row mb-3 items-center gap-x-2">
                  <Ionicons name="star" size={18} color="yellow" />
                  <View className="flex-row gap-x-1">
                    <Text className="text-custom-lightgrey">
                      {vote_average.toFixed(1)}
                    </Text>
                    <Text className="text-custom-lightgrey">
                      ({vote_count})
                    </Text>
                  </View>
                  <Text
                    style={{ color: status === "Released" ? "#0FC000" : "red" }}
                  >
                    {status}
                  </Text>
                </View>
                <View>
                  <Text className="text-custom-lightgrey">
                    {overview != undefined ? overview : "No data."}
                  </Text>
                </View>
                <View>
                  <Text className="text-custom-lightgrey text-xl font-medium my-5">
                    Cast
                  </Text>
                  <View className="flex-row flex-wrap gap-2 mx-auto">
                    {credit.map((cr) => {
                      return cr.map((c) => {
                        const { name, id, profile_path } = c;
                        return profile_path == undefined ? null : (
                          <View className="w-[30%] gap-y-2">
                            <Image
                              className="w-[100%] object-fill h-[150px]"
                              source={{
                                uri: `https://image.tmdb.org/t/p/original${profile_path}`,
                              }}
                            />
                            <Text className="text-center text-custom-lightgrey">
                              {name}
                            </Text>
                          </View>
                        );
                      });
                    })}
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        );
      })}
    </LinearGradient>
  );
}
