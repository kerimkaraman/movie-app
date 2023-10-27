import { View, Text, SafeAreaView, TextInput, Pressable } from "react-native";
import React, { useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";

export default function SignIn({ navigation }) {
  const handleSwitch = () => {
    navigation.navigate("Signup");
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
                Giriş Yap
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
                  Giriş Yap
                </Text>
              </Pressable>
              <View>
                <Text className="text-center text-custom-lightgrey">
                  Hesabınız yok mu ?{" "}
                  <Text onPress={handleSwitch} className="text-custom-green">
                    Kaydol
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
