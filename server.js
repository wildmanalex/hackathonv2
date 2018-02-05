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

	var googlePlaceApi = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${req.query.query}&key=AIzaSyDlmcnTkY5oOIpWsbxz23N2zld6UYk4QGI`

	request(googlePlaceApi, function(err, response, dataFromServer){

		// console.log(err)

		console.log(response)

		console.log(dataFromServer)

		res.send(dataFromServer)
		console.log('apiCallworking')
	})



})

app.get('/place', function(req, res){

	var facebookAPI = `https://graph.facebook.com/v2.11/search?type=place&center=${req.query.center}&distance=1000&fields=name,checkins,location&limit=50&access_token=186723258550710|6e3f49b536d12f9e19ebc590cc47cbd1`

	request(facebookAPI, function(err, response, restaurantsFromServer){

		console.log(err)

		//console.log(response)

		// console.log(restaurantsFromServer)

		res.send(restaurantsFromServer)

		console.log('facebookAPI sent data')
	})
})

app.get('/restaurants', function(req, res){

	var facebookAPI = `https://graph.facebook.com/v2.11/search?type=place&center=${req.query.center}&distance=1000&categories=["FOOD_BEVERAGE"]&fields=name,checkins,location&limit=50&access_token=186723258550710|6e3f49b536d12f9e19ebc590cc47cbd1`

	request(facebookAPI, function(err, response, restaurantsFromServer){

		console.log(err)

		//console.log(response)

		// console.log(restaurantsFromServer)

		res.send(restaurantsFromServer)

		console.log('facebookAPI sent data')
	})
})

app.get('/entertainment', function(req, res){

	var facebookAPI = `https://graph.facebook.com/v2.11/search?type=place&center=${req.query.center}&distance=1000&categories=["ARTS_ENTERTAINMENT"]&fields=name,checkins,location&limit=50&access_token=186723258550710|6e3f49b536d12f9e19ebc590cc47cbd1`

	request(facebookAPI, function(err, response, entertainmentFromServer){

		console.log(err)

		//console.log(response)

		// console.log(entertainmentFromServer)

		res.send(entertainmentFromServer)

		console.log('facebookAPI sent data')
	})
})

app.get('/recreation', function(req, res){

	var facebookAPI = `https://graph.facebook.com/v2.11/search?type=place&center=${req.query.center}&distance=1000&categories=["FITNESS_RECREATION"]&fields=name,checkins,location&limit=50&access_token=186723258550710|6e3f49b536d12f9e19ebc590cc47cbd1`

	request(facebookAPI, function(err, response, recreationFromServer){

		console.log(err)

		//console.log(response)

		// console.log(recreationFromServer)

		res.send(recreationFromServer)

		console.log('facebookAPI sent data')
	})
})

app.get('/shopping', function(req, res){

	var facebookAPI = `https://graph.facebook.com/v2.11/search?type=place&center=${req.query.center}&distance=1000&categories=["SHOPPING_RETAIL"]&fields=name,checkins,location&limit=50&access_token=186723258550710|6e3f49b536d12f9e19ebc590cc47cbd1`

	request(facebookAPI, function(err, response, shoppingFromServer){

		console.log(err)

		//console.log(response)

		// console.log(shoppingFromServer)

		res.send(shoppingFromServer)

		console.log('facebookAPI sent data')
	})
})









//listen
app.listen(8083, function(){

    console.log('server listening on port 8083')
})
