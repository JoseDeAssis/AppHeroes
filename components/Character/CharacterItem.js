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
import { getThumbnail } from "../../utils/helpers";
import { useFavorites } from "../../contexts/FavoriteContext";

const CharacterItem = ({ id, name, description, thumbnail }) => {
	const navigation = useNavigation();
	const { isFavorite, addFavorite, removeFavorite } = useFavorites();

	const characterPressHandler = () => {
		navigation.navigate("CharacterDetails", {
			character: { id, name, description, thumbnail },
		});
	};

	const favoriteHandler = () => {
		if (isFavorite(id)) {
			removeFavorite(id);
		} else {
			addFavorite({ id, name, description, thumbnail });
		}
	};

	return (
		<View style={styles.outerContainer}>
			<Pressable
				style={({ pressed }) => pressed && styles.pressed}
				onPress={characterPressHandler}
				android_ripple={{ color: "#ccc" }}
			>
				<View style={styles.characterItem}>
					<Image source={{ uri: getThumbnail(thumbnail) }} style={styles.avatar} />
					<Text style={styles.text}>{name}</Text>
					<View style={styles.iconButtonContainer}>
						<IconButton
							icon={isFavorite(id) ? "favorite" : "favorite-outline"}
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
