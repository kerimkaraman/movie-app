import { View, Text, ScrollView, SafeAreaView } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import ItemCard from "../components/ItemCard";

export default function CategoryDetails({ route }) {
  const { name } = route.params;
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const options = {
      method: "GET",
      url: `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${name}`,
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYTczZmM1ZTExNmU0ZjU4OTllNzExMjBmYTIwZDRkZSIsInN1YiI6IjYyYzE4YWU1MjJlNDgwMGZhOGYxZWMxMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lv9_uKWjg2nv5o_oszOERscOnwPuLLxgdExnkxrpoTI",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        setMovies(response.data.results);
        setIsLoading(false);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);
  return isLoading ? null : (
    <LinearGradient style={{ flex: 1 }} colors={["#F10E49", "#13171B"]}>
      <SafeAreaView>
        <ScrollView>
          <View className="flex-row flex-wrap gap-y-6">
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
                  />
                </View>
              );
            })}
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}
