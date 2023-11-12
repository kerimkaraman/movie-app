import { View, Text, SafeAreaView, Image, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { DATABASE } from "../firebaseConfig";
import { ref, onValue } from "firebase/database";
import { useSelector } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
import ItemCard from "../components/ItemCard";
import WaitScreen from "./WaitScreen";

export default function Profile() {
  const { email } = useSelector((state) => state.signup);
  const [user, setUser] = useState();
  const [userID, setUserID] = useState();
  const [favs, setFavs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  function getData() {
    const db = DATABASE;
    const userRef = ref(db, "users/");
    onValue(userRef, (snapshot) => {
      const data = snapshot.val();
      let obj = Object.values(data);
      obj = obj.filter((ob) => ob.email == email);
      setUser(obj);

      obj.map((ob) => {
        const userId = ob.userID; // Bu satırı ekleyerek userId'yi alın
        setUserID(userId);
        const favRef = ref(db, "users/" + userId + "/favorites");
        onValue(favRef, (snapshot) => {
          const data = snapshot.val();
          setFavs(data);
          setIsLoading(false);
        });
      });
    });
  }
  useEffect(() => {
    getData();
  }, []);
  return isLoading ? (
    <WaitScreen />
  ) : (
    <LinearGradient style={{ flex: 1 }} colors={["#F10E49", "#13171B"]}>
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
            </View>
          );
        })}
        <View>
          <Text className="text-xl text-white pl-5">Favorites</Text>
          <View>
            <ScrollView
              contentContainerStyle={{ flexDirection: "row" }}
              className="flex-row flex-wrap gap-y-6"
            >
              {Object.values(favs).map((fav, index) => {
                const { title, id, backdrop_path, release_date, vote_average } =
                  fav;
                return (
                  <View className="w-[150px] h-[200px]">
                    <ItemCard
                      type="movie"
                      vote={vote_average}
                      key={id}
                      id={id}
                      title={title}
                      img={backdrop_path}
                      date={release_date}
                    />
                  </View>
                );
              })}
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}
