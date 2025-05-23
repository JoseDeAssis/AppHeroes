import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StatusBar } from "expo-status-bar";
import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import HomeScreen from "./screens/HomeScreen";
import FavoritesScreen from "./screens/FavoritesScreen";
import CharacterDetailsScreen from "./screens/CharacterDetailsScreen";
import { GlobalStyles } from "./styles/theme";
import { FavoritesContextProvider } from "./contexts/FavoriteContext";

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

const BottomTabsNavigation = () => {
	return (
		<BottomTabs.Navigator
			screenOptions={({ navigation }) => ({
				headerStyle: { backgroundColor: GlobalStyles.colors.primary700 },
				headerTintColor: GlobalStyles.colors.accent500,
				tabBarStyle: { backgroundColor: GlobalStyles.colors.primary700 },
				tabBarActiveTintColor: GlobalStyles.colors.accent500,
				tabBarInactiveTintColor: GlobalStyles.colors.white,
			})}
		>
			<BottomTabs.Screen
				name="Home"
				component={HomeScreen}
				options={{
					title: "Marvel Characters",
					tabBarLabel: "Home",
					tabBarIcon: ({ color, size }) => (
						<MaterialIcons name="home" size={size} color={color} />
					),
				}}
			/>
			<BottomTabs.Screen
				name="Favorites"
				component={FavoritesScreen}
				options={{
					title: "Favorites",
					tabBarLabel: "Favorites",
					tabBarIcon: ({ color, size }) => (
						<MaterialIcons name="favorite" size={size} color={color} />
					),
				}}
			/>
		</BottomTabs.Navigator>
	);
};

export default function App() {
	return (
		<>
			<StatusBar style="light" />
			<FavoritesContextProvider>
				<NavigationContainer>
					<Stack.Navigator
						screenOptions={{
							headerStyle: { backgroundColor: GlobalStyles.colors.primary700 },
							headerTintColor: GlobalStyles.colors.accent500,
						}}
					>
						<Stack.Screen
							name="BottomTabsNavigation"
							component={BottomTabsNavigation}
							options={{ headerShown: false }}
						/>
						<Stack.Screen
							name="CharacterDetails"
							component={CharacterDetailsScreen}
						/>
					</Stack.Navigator>
				</NavigationContainer>
			</FavoritesContextProvider>
		</>
	);
}

const styles = StyleSheet.create({});
