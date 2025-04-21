import { Button, ImageBackground, StyleSheet, Text, View } from "react-native";
import { randomizeNumber } from "../../utils/helpers";
import { LinearGradient } from "expo-linear-gradient";
import { GlobalStyles } from "../../styles/theme";
import { ErrorMessage } from "../../utils/constants";
import PrimaryButton from "./PrimaryButton";

const ErrorScreen = ({ error, onRetry }) => {
	const errorScreenDetails = ErrorMessage[randomizeNumber(0, 3)];

	return (
		<LinearGradient
			colors={[GlobalStyles.colors.gray700, GlobalStyles.colors.gray500]}
			style={styles.rootScreen}
		>
			<ImageBackground
				source={errorScreenDetails.image}
				resizeMode="cover"
				style={styles.rootScreen}
				imageStyle={styles.backgroundImage}
			>
				<View style={styles.errorContainer}>
					<Text style={styles.title}>{errorScreenDetails.message}</Text>
					<Text style={styles.message}>
						Something went wrong, press the retry button to reload the list or
						try again later.
					</Text>
					{error?.status && (
						<Text style={styles.detail}>Código: {error.status}</Text>
					)}
					{onRetry && <PrimaryButton onClick={onRetry}>Retry?</PrimaryButton>}
				</View>
			</ImageBackground>
		</LinearGradient>
	);
};

const styles = StyleSheet.create({
	rootScreen: {
		flex: 1,
	},
	backgroundImage: {
		opacity: 0.15,
	},
	errorContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 20,
	},
	title: {
		fontSize: 24,
		textAlign: "center",
		fontWeight: "bold",
		color: GlobalStyles.colors.black,
		marginBottom: 10,
	},
	message: {
		fontSize: 18,
		textAlign: "center",
		color: GlobalStyles.colors.gray900,
		marginBottom: 20,
		paddingHorizontal: 20,
	},
	detail: {
		fontSize: 14,
		color: GlobalStyles.colors.gray900,
		marginBottom: 30,
	},
});

export default ErrorScreen;
