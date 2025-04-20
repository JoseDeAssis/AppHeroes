import { FlatList, StyleSheet, View } from "react-native";
import CharacterItem from "./CharacterItem";
import LoadingOverlay from "../UI/LoadingOverlay";

const CharacterList = ({
	charactersList,
	loadMoreCharacters,
	isLoading,
	hasMore,
}) => {
	const renderCharacterItem = (itemData) => {
		return <CharacterItem character={itemData.item} />;
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
			/>
		</View>
	);
};

export default CharacterList;
