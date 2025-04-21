import { Pressable, StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../styles/theme";

const PrimaryButton = ({ children, onClick }) => {
	return (
		<View style={styles.buttonOuterContainer}>
			<Pressable
				onPress={onClick}
				style={({ pressed }) =>
					pressed
						? [styles.buttonInnerContainer, styles.pressed]
						: styles.buttonInnerContainer
				}
				android_ripple={{ color: GlobalStyles.colors.gray500 }}
			>
				<Text style={styles.buttonText}>{children}</Text>
			</Pressable>
		</View>
	);
};

const styles = StyleSheet.create({
	buttonOuterContainer: {
		borderRadius: 28,
		margin: 4,
		overflow: "hidden",
	},
	buttonInnerContainer: {
		backgroundColor: GlobalStyles.colors.primary700,
		paddingVertical: 8,
		paddingHorizontal: 16,
		elevation: 2,
	},
	buttonText: {
		color: GlobalStyles.colors.accent100,
		textAlign: "center",
	},
	pressed: {
		opacity: 0.75,
	},
});

export default PrimaryButton;
