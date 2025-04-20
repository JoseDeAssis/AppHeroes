import { FlatList, View } from "react-native";
import CharacterItem from "./CharacterItem";

const CharacterList = ({ characters }) => {
	const renderCharacterItem = (itemData) => {
		const character = {
      id: itemData.item.id,
      name: itemData.item.name,
      thumbnail: itemData.item.thumbnail.path + "." + itemData.item.thumbnail.extension
    };
		return <CharacterItem {...character} />;
	};

	return (
		<View>
			<FlatList
				data={characters}
				keyExtractor={(item) => item.id}
				renderItem={renderCharacterItem}
			/>
		</View>
	);
};

export default CharacterList;
