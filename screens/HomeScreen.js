import { useEffect, useState } from "react";
import { FlatList, Text } from "react-native";
import { getCharacters } from "../services/marvelService";
import CharacterList from "../components/Character/CharacterList";
import LoadingOverlay from "../components/UI/LoadingOverlay";

const HomeScreen = () => {
	const [charactersList, setCharactersList] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState();

	useEffect(() => {
		const loadCharacters = async () => {
			setIsLoading(true);
			try {
				const characters = await getCharacters();
				setCharactersList((prevCharacterList) => {
          const existingIds = charactersList.map(character => character.id); 
          const newCharacters = characters.filter((character) => !existingIds.includes(character.id));
          return [...prevCharacterList, ...newCharacters]
        });
			} catch (error) {
				setError(error);
			} finally {
        setIsLoading(false);
      }
		};

		loadCharacters();
	}, []);

	if (isLoading) return <LoadingOverlay />;

	return <CharacterList characters={charactersList} />;
};

export default HomeScreen;
