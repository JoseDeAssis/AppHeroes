import { ActivityIndicator, StyleSheet, View } from "react-native";
import { GlobalStyles } from "../../styles/theme";

const LoadingOverlay = () => {
	return (
		<View style={styles.container}>
			<ActivityIndicator size="large" color="black" />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 24,
	},
});

export default LoadingOverlay;
