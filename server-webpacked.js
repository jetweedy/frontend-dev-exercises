
const path = require('path');
const csv = require('csv-parser');
const fs = require('fs');

require('dotenv').config()
const PORT = process.env.PORT || 3000;

const express = require('express');

var bycols = ["race","education_level"];
function formatDataForCharts(rows) {
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

const server = express()
	.get('/', function(req, res){
		res.sendFile(path.join(__dirname, 'public/webpacked.html'));
	})
	.get('/data', function(req, res){
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
	.use('/public', express.static('public'))
	.listen(PORT, () => console.log("Listening on PORT " + PORT))
	;