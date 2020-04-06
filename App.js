import React from 'react';
import { Text, TextInput, View } from 'react-native';

var today = new Date();

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
			style={{
				fontSize: 20
			}}
		>
			{dayString}, {today.getDate()} {monthString}
		</Text>
	);
}

function Cat(props) {
  return (
    <View>
      <Text>Hello, I am {props.name}</Text>
    </View>
  );
}




export default function App() {
	return(
		<View>
			<FormattedDate />
		</View>
	)
}
