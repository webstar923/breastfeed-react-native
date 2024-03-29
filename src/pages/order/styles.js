import { StyleSheet } from "react-native";

export default StyleSheet.create({
	container: {
		paddingLeft: 15,
		paddingRight: 15,
		paddingBottom: 20,
		flex: 1,
		paddingTop: 17
	},
	supportheaderTitle: {
		fontStyle: "normal",
		fontWeight: "bold",
		fontSize: 22,
		lineHeight: 22,
		color: "#000000",
		textAlign: "center",
		marginTop: 0,
		marginBottom: 10,
		borderBottomWidth: 1,
		borderColor: "#E5E5E5",
		paddingBottom: 20,
	},
	tabBarUnderlineStyle: {
		borderBottomWidth: 0,
		backgroundColor: "#F5821F",
		paddingLeft: 0,
		paddingRight: 0,
		height: 2,
		marginLeft: 0,
		marginRight: 0,
	},
	tabStyle: {
		borderBottomWidth: 0,
		backgroundColor: "#fff",
		height: "auto",
		paddingLeft: 0,
		paddingRight: 0,
		marginTop: 0,
		marginLeft: 0,
		marginRight: 0,
	},
	activeTabStyle: {
		borderWidth: 0,
		backgroundColor: "#fff",
		color: "#fff",
		marginTop: 0,
		height: "auto",
		paddingLeft: 0,
		paddingRight: 0,
		paddingHorizontal: 0,
		marginLeft: 0,
		marginRight: 0,
	},
	tabTextStyle: {
		backgroundColor: "transparent",
		textAlign: "center",
		fontWeight: "400",
		paddingVertical: 0,
		paddingLeft: 0,
		paddingRight: 0,
		borderRadius: 0,
		color: "#000",
		fontSize: 18,
		marginLeft: 0,
		marginRight: 0,
	},
	activeTextStyle: {
		color: "#000",
		backgroundColor: "transparent",
		textAlign: "center",
		fontWeight: "bold",
		paddingVertical: 0,
		paddingHorizontal: 0,
		paddingLeft: 0,
		paddingRight: 0,
		borderRadius: 0,
		fontSize: 18,
		borderWidth: 0,
		marginLeft: 0,
		marginRight: 0,
	},
	Disable: {
		opacity: 0.3
	}
});