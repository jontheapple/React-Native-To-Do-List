import { StyleSheet } from "react-native";

var styles = StyleSheet.create({
	timeAndDay:{
		fontSize: 40,
		fontWeight: "bold",
		color: "#646266"
	},
	item:{
		color: "#646266",
		fontSize: 30
	},
	itemDone:{
		color: "#d9d8da",
		fontSize: 30,
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
	}
});

export default styles;