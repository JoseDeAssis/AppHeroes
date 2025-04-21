import { Alert, Share, StyleSheet, Text, View } from "react-native";
import { useCallback, useLayoutEffect, useState } from "react";
import { GlobalStyles } from "../styles/theme";
import { useNavigation } from "@react-navigation/native";
import { useFavorites } from "../contexts/FavoriteContext";
import IconButton from "../components/UI/IconButton";
import CharacterList from "../components/Character/CharacterList";
import useThrottle from "../hooks/useThrottle";

const FavoritesScreen = () => {
	const { favorites } = useFavorites();
  const [isSharing, setIsSharing] = useState(false);
	const navigation = useNavigation();

	const createShareMessage = () => {
		let message = "My favorite characters from Marvel:\n\n";
    
		favorites.forEach((character) => {
			message += `Name: ${character.name}\n`;
			message += `Description: ${
				character.description || "no description available"
			}\n`;
			message += `Thumbnail: ${character.thumbnail.path}.${character.thumbnail.extension}\n`;
			message += "-------------\n";
		});

		message += "\nShared by Marvel Characters App! ;)";

		return message;
	};

	const onShare = useCallback(async () => {
		if(isSharing) return;

    setIsSharing(true);

    try {
			await Share.share({
				title: "My favorite characters from Marvel",
				message: createShareMessage(),
			});
		} catch (error) {
			Alert.alert(
				"Share failed",
				"Failed to share your characters, try again later!"
			);
		} finally {
      setIsSharing(false);
    }
	}, [isSharing]);

  const throttledValue = useThrottle(onShare);

	useLayoutEffect(() => {
		navigation.setOptions({
			headerRight: () =>
				favorites.length > 0 && (
					<View style={{ marginRight: 16 }}>
						<IconButton
							title="Share"
							icon="share"
							size={24}
							color={GlobalStyles.colors.white}
							onClick={throttledValue}
						/>
					</View>
				),
		});
	}, [navigation, throttledValue]);

	return (
		<View style={styles.container}>
			{favorites.length === 0 ? (
				<View style={styles.noFavoritesContainer}>
					<Text style={styles.noFavoritesText}>No favorite characters yet</Text>
				</View>
			) : (
				<CharacterList charactersList={favorites} />
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingBottom: 65,
		backgroundColor: GlobalStyles.colors.gray500,
	},
	noFavoritesContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	noFavoritesText: {
		fontWeight: "bold",
		fontSize: 28,
		color: GlobalStyles.colors.primary700,
		textAlign: "center",
	},
});

export default FavoritesScreen;
