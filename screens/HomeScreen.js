import { useCallback, useEffect, useState } from "react";
import {
	getCharacters,
	getCharactersNameStartsWith,
} from "../services/marvelService";
import CharacterList from "../components/Character/CharacterList";
import SearchBar from "../components/UI/SearchBar";
import { StyleSheet, View } from "react-native";
import useDebounce from "../hooks/useDebounce";
import ErrorScreen from "../components/UI/ErrorScreen";

const HomeScreen = () => {
	const [charactersList, setCharactersList] = useState([]);
	const [search, setSearch] = useState("");
	const debouncedSearch = useDebounce(search);
	const [offset, setOffset] = useState(0);
	const [isLoading, setIsLoading] = useState(false);
	const [hasMore, setHasMore] = useState(true);
	const [error, setError] = useState();

	const loadMoreCharacters = useCallback(async () => {
		if (isLoading || !hasMore) return;

		setIsLoading(true);
		setError(null);
		
		try {
			const loadCharacters =
				debouncedSearch.trim().length === 0
					? await getCharacters(offset)
					: await getCharactersNameStartsWith(debouncedSearch, offset);

			if (loadCharacters.length === 0) {
				setHasMore(false);
				return;
			}

			setCharactersList((prevCharacterList) => {
				const existingIds = prevCharacterList.map((character) => character.id);
				const newCharacters = loadCharacters.filter(
					(character) => !existingIds.includes(character.id)
				);
				return [...prevCharacterList, ...newCharacters];
			});
			setOffset((prevOffset) => prevOffset + loadCharacters.length);
		} catch (error) {
			setError(error);
		} finally {
			setIsLoading(false);
		}
	}, [isLoading, offset, hasMore, debouncedSearch]);

	useEffect(() => {
		setCharactersList([]);
		setHasMore(true);
		setError(null);
		loadMoreCharacters();
	}, [debouncedSearch]);

	const searchHandler = (text) => {
		setSearch(text);
		setOffset(0);
	};

	const cancelHandler = () => {
		setSearch("");
		setHasMore(true);
		setOffset(0);
	};

	if (error) return <ErrorScreen error={error} onRetry={loadMoreCharacters} />;

	return (
		<View style={styles.container}>
			<SearchBar onSearch={searchHandler} onCancel={cancelHandler} />
			<CharacterList
				charactersList={charactersList}
				loadMoreCharacters={loadMoreCharacters}
				isLoading={isLoading}
				hasMore={hasMore}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingBottom: 65,
	},
});

export default HomeScreen;
