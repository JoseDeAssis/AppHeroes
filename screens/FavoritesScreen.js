import { StyleSheet, Text, View } from "react-native";
import { useFavorites } from "../contexts/FavoriteContext";
import CharacterList from "../components/Character/CharacterList";
import { GlobalStyles } from "../styles/theme";

const FavoritesScreen = () => {
  const { favorites } = useFavorites();
  console.log(favorites);
  
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
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 65,
    backgroundColor: GlobalStyles.colors.gray500,
  },
  noFavoritesContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  noFavoritesText: {
    fontWeight: "bold",
    fontSize: 28,
    color: GlobalStyles.colors.primary700,
    textAlign: "center",
  }
}) 

export default FavoritesScreen;