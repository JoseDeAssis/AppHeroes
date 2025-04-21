import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";
import { Alert } from "react-native";

export const FavoritesContext = createContext();

export const FavoritesContextProvider = ({ children }) => {
	const [favorites, setFavorites] = useState([]);

	useEffect(() => {
		const loadFavorites = async () => {
			try {
				const storedFavorites = await AsyncStorage.getItem(
					"@MarvelCharactersApp:favorites"
				);
				if (storedFavorites) setFavorites(JSON.parse(storedFavorites));
			} catch (error) {
				Alert.alert("Loading Error", "Failed to load favorite characters. Try again later!");
				console.log(error);
			}
		};

		loadFavorites();
	}, []);

	useEffect(() => {
		const saveFavorites = async () => {
			try {
				await AsyncStorage.setItem(
					"@MarvelCharactersApp:favorites",
					JSON.stringify(favorites)
				);
			} catch (error) {
				Alert.alert("Save Error", "Failed to save favorite character. Try again later!");
				console.log(error);
			}
		};

		saveFavorites();
	}, [favorites]);

	const addFavorite = (character) => {
		setFavorites((prevFavorites) => [...prevFavorites, character]);
	};

	const removeFavorite = (id) => {
		setFavorites((prevFavorites) =>
			prevFavorites.filter((character) => character.id !== id)
		);
	};

	const isFavorite = (id) => {
		return favorites.some((character) => character.id === id);
	};

	const value = {
		favorites: favorites,
		addFavorite: addFavorite,
		removeFavorite: removeFavorite,
		isFavorite: isFavorite,
	};

	return (
		<FavoritesContext.Provider value={value}>
			{children}
		</FavoritesContext.Provider>
	);
};

export const useFavorites = () => useContext(FavoritesContext);
