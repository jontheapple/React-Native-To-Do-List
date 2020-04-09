import 'react-native-gesture-handler';
import React from 'react';
import { Text, TextInput, View, ScrollView, TouchableOpacity, Image, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';

import styles from './styles.js';

let today = new Date();

let tasks = [
	{
		task: 'Throttle flowers',
		hour: 8,
		minute: 0
	},
	{
		task: 'Do dishes',
		hour: 19,
		minute: 30
	},
	{
		task: "Attack computer",
		hour: 14,
		minute: 45
	}
]

//Takes the current date and puts it in a string format to be displayed at top of app
function formattedDate() {
	let dayString;
	let monthString;
	switch (today.getDay()){
		case 0:
			dayString = "Sunday";
			break;
		case 1:
			dayString = "Monday";
			break;
		case 2:
			dayString = "Tuesday";
			break;
		case 3:
			dayString = "Wednesday";
			break;
		case 4:
			dayString = "Thursday";
			break;
		case 5:
			dayString = "Friday";
			break;
		case 6:
			dayString = "Saturday";
			break;
	}

	switch (today.getMonth()){
		case 0:
			monthString = "Jan";
			break;
		case 1:
			monthString = "Feb";
			break;
		case 2:
			monthString = "Mar";
			break;
		case 3:
			monthString = "Apr";
			break;
		case 4:
			monthString = "May";
			break;
		case 5:
			monthString = "June";
			break;
		case 6:
			monthString = "July";
			break;
		case 7:
			monthString = "Aug";
			break;
		case 8:
			monthString = "Sept";
			break;
		case 9:
			monthString = "Oct";
			break;
		case 10:
			monthString = "Nov";
			break;
		case 11:
			monthString = "Dec";
			break;
	}

	return dayString + ", " + today.getDate() + " " + monthString;
}

//React Component for an individual item on the Todo list
class ListItem extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			pressed: false,
			task: this.props.task.task,
			hour: this.props.task.hour,
			minute: this.props.task.minute
		}
	}

	updateStuff(task){
		this.setState({
			task: task.task,
			hour: task.hour,
			minute: task.minute
		});
	}

	doForceUpdate(){
		this.forceUpdate();
	}

	//This function is called whenever the item is tapped
	swapState(){
		this.setState({pressed: !this.state.pressed});
		return;
	}

	render(){
		//Slightly different behavior depending on if the item is "crossed out"
		if (this.state.pressed){
			return (
				<View style={{
						flexDirection: "row",
						marginBottom: 10
					}}>
					<TouchableOpacity style={styles.buttonDone} onPress={() => this.swapState()}/>
					<View
						style={styles.list}
						>
						<Text
							onPress={() => this.swapState()}
							style={styles.itemTextDone}>
							{this.state.task}
						</Text>
						<Text
							onPress={() => this.swapState()}
							style={styles.itemTimeDone}>
							{toDigitalTime(this.state.hour, this.state.minute)}
						</Text>
					</View>
				</View>
			);
		} else{
			return (
				<View style={{
						flexDirection: "row",
						marginBottom: 10
					}}>
					<TouchableOpacity style={styles.button} onPress={() => this.swapState()}/>
					<View
						style={styles.list}
						>
						<Text
							onPress={() => this.swapState()}
							style={styles.itemText}>
							{this.state.task}
						</Text>
						<Text
							onPress={() => this.swapState()}
							style={styles.itemTime}>
							{toDigitalTime(this.state.hour, this.state.minute)}
						</Text>
					</View>
				</View>
			);
		}
	}
}

//Sort tasks in order of which one needs to be completed first
function sortTasks(){
	tasks.sort((firstE, secondE) => {
		if (firstE.hour > secondE.hour){
			return 1;
		} else if (secondE.hour > firstE.hour){
			return -1;
		} else{
			if (firstE.minute > secondE.minute){
				return 1;
			} else if (secondE.minute > firstE.minute){
				return -1;
			} else return 0;
		}
	});
}

//This function takes an hour (0-23) and a minute (0-59), and returns a string in XX:XX format, ending with "am" or "pm"
function toDigitalTime(hour, minute){
	let meri = "";
	let extraZero = "";
	if (hour >= 12){
		hour -= 12;
		meri = "pm"
	} else{
		meri = "am"
	}
	if (hour === 0) hour = 12;
	if (minute < 10) extraZero = "0"
	return (hour + ":" + extraZero + minute + meri);
}

function addTask(task, hour, minute){
	let newTask = {
		task: task,
		hour: hour,
		minute: minute
	}
	tasks.push(newTask);
	sortTasks();
	return tasks;
}

function HomeScreen({navigation}) {
	const [value, setValue] = React.useState(0);
	return(
		<ScrollView style={{flex: 1, backgroundColor: "#5f75e2"}}>
			<View style={{margin: 10, padding: 10, backgroundColor: "white", borderRadius: 10}}>
				<View style={styles.topBar}>
					<Text style={styles.dateDisplay}>
						{formattedDate()}
					</Text>
					<TouchableOpacity onPress={() => {
							addTask("hi", 12, 0);
							setValue(value + 1);
						}}>
						<Image style={{height: 80, width: 80}} source={require("./AddButton.png")}></Image>
					</TouchableOpacity>
				</View>
				{
					tasks.map((currentTask, i) => {
						return(<ListItem task={currentTask}/>);
					})
				}
			</View>
		</ScrollView>
	);
}

function AddTaskScreen({navigation}) {
	const [text, setText] = React.useState("");
	return (
		// <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
		// 	<Text>Details Screen</Text>
		// 	<Button
		// 		title="Go to Details...again..."
		// 		onPress={() => navigation.push('Details')}
		// 	/>
		// 	<Button title="Go to Home" onPress={() => navigation.navigate("Home")} />
		// 	<Button title="Go back" onPress={() => navigation.goBack()} />
		// 	<Button title="Go to first screen of stack" onPress={() => navigation.popToTop()} />
		// </View>
		<View style={{flex: 1, backgroundColor: "#5f75e2"}}>
			<View style={{margin: 10, padding: 10, backgroundColor: "white", borderRadius: 10}}>
				<Text style={styles.dateDisplay}>
					Add a new task:
				</Text>
				<TextInput
					style={{height: 40, backgroundColor: "#d9d8da"}}
					placeholder="Enter task here"
					onChangeText={text => setText(text)}
				/>
			</View>
		</View>
	);
}

const Stack = createStackNavigator();

function TestApp() {
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName="Home">
				<Stack.Screen
					name="Home"
					component={HomeScreen}
					options={{title: "To-Do List"}}
				/>
				<Stack.Screen name="Add" component={AddTaskScreen} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}

export default TestApp;