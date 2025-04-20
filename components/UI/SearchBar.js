import {
	Animated,
	Platform,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { GlobalStyles } from "../../styles/theme";
import { useEffect, useRef, useState } from "react";

const SearchBar = ({ onSearch, onCancel }) => {
	const [query, setQuery] = useState("");
	const [isFocused, setIsFocused] = useState(false);
	const widthAnim = useState(new Animated.Value(100))[0];
  const textInputRef = useRef(null)

	useEffect(() => {
		Animated.timing(widthAnim, {
			toValue: isFocused ? 80 : 100,
			duration: 200,
			useNativeDriver: false,
		}).start();
	}, [isFocused]);

	const inputChangedHandler = (text) => {
		setQuery(text);
		onSearch(text);
	};

	const cancelHandler = () => {
		setQuery("");
		setIsFocused(false);
    textInputRef.current?.blur();
		onCancel();
	};

	return (
		<View style={styles.container}>
			<Animated.View
				style={[
					styles.searchContainer,
					{
						width: widthAnim.interpolate({
							inputRange: [80, 100],
							outputRange: ["80%", "100%"],
						}),
					},
				]}
			>
				<MaterialIcons
					name="search"
					size={24}
					color={GlobalStyles.colors.gray700}
          style={styles.searchIcon}
				/>
				<TextInput
					placeholder="Search Character"
					placeholderTextColor={GlobalStyles.colors.gray100}
					value={query}
					onChangeText={inputChangedHandler}
					onFocus={() => setIsFocused(true)}
					onBlur={() => !query && setIsFocused(false)}
					returnKeyType="search"
          style={styles.input}
          ref={textInputRef}
				/>
			</Animated.View>
			{isFocused && (
				<TouchableOpacity onPress={cancelHandler} style={styles.cancelButton}>
					<Text style={styles.cancelText}>Cancel</Text>
				</TouchableOpacity>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: 15,
		paddingVertical: 10,
		backgroundColor: GlobalStyles.colors.gray500,
	},
	searchContainer: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: GlobalStyles.colors.white,
		borderRadius: 25,
		paddingHorizontal: 15,
		height: 45,
		...Platform.select({
			ios: {
				shadowColor: GlobalStyles.colors.black,
				shadowOffset: { width: 0, height: 2 },
				shadowOpacity: 0.1,
				shadowRadius: 4,
			},
			android: {
				elevation: 4,
			},
		}),
	},
	searchIcon: {
		marginRight: 10,
	},
	input: {
		flex: 1,
		fontSize: 16,
		color: GlobalStyles.colors.gray900,
		paddingVertical: 0,
	},
	cancelButton: {
		marginLeft: 10,
	},
	cancelText: {
		color: GlobalStyles.colors.lightblue500,
		fontSize: 16,
	},
});

export default SearchBar;
