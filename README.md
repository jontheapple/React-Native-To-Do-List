# To Do List App

## About
This is a To Do List app made for a coding challenge as part of one of my job interviews. It is my very first time working with React and/or React Native. The app itself in the ReactFrontend directory is made with React Native, and the backend API (source code in the NodeAPI directory) is hosted at https://salty-chamber-09551.herokuapp.com/. The frontend app was required to have the ability to add, complete, and delete tasks. The backend was only required to serve tasks to the frontend app.

## Installation Instructions
Begin by setting up your environment, following the instructions at https://reactnative.dev/docs/environment-setup. I am using the React Native CLI on Windows targetting Android. Make sure you have and are able to run the starter app before continuing.

Next, copy everything from the ReactFrontend directory into your new React project directory, replacing files of the same name.

Finally, run
```
npm install
```
in your React project directory. You can now run the app the same way you ran the default React app. Note that you may get an error the first time you try to run the app. I find that on a fresh install, I am unable to run the app until the second try. If you do run into errors, just give it a couple more attempts.

## Features Implemented
Tap the "Plus Button" to be taken to the "add new task" screen.

Tap anywhere on a task to complete it (cross it out).

Swipe a task to delete it. For a slightly better UI experience, I chose to make an alert box pop up when the task is swiped, confirming if the user wants to delete it.

## Backend Data Structuring
The API responds with a JSON object with 3 entries. Each entry is an object that holds the text of a task, the time that it needs to be completed, and a unique id. The "time" is another object that contains an hour value and a minute value. I decided to structure it this way because the text and the id are the "main data" of the entry. The time is another object because of the fact that it contains two values, and each of those values do not mean anything without the other. Therefore, it made sense to group them together.

## Testing
As part of the challenge, I was tasked with implementing one (and only one) frontend test and one backend test, and then to explain my decision on what to test, given my limitation of only having two tests.

The test I chose for backend testing was an easy decision to make, because since there is only one functionality (serving data to a GET request). My test simply queries the API and compares the response to what I expect the response should be. Had there been a more complicated backend involving a database and more request types (POST, PUT, DELETE, etc), this would have been a much more difficult decision to make.

Choosing a single test for the entire frontend app was more difficult. The frontend app has many more features: adding a task, displaying the tasks, completing the tasks, and deleting tasks. Each of these features may also have sub-features. For example, adding a task involves switching to a new screen, which would require more tests to ensure proper functionality. For my single test, I chose to test the ability to add a task, because I believe this is the most important functionality for a to do list app, and especially if assuming there is a database attached to the backend.

I came to this conclusion after thinking about the consequences of each of these features failing. If a user is unable to complete tasks or delete tasks properly, that would be annoying, but it is not a big deal. At worst, the user would maybe try to delete a task, and then later notice it is still there. Once the day is over, the current day's list of tasks would likely never be relevant again.

The consequences of the app being unable to display the tasks properly would be more severe, as a user could potentially miss a time sensitive appointment due to the app not displaying the task. However, I believe the consequences of the app being unable to properly add a task is even more severe, because not only does it carry the risk of the user missing an appointment, but the problem also does not fix itself if the app is later patched.

To better understand this, imagine the following two scenarios: A) The app can add tasks, but does not display tasks properly. B) The app can display tasks, but does not add tasks properly.

In scenario A, a user will likely add a task. Let's assume the worst case scenario, and the user submits the new task, but does not notice that the task is not properly being displayed. Later, the user opens the app again, and falsely believes there is no task to be completed. The consequence is that a task was missed.

Now let's assume that at some point between submitting the task and the next time the user opens the app and the user opening the app again, the issue of being unable to display tasks is fixed. Now, when the user opens the app again, the task that was properly added is pulled from the database, and the app properly displays it. This is a good result.

Next, we'll consider scenario B. Again, the user will add a task and then close the app without noticing anything has gone wrong. When the user opens the app again, the user will falsely believe that no task needs to be completed, therefore missing the task.

But if we now assume that the app is fixed between the user adding the task and the user viewing the to do list again (as we assumed for scenario A), we see the app still does not display the task that the user added. This is because fixing the problem with adding tasks does not retroactively add tasks that were added while the feature was not working properly. The consequence is that despite the app is fixed, the user still misses their task.

After comparing these two scenarios, it becomes clear to me that the ability to properly add tasks is more important than the ability to properly display tasks. Therefore, for my single test, I decided to test the ability to add tasks.

## Difficulties with testing
Despite my confidence in the reasoning behind the tests that I chose, I was unable to get the testing actually working properly. I was not able to figure out or look up how to make the tests run with react-native-gesture-handler and react-navigation. Googling the problem does show that these packages have issues working properly with jest, but I was not able to find a solution that works for my specific app. Even if I did find a solution, I am not sure how I would write a test for the scenario I described above. The docs for jest only talk about snapshot testing, but I don't believe that snapshot testing is what I am looking for.