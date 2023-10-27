import { View, Text, SafeAreaView, TextInput, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";

export default function SignUp({ navigation }) {
  const [token, setToken] = useState();
  const handleSwitch = () => {
    navigation.navigate("Signin");
  };
  useEffect(() => {
    const options = {
      method: "GET",
      url: "https://api.themoviedb.org/3/authentication/token/new",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYTczZmM1ZTExNmU0ZjU4OTllNzExMjBmYTIwZDRkZSIsInN1YiI6IjYyYzE4YWU1MjJlNDgwMGZhOGYxZWMxMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lv9_uKWjg2nv5o_oszOERscOnwPuLLxgdExnkxrpoTI",
      },
    };
    axios
      .request(options)
      .then(function (response) {
        setToken(response.data.request_token);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  const handleSignup = () => {
    const options = {
      method: "POST",
      url: "https://api.themoviedb.org/3/authentication/token/validate_with_login",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYTczZmM1ZTExNmU0ZjU4OTllNzExMjBmYTIwZDRkZSIsInN1YiI6IjYyYzE4YWU1MjJlNDgwMGZhOGYxZWMxMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lv9_uKWjg2nv5o_oszOERscOnwPuLLxgdExnkxrpoTI",
      },
      data: {
        username: "johnny_appleseed",
        password: "test123",
        request_token: token,
      },
    };
    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  return (
    <LinearGradient style={{ flex: 1 }} colors={["#F10E49", "#13171B"]}>
      <SafeAreaView className="gap-y-20">
        <View>
          <Text className="text-4xl font-medium text-custom-lightgrey text-center mt-32">
            LOGO
          </Text>
        </View>
        <View>
          <View className="gap-y-10">
            <View>
              <Text className="text-3xl text-custom-lightgrey text-center">
                Kaydol
              </Text>
            </View>
            <View className="w-[80%] gap-y-6 mx-auto">
              <TextInput
                className="bg-custom-darkblue p-3 pb-4 text-lg rounded-lg"
                placeholder="Email"
                placeholderTextColor="#D9D9D9"
              />
              <TextInput
                className="bg-custom-darkblue p-3 pb-4 text-lg rounded-lg"
                placeholder="Şifre"
                placeholderTextColor="#D9D9D9"
              />
              <Pressable className="bg-[#F10E49] py-3 rounded-lg">
                <Text className="text-xl text-custom-lightgrey text-center">
                  Kaydol
                </Text>
              </Pressable>
              <View>
                <Text className="text-center text-custom-lightgrey">
                  Hesabınız var mı ?{" "}
                  <Text onPress={handleSwitch} className="text-custom-green">
                    Giriş Yapın
                  </Text>
                </Text>
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}
