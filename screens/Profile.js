import { View, Text, SafeAreaView, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { DATABASE } from "../firebaseConfig";
import { ref, onValue } from "firebase/database";
import { useSelector } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";

export default function Profile() {
  const { email } = useSelector((state) => state.signup);
  const [user, setUser] = useState([]);
  useEffect(() => {
    const db = DATABASE;
    const userRef = ref(db, "users/");
    onValue(userRef, (snapshot) => {
      const data = snapshot.val();
      let obj = Object.values(data);
      obj = obj.filter((ob) => ob.email == email);
      setUser(obj);
    });
  }, []);
  return (
    <LinearGradient style={{ flex: 1 }} colors={["#F10E49", "#13171B"]}>
      {console.log(user)}
      <SafeAreaView>
        {user.map((userD, index) => {
          const { namesurname, profile_img } = userD;
          return (
            <View key={index} className="mx-10 mt-5">
              <View className="gap-y-5 items-center">
                <Image
                  className="w-[100px] object-fill h-[100px] rounded-full"
                  source={{ uri: profile_img }}
                />
                <Text className="text-custom-lightgrey text-xl font-medium">
                  {namesurname}
                </Text>
              </View>
              <View>
                <Text>Favorites</Text>
                <View>
                  <Text>bu alanda favoriler listelenecek</Text>
                </View>
              </View>
            </View>
          );
        })}
      </SafeAreaView>
    </LinearGradient>
  );
}
