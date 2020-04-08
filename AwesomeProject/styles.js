import { StyleSheet } from "react-native";

var styles = StyleSheet.create({
	dateDisplay:{
		fontSize: 40,
		fontWeight: "bold",
		color: "#646266"
	},
	itemText:{
		color: "#646266",
		fontSize: 25
	},
	itemTextDone:{
		color: "#d9d8da",
		fontSize: 25,
		textDecorationLine: "line-through",
	},
	itemTime:{
		color: "#646266",
		fontSize: 15,
		alignSelf: "flex-end"
	},
	itemTimeDone:{
		color: "#d9d8da",
		fontSize: 15,
		textDecorationLine: "line-through",
		alignSelf: "flex-end"
	},
	list:{
		flex: 1,
		flexDirection: "row",
		justifyContent: "space-between"
	},
	button:{
		borderWidth: 1,
		borderColor: 'black',
		width: 20,
		height: 20,
		backgroundColor: 'white',
		borderRadius: 10,
		alignSelf: "center"
	},
	buttonDone:{
		borderWidth: 1,
		borderColor: 'white',
		width: 20,
		height: 20,
		backgroundColor: 'white',
		borderRadius: 10,
		alignSelf: "center"
	},
	topBar:{
		flexDirection: "row",
		justifyContent: "space-between"
	}
});

export default styles;