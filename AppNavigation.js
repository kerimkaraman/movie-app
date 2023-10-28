import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignUp from "./screens/SignUp";
import SignIn from "./screens/SignIn";
import Homepage from "./screens/Homepage";
import MovieDetails from "./screens/MovieDetails";

export default function AppNavigation() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="Signup"
          component={SignUp}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Signin"
          component={SignIn}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Homepage"
          component={Homepage}
        />
        <Stack.Screen
          name="MovieDetail"
          options={{ headerShown: false }}
          component={MovieDetails}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
