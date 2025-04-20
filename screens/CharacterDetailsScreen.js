import { useLayoutEffect } from "react";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../styles/theme";
import { Image, ScrollView, StyleSheet, Text } from "react-native";
import { getThumbnail } from "../utils/helpers";

const CharacterDetailsScreen = ({ route, navigation }) => {
	const character = route.params.character;

	useLayoutEffect(() => {
		navigation.setOptions({
			title: "Character Details",
			headerRight: () => (
				<IconButton
					title="Favorite"
					icon="favorite-outline"
          size={24}
					color={GlobalStyles.colors.white}
					onClick={() => console.log("Favoritado")}
				/>
			),
		});
	}, [navigation, character]);

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: getThumbnail(character) }} style={styles.image} />
      <Text style={styles.title}>{character.name}</Text>
      <Text style={styles.description}>{character.description}</Text>
    </ScrollView>
  )

};

const styles = StyleSheet.create({
  container: {
    backgroundColor: GlobalStyles.colors.gray700
  },
  image: {
    width: "100%",
    height: 350
  },
  title: {
    fontWeight: "bold",
    fontSize: 28,
    margin: 8,
    color: GlobalStyles.colors.accent500
  },
  description: {
    marginHorizontal: 8,
    fontSize: 18,
    color: GlobalStyles.colors.white
  }
})

export default CharacterDetailsScreen;
