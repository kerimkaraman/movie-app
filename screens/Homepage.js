import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Movies from "./Movies";
import { Ionicons } from "@expo/vector-icons";
import Profile from "./Profile";

export default function Homepage() {
  const Tab = createMaterialBottomTabNavigator();

  return (
    <Tab.Navigator
      initialRouteName="Movies"
      sceneAnimationType="shifting"
      shifting={true}
      activeColor="#f10e49"
      inactiveColor="#d9d9d9"
      barStyle={{
        backgroundColor: "#000",
      }}
    >
      <Tab.Screen
        options={{
          tabBarLabel: "Home",
          tabBarIcon: () => <Ionicons name="home" color="#F10E49" size={24} />,
        }}
        name="Movies"
        component={Movies}
      />
      <Tab.Screen
        name="Profile"
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: () => (
            <Ionicons name="person" color="#F10E49" size={24} />
          ),
        }}
        component={Profile}
      />
    </Tab.Navigator>
  );
}
