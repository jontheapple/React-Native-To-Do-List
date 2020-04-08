const express = require('express');
const bodyParser = require('body-parser');
const fs = require("fs");
const app = express();
const PORT = 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';

const router = express.Router();

app.set('port', PORT);
app.set('env', NODE_ENV);
app.use(bodyParser.json());

router.get("/", (req, res) => {
	console.log("Get request received");
	fs.readFile('./tasks.json', (err, data) => {
		if (err){
			console.log(err);
		} else{
			res.json(JSON.parse(data));
		}
	});
});

app.use(router);

app.listen(PORT, () => {
	console.log("Listening on port " + PORT);
});
