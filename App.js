import React from 'react';
import { Text, TextInput, View, ScrollView, TouchableOpacity } from 'react-native';
import styles from './styles.js';

var today = new Date();
const tasks = [
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

function FormattedDate() {
	var dayString;
	var monthString;
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

	return (
		<Text 
			style={styles.timeAndDay}
		>
			{dayString}, {today.getDate()} {monthString}
		</Text>
	);
}

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

	swapState(){
		this.setState({pressed: !this.state.pressed});
		return;
	}

	render(){
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

function sortTasks(){
	//Sort tasks in order of which one needs to be completed first
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

function toDigitalTime(hour, minute){
	var meri = "";
	var extraZero = "";
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




export default function App() {
	sortTasks();
	return(
		<ScrollView style={{flex: 1, backgroundColor: "#5f75e2"}}>
			<View style={{margin: 10, padding: 10, backgroundColor: "white", borderRadius: 10}}>
				<FormattedDate />
				{
					tasks.map((currentTask, i) => {
						return(
							<ListItem task={currentTask}/>
						);
					})
				}
			</View>
		</ScrollView>
	);
}
