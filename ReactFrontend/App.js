import 'react-native-gesture-handler';
import React from 'react';
import { Text, TextInput, View, ScrollView, TouchableOpacity, Image, Button, Alert } from 'react-native';
import {Picker} from "@react-native-community/picker";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';

import styles from './styles.js';

let today = new Date();

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
			deleted: false
		}
	}

	//This function is called whenever the item is tapped
	swapState(){
		this.setState((state) => {
			return {pressed: !state.pressed}
		});
	}

	onSwipeRight(){
		Alert.alert(
			"Delete Task",
			"Are you sure you want to delete " + this.props.task + "?",
			[
				{text: "Delete", onPress: () => this.props.deleteTask(this.props.id), style: "destructive"},
				{text: "Cancel", onPress: () => {}}
			]
		);
	}

	render(){
		if (this.state.deleted) return null;

		//Slightly different behavior depending on if the item is "crossed out"
		if (this.state.pressed){
			return (
				<GestureRecognizer onSwipeRight={() => this.onSwipeRight()} onSwipeLeft={() => this.onSwipeRight()}>
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
								{this.props.task}
							</Text>
							<Text
								onPress={() => this.swapState()}
								style={styles.itemTimeDone}>
								{toDigitalTime(this.props.hour, this.props.minute)}
							</Text>
						</View>
					</View>
				</GestureRecognizer>
			);
		} else{
			return (
				<GestureRecognizer onSwipeRight={() => this.onSwipeRight()} onSwipeLeft={() => this.onSwipeRight()}>
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
								{this.props.task}
							</Text>
							<Text
								onPress={() => this.swapState()}
								style={styles.itemTime}>
								{toDigitalTime(this.props.hour, this.props.minute)}
							</Text>
						</View>
					</View>
				</GestureRecognizer>
			);
		}
	}
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

class HomeScreen extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			arbitraryValue: 0,
			tasks: [],
			nextId: 0
		}
	}

	//Sort tasks in order of which one needs to be completed first
	sortTasks(tasks){
		tasks.sort((firstE, secondE) => {
			if (firstE.time.hour > secondE.time.hour){
				return 1;
			} else if (secondE.time.hour > firstE.time.hour){
				return -1;
			} else{
				if (firstE.time.minute > secondE.time.minute){
					return 1;
				} else if (secondE.time.minute > firstE.time.minute){
					return -1;
				} else return 0;
			}
		});
		return tasks;
	}

	//Add new task to the to do list
	addTask(task, hour, minute){
		let newTasks = this.state.tasks;
		let newTask = {
			task: task,
			time:{
				hour: hour,
				minute: minute
			},
			id: this.state.nextId
		}
		newTasks.push(newTask);
		newTasks = this.sortTasks(newTasks);
		this.setState({tasks: newTasks, nextId: this.state.nextId + 1});
	}

	deleteTask(id){
		let newTasks = this.state.tasks;
		newTasks = newTasks.filter((value, i, arr) => {
			return !(value.id === id);
		});
		this.setState({tasks: newTasks});
	}

	//debug function
	printTasks(){
		console.log("printing tasks");
		this.state.tasks.map((currentTask, i) => {
			console.log("The current task is " + currentTask.task);
			console.log("Its id is " + currentTask.id);
		});
	}

	componentDidMount() {
		fetch("https://salty-chamber-09551.herokuapp.com/")
			.then(res => res.json())
			.then(json => this.setState({tasks: json, nextId: json.length}));
	}

	render(){
		const {navigation} = this.props;
		return(
			<ScrollView style={{flex: 1, backgroundColor: "#5f75e2"}}>
				<View style={{margin: 10, padding: 10, backgroundColor: "white", borderRadius: 10}}>
					<View style={styles.topBar}>
						<Text style={styles.dateDisplay}>
							{formattedDate()}
						</Text>
						<TouchableOpacity onPress={() => {
								navigation.navigate("Add", {addTask: (task, hour, minute) => this.addTask(task, hour, minute)});
								this.setState({arbitraryValue: this.state.arbitraryValue + 1});
							}}>
							<Image style={{height: 80, width: 80}} source={require("./AddButton.png")}></Image>
						</TouchableOpacity>
					</View>
					{
						this.state.tasks.map((currentTask, i) => {
							return(<ListItem task={currentTask.task} hour={currentTask.time.hour} minute={currentTask.time.minute} id={currentTask.id} deleteTask={(id) => this.deleteTask(id)}/>);
						})
					}
				</View>
			</ScrollView>
		);
	}
}

function AddTaskScreen({route, navigation}) {
	const [text, setText] = React.useState();
	const [hour, setHour] = React.useState(0);
	const [minute, setMinute] = React.useState(0);
	const [meri, setMeri] = React.useState("am");
	return (
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
				<Text style={styles.dateDisplay}>
					Time to complete task:
				</Text>
				<Picker
					selectedValue={hour}
					onValueChange={(itemValue, itemIndex) => setHour(itemValue)}
					>
						<Picker.Item label="12" value={0} />
						<Picker.Item label="1" value={1} />
						<Picker.Item label="2" value={2} />
						<Picker.Item label="3" value={3} />
						<Picker.Item label="4" value={4} />
						<Picker.Item label="5" value={5} />
						<Picker.Item label="6" value={6} />
						<Picker.Item label="7" value={7} />
						<Picker.Item label="8" value={8} />
						<Picker.Item label="9" value={9} />
						<Picker.Item label="10" value={10}/>
						<Picker.Item label="11" value={11} />
				</Picker>
				<Picker
					selectedValue={minute}
					onValueChange={(itemValue, itemIndex) => setMinute(itemValue)}
					>
						<Picker.Item label=":00" value={0} />
						<Picker.Item label=":05" value={5} />
						<Picker.Item label=":10" value={10} />
						<Picker.Item label=":15" value={15} />
						<Picker.Item label=":20" value={20} />
						<Picker.Item label=":25" value={25} />
						<Picker.Item label=":30" value={30} />
						<Picker.Item label=":35" value={35} />
						<Picker.Item label=":40" value={40} />
						<Picker.Item label=":45" value={45} />
						<Picker.Item label=":50" value={50} />
						<Picker.Item label=":55" value={55} />
				</Picker>
				<Picker
					selectedValue={meri}
					onValueChange={(itemValue, itemIndex) => setMeri(itemValue)}
					>
						<Picker.Item label="am" value="am" />
						<Picker.Item label="pm" value="pm" />
				</Picker>
				<Button
					onPress= {() => {
						let returnHour = hour;
						returnHour += (meri === "am") ? 0 : 12;
						route.params.addTask(text, returnHour, minute);
						navigation.navigate("Home", {added: true});
					}}
					title="Add Task"
					>
				</Button>
			</View>
		</View>
	);
}

const Stack = createStackNavigator();

function App() {
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

export default App;