
//// Initiatlize an NPM project and Require a few more libraries that will require installation:
/*
npm init -y
npm install dotenv
npm install express
npm install ws
*/

//// Require the (native) path library for generating paths to files
const path = require('path');
const csv = require('csv-parser');
const fs = require('fs');

//// This line uses the dotenv library to make vars in a .env available (if present)
//// For example, on Heroku, process.env.PORT will be set in the environment for you
//// This line lets you access that value by referencing it that way
require('dotenv').config()
//// Now we'll look for that value, or set a default to 3000 locally if not found
//// (So your app will be hosted at http://localhost:3000 when run locally)
const PORT = process.env.PORT || 3000;

//// Express is a library that provides some convenient routing syntax.
//// Routing basically tells your server how to handle specific URL requests
//// 	and with various parameters included (like ?a=1&b=yes, stuff like that)
const express = require('express');

var bycols = ["race","education_level"];
function formatDataForCharts(rows) {
	var cats = [];
	var data = [[],[]];
	var json = {};
	bycols.forEach((col) => {
		json[col] = {data:{}};
		rows.forEach((row) => {
			var val = row[col];
			if (typeof json[col].data[val] == "undefined") {
				json[col].data[val] = {y:0, n:0};
			}
			if (row.over_50k=="1") {
				json[col].data[val].y++;
			} else {
				json[col].data[val].n++;
			}
		});
	});
	for (var c in json) {
		json[c].categories = [];
		json[c].series = [{name:"Over $50k",data:[]}, {name:"Under $50k",data:[]}];
		for (var v in json[c].data) {
			var t = json[c].data[v].y + json[c].data[v].n;
			var yp = (json[c].data[v].y/t)*100;
			var np = (json[c].data[v].n/t)*100;
			json[c].categories.push(v);
			json[c].series[0].data.push(yp);
			json[c].series[1].data.push(np);
		}
	}
	return json;
}

//// Now create and start up a server instance with express, with a few specifications:
const server = express()
	//// Specify a 'get' route for the homepage:
	.get('/', function(req, res){
		//// We'll just be serving up the index.html that's in the 'public' folder
		res.sendFile(path.join(__dirname, 'public/index.html'));
	})
	.get('/data', function(req, res){
		//// We'll just be serving up the index.html that's in the 'public' folder
		var json = [];
		fs.createReadStream('census.csv')
			.pipe(csv())
			.on('data', (row) => {
				json.push(row);
			})
			.on('end', () => {
				res.json(formatDataForCharts(json));
			})
			.on('error', (err) => {
				console.log(err);
				res.json(err);
			})
	})
	//// We'll also use the /public directory as a static folder
	//// Anything that goes to /public/whatever. will just serve up whatever.file
	//// This is useful for using external JS and CSS in our index.html file, for example
	.use('/public', express.static('public'))
	//// And finally, let's listen on our PORT so we can visit this app in a browser
	.listen(PORT, () => console.log("Listening on PORT " + PORT))
	;



