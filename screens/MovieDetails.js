import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
  Image,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { set, ref, child, push, update, onValue } from "firebase/database";
import { DATABASE } from "../firebaseConfig";
import WaitScreen from "./WaitScreen";

export default function MovieDetails({ route }) {
  const { data, cast } = route.params;
  const [movie, setMovie] = useState([data]);
  const [credit, setCredit] = useState([cast.cast]);
  const [color, setColor] = useState("white");
  const [favs, setFavs] = useState([]);
  const [isFav, setIsFav] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { userID } = useSelector((state) => state.signup);

  const nav = useNavigation();
  const handleGoBack = () => {
    nav.goBack();
  };
  useEffect(() => {
    const db = DATABASE;
    const favRef = ref(db, "users/" + userID + "/favorites");
    onValue(favRef, (snapshot) => {
      const data = snapshot.val();
      setFavs(data);
    });
    setIsLoading(false);
  }, []);

  return isLoading ? (
    <WaitScreen />
  ) : (
    <LinearGradient style={{ flex: 1 }} colors={["#F10E49", "#13171B"]}>
      {movie.map((mov) => {
        const {
          id,
          backdrop_path,
          poster_path,
          title,
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
                    onPress={() => {
                      const db = DATABASE;
                      const postData = {
                        id: id,
                        backdrop_path: backdrop_path,
                        poster_path: poster_path,
                        title: title,
                        runtime: runtime,
                        vote_average: vote_average,
                        overview: overview,
                      };
                      const updates = {};
                      updates["/users/" + userID + "/favorites/" + id] =
                        postData;
                      color === "white" ? setColor("red") : setColor("white");
                      return update(ref(db), updates);
                    }}
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
                  {genres.map((genre, index) => {
                    return (
                      <View
                        key={index}
                        className="border border-custom-lightgrey rounded-2xl px-3 py-1"
                      >
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
                          <View key={id} className="w-[30%] gap-y-2">
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
