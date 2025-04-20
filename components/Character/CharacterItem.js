import {
	Image,
	Platform,
	Pressable,
	StyleSheet,
	Text,
	View,
} from "react-native";
import IconButton from "../UI/IconButton";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { getThumbnail } from "../../utils/helpers";

const CharacterItem = ({ character }) => {
	const navigation = useNavigation();
	const [isFavorite, setIsFavorite] = useState(false);

	const characterPressHandler = () => {
		navigation.navigate("CharacterDetails", {
			character: character,
		});
	};

	const favoriteHandler = () => {
		setIsFavorite((isFavorite) => !isFavorite);
	};

	return (
		<View style={styles.outerContainer}>
			<Pressable
				style={({ pressed }) => pressed && styles.pressed}
				onPress={characterPressHandler}
				android_ripple={{ color: "#ccc" }}
			>
				<View style={styles.characterItem}>
					<Image source={{ uri: getThumbnail(character) }} style={styles.avatar} />
					<Text style={styles.text}>{character.name}</Text>
					<View style={styles.iconButtonContainer}>
						<IconButton
							icon={isFavorite ? "favorite" : "favorite-outline"}
							size={24}
							color="black"
							onClick={favoriteHandler}
						/>
					</View>
				</View>
			</Pressable>
		</View>
	);
};

const styles = StyleSheet.create({
	outerContainer: {
		backgroundColor: "#ccc",
		padding: 4,
	},
	avatar: {
		width: 50,
		height: 50,
		borderRadius: 25,
		borderColor: "black",
		borderWidth: 1,
	},
	characterItem: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		padding: 16,
		backgroundColor: "white",
		borderRadius: 8,
		elevation: 4,
		...Platform.select({
			ios: {
				shadowColor: "black",
				shadowOpacity: 0.25,
				shadowOffset: { width: 0, height: 2 },
				shadowRadius: 8,
			},
			android: {
				elevation: 4,
				overflow: "hidden",
			},
		}),
	},
	text: {
		flex: 1,
		marginHorizontal: 20,
		fontWeight: "bold",
		fontSize: 20,
		verticalAlign: "middle",
	},
	iconButtonContainer: {
		marginLeft: "auto",
	},
	pressed: {
		opacity: 0.75,
		backgroundColor: "#f0f0f0",
	},
});

export default CharacterItem;
