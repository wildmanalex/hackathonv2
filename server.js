//requires
const express = require('express')
const bodyParser = require('body-parser')
// const mongoose = require('mongoose')
const request = require('request')


const app = express()
app.use(express.static('./public'))

app.get('/', function(req, res) {

    res.sendFile('./public/html/index.html', {root:'./'})
})
app.get('/map', function(req, res){

	res.sendFile('./public/html/map.html', {root:'./'})
})
// app.get('/map', function(req, res) {
// 		res.sendFile('./public/html/map.html', {root:'./'})
// })

app.get('/search', function(req, res){

	console.log(req.query)


	var googlePlaceApi = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${req.query.query}&key=AIzaSyBneM3QFGVEC1XUs8YfKmFPckzKegha3-8`

	request(googlePlaceApi, function(err, response, dataFromServer){

		// console.log(err)

		console.log(response)

		console.log(dataFromServer)

		res.send(dataFromServer)
		console.log('apiCallworking')
	})



})

app.get('/place', function(req, res){

	var facebookAPI = `https://graph.facebook.com/v2.11/search?type=place&center=${req.query.center}&distance=5000&fields=name,checkins,location,category&limit=100&access_token=186723258550710|8069d0acffdee876456780730de0e0c7`

	request(facebookAPI, function(err, response, dataFromServer){

		console.log(err)

		//console.log(response)

		// console.log(dataFromServer)

		res.send(dataFromServer)

		console.log('facebookAPI sent data')
	})
})









//listen
app.listen(8083, function(){

    console.log('server listening on port 8083')
})
