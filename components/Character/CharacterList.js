import { FlatList, View } from "react-native";
import CharacterItem from "./CharacterItem";
import { useCallback, useEffect, useState } from "react";
import { getCharacters } from "../../services/marvelService";
import LoadingOverlay from "../UI/LoadingOverlay";

const CharacterList = () => {
	const [charactersList, setCharactersList] = useState([]);
	const [offset, setOffset] = useState(0);
	const [isLoading, setIsLoading] = useState(false);
	const [hasMore, setHasMore] = useState(true);
	const [error, setError] = useState();

	const renderCharacterItem = (itemData) => {
		return <CharacterItem character={itemData.item} />;
	};

	const loadMoreCharacters = useCallback(async () => {
		if (isLoading || !hasMore) return;

		setIsLoading(true);
		try {
			const loadCharacters = await getCharacters(offset);

			if (loadCharacters.length === 0) {
				setHasMore(false);
				return;
			}

			setCharactersList((prevCharacterList) => {
				const existingIds = charactersList.map((character) => character.id);
				const newCharacters = loadCharacters.filter(
					(character) => !existingIds.includes(character.id)
				);
				return [...prevCharacterList, ...newCharacters];
			});
			setOffset((prevOffset) => prevOffset + charactersList.length);
		} catch (error) {
			setError(error);
		} finally {
			setIsLoading(false);
		}
	}, [isLoading, offset, hasMore]);

	useEffect(() => {
		loadMoreCharacters();
	}, []);

	return (
		<View>
			<FlatList
				data={charactersList}
				keyExtractor={(item) => item.id}
				renderItem={renderCharacterItem}
				onEndReached={loadMoreCharacters}
				onEndReachedThreshold={0.3}
				ListFooterComponent={isLoading && hasMore && <LoadingOverlay />}
			/>
		</View>
	);
};

export default CharacterList;
