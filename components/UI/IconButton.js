import { Pressable, StyleSheet, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const IconButton = ({ onClick, icon, size, color, disabled = false }) => {
	return (
		<Pressable onPress={onClick} style={(pressed) => pressed && styles.pressed} disabled={disabled}>
			<View>
				<MaterialIcons name={icon} size={size} color={color} />
			</View>
		</Pressable>
	);
};

const styles = StyleSheet.create({
	buttonContainer: {
		borderRadius: 24,
		padding: 6,
		marginHorizontal: 8,
		marginVertical: 2,
	},
	pressed: {
		opacity: 0.7,
	},
});

export default IconButton;
