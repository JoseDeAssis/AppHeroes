import { FlatList, View } from "react-native";
import CharacterItem from "./CharacterItem";
import LoadingOverlay from "../UI/LoadingOverlay";

const CharacterList = ({
	charactersList,
	loadMoreCharacters = () => {},
	isLoading = false,
	hasMore = false,
}) => {
	const renderCharacterItem = (itemData) => {
		const character = itemData.item;
		return (
			<CharacterItem
				id={character.id}
				name={character.name}
				description={character.description}
				thumbnail={{
					path: character.thumbnail.path,
					extension: character.thumbnail.extension,
				}}
			/>
		);
	};

	return (
		<View>
			<FlatList
				data={charactersList}
				keyExtractor={(item) => item.id}
				renderItem={renderCharacterItem}
				onEndReached={loadMoreCharacters}
				onEndReachedThreshold={0.3}
				ListFooterComponent={isLoading && hasMore && <LoadingOverlay />}
				keyboardDismissMode="on-drag"
			/>
		</View>
	);
};

export default CharacterList;
