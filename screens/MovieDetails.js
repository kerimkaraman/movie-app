import { View, Text, StyleSheet, ImageBackground } from "react-native";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";

export default function MovieDetails({ route }) {
  const { id, type } = route.params;
  const [data, setData] = useState([]);
  useEffect(() => {
    if (type === "movie") {
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
          setData(response.data.results);
        })
        .catch(function (error) {
          console.error(error);
        });
    } else {
      const options = {
        method: "GET",
        url: `https://api.themoviedb.org/3/tv/${id}?language=en-US`,
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYTczZmM1ZTExNmU0ZjU4OTllNzExMjBmYTIwZDRkZSIsInN1YiI6IjYyYzE4YWU1MjJlNDgwMGZhOGYxZWMxMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lv9_uKWjg2nv5o_oszOERscOnwPuLLxgdExnkxrpoTI",
        },
      };

      axios
        .request(options)
        .then(function (response) {
          setData(response.data.results);
        })
        .catch(function (error) {
          console.error(error);
        });
    }
  }, []);
  return (
    <LinearGradient style={{ flex: 1 }} colors={["#F10E49", "#13171B"]}>
      <ImageBackground source={{}}></ImageBackground>
    </LinearGradient>
  );
}
