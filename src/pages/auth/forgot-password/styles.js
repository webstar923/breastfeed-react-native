import { StyleSheet } from "react-native";
import { AppTheme } from "../../../utils/appTheme";

export default StyleSheet.create({
	backButton: {
		position: "absolute",
		top: 30,
		left: 30,
		zIndex: 12
	},
	container: {
		flexGrow: 1,
	},
	contentArea: {
		flexGrow: 1,
		width: "100%",
		alignItems: "center",
		justifyContent: "center",
		paddingHorizontal: 40,
	},
	textInputContainer: {
		paddingTop: 0,
		width: "100%"
	},
	buttonContainer: {
		paddingTop: 50,
		width: "100%"
	},
	buttonStyle: {
		shadowColor: "rgba(0, 0, 0, 0.25)",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
		maxWidth: "100%"
	},
	lockIcon: {
		width: 100,
		resizeMode: "contain"
	},
	headerText: {
		fontSize: 30,
		lineHeight: 37,
		fontWeight: "500",
		color: "#fff",
		textAlign: "center",
		marginVertical: 50
	},
	headerSubText: {
		fontWeight: "normal",
		fontSize: 22,
		lineHeight: 26,
		color: "#fff",
		textAlign: "center",
		marginBottom: 20
	},
	custominputDigit: {
		backgroundColor: "#ececec",
		borderRadius: 3,
		width: "100%"
	},
	otpErrorMessage: {
		color: "red",
		marginTop: 5,
		fontSize: 13
	},
	note: {
		fontWeight: "normal",
		fontSize: 14,
		lineHeight: 17,
		marginTop: 20,
		color: "#fff"
	}
});