import { useEffect, useState } from "react";
import { FlatList, Text } from "react-native";
import { getCharacters } from "../services/marvelService";
import CharacterList from "../components/Character/CharacterList";
import LoadingOverlay from "../components/UI/LoadingOverlay";

const HomeScreen = () => {

	return <CharacterList />;
};

export default HomeScreen;
