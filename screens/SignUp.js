import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  updateEmail,
  updateNameSurname,
  updatePassword,
} from "../store/signupSlice";
import { AUTH, DATABASE } from "../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, set } from "firebase/database";
import "react-native-get-random-values";
import { v4 as uuid } from "uuid";

export default function SignUp({ navigation }) {
  const PFPARR = [
    "https://cdn.pixabay.com/photo/2013/07/13/10/07/man-156584_1280.png",
    "https://cdn.pixabay.com/photo/2016/06/15/16/16/man-1459246_1280.png",
    "https://cdn.pixabay.com/photo/2016/05/30/14/23/detective-1424831_1280.png",
    "https://cdn.pixabay.com/photo/2019/07/26/20/52/man-4365597_1280.png",
    "https://cdn.pixabay.com/photo/2013/07/13/01/07/rock-climbing-155134_1280.png",
  ];
  const getRandom = Math.floor(Math.random() * 4);
  const userID = uuid();
  const [token, setToken] = useState();
  const dispatch = useDispatch();
  const { email, password, namesurname } = useSelector((state) => state.signup);
  const handleSwitch = () => {
    navigation.navigate("Signin");
  };

  const handleSignup = () => {
    const auth = AUTH;
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
    const db = DATABASE;
    set(ref(db, "users/" + userID), {
      userID: userID,
      profile_img: PFPARR[getRandom],
      namesurname: namesurname,
      email: email,
      password: password,
      favorites: {},
    });
    navigation.navigate("Signin");
  };

  return (
    <LinearGradient style={{ flex: 1 }} colors={["#F10E49", "#13171B"]}>
      <SafeAreaView className="gap-y-20">
        <KeyboardAvoidingView>
          <View>
            <Text className="text-4xl font-medium text-custom-lightgrey text-center mt-32">
              LOGO
            </Text>
          </View>
        </KeyboardAvoidingView>
        <View>
          <View className="gap-y-10">
            <View>
              <Text className="text-3xl text-custom-lightgrey text-center">
                Kaydol
              </Text>
            </View>
            <View className="w-[80%] gap-y-6 mx-auto">
              <TextInput
                onChangeText={(val) => dispatch(updateNameSurname(val))}
                autoCapitalize="none"
                className="bg-custom-darkblue p-3 pb-4 text-lg rounded-lg text-custom-lightgrey"
                placeholder="Ad Soyad"
                placeholderTextColor="#D9D9D9"
              />
              <TextInput
                onChangeText={(val) => dispatch(updateEmail(val))}
                autoCapitalize="none"
                className="bg-custom-darkblue p-3 pb-4 text-lg rounded-lg text-custom-lightgrey"
                placeholder="Email"
                placeholderTextColor="#D9D9D9"
              />
              <TextInput
                onChangeText={(val) => dispatch(updatePassword(val))}
                secureTextEntry={true}
                className="bg-custom-darkblue p-3 pb-4 text-lg rounded-lg text-custom-lightgrey"
                placeholder="Şifre"
                placeholderTextColor="#D9D9D9"
              />
              <Pressable
                onPress={handleSignup}
                className="bg-[#F10E49] py-3 rounded-lg"
              >
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
