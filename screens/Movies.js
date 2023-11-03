import {
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import { ref, onValue } from "firebase/database";
import { DATABASE } from "../firebaseConfig";
import { useSelector } from "react-redux";
import CategoryItem from "../components/CategoryItem";
import ItemCard from "../components/ItemCard";

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [user, setUser] = useState([]);
  const [categories, setCategories] = useState([]);
  const { email } = useSelector((state) => state.signup);
  const [isUserLoading, setIsUserLoading] = useState(true);
  const [userID, setUserID] = useState();

  useEffect(() => {
    const db = DATABASE;
    const userRef = ref(db, "users/");
    onValue(userRef, (snapshot) => {
      const data = snapshot.val();
      let obj = Object.values(data);
      obj = obj.filter((ob) => ob.email == email);
      setUser(obj);
    });
    const options = {
      method: "GET",
      url: "https://api.themoviedb.org/3/genre/movie/list?language=en",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYTczZmM1ZTExNmU0ZjU4OTllNzExMjBmYTIwZDRkZSIsInN1YiI6IjYyYzE4YWU1MjJlNDgwMGZhOGYxZWMxMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lv9_uKWjg2nv5o_oszOERscOnwPuLLxgdExnkxrpoTI",
      },
    };
    axios
      .request(options)
      .then(function (response) {
        setCategories(response.data.genres);
      })
      .catch(function (error) {
        console.error(error);
      });
    const movieOptions = {
      method: "GET",
      url: "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYTczZmM1ZTExNmU0ZjU4OTllNzExMjBmYTIwZDRkZSIsInN1YiI6IjYyYzE4YWU1MjJlNDgwMGZhOGYxZWMxMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lv9_uKWjg2nv5o_oszOERscOnwPuLLxgdExnkxrpoTI",
      },
    };

    axios
      .request(movieOptions)
      .then(function (response) {
        setMovies(response.data.results);
      })
      .catch(function (error) {
        console.error(error);
      });
    Object.values(user).map((us) => {
      setUserID(us.userID);
    });
  }, []);

  return (
    <LinearGradient style={{ flex: 1 }} colors={["#F10E49", "#13171B"]}>
      <SafeAreaView>
        <ScrollView className="px-5">
          {Object.values(user).map((us) => {
            const { namesurname, profile_img } = us;
            return (
              <View className="flex-row items-center justify-end">
                <Text className="text-lg text-custom-lightgrey">
                  Tekrar Hoşgeldin, {namesurname}
                </Text>
                <Image
                  style={{ objectFit: "contain" }}
                  className="w-[50px] h-[50px] rounded-full"
                  source={{ uri: profile_img }}
                />
              </View>
            );
          })}
          <View className="gap-y-10">
            <View className="gap-y-5">
              <Text className="text-lg font-medium text-custom-lightgrey">
                Categories
              </Text>
              <ScrollView
                nestedScrollEnabled={true}
                contentContainerStyle={{ gap: 20 }}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                {categories.map((category, index) => {
                  return (
                    <CategoryItem
                      key={index}
                      name={category.name}
                      id={category.id}
                    />
                  );
                })}
              </ScrollView>
            </View>
            <View>
              <Text className="text-lg font-medium text-custom-lightgrey">
                Movies
              </Text>
              <View className="flex-row flex-wrap gap-y-5">
                {movies.map((movie) => {
                  const {
                    original_title,
                    id,
                    backdrop_path,
                    release_date,
                    vote_average,
                  } = movie;
                  return (
                    <View className="w-[50%] h-[200px] p-2">
                      <ItemCard
                        type="movie"
                        vote={vote_average}
                        key={id}
                        id={id}
                        title={original_title}
                        img={backdrop_path}
                        date={release_date}
                        userID={userID}
                      />
                    </View>
                  );
                })}
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}
