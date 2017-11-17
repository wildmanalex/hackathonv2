

$('.modal').modal('show')
$('.modal').on('shown.bs.modal', function() {
	$("#locationTextField").focus();
});

//Load Map and AutoComplete

var fbLocations = []
var fbAllLocations = []
var fbAllLocationsAll = []
var fbRestaurants = []
var fbRestaurantsAll = []
var fbEntertainment = []
var fbEntertainmentAll = []
var fbRecreation = []
var fbRecreationAll = []
var fbShopping = []
var fbShoppingAll = []
var parks = []
var restaurants = []
var map;

function initMap() {
	console.log('init map')

	var styledMapType = new google.maps.StyledMapType(
		[{
				elementType: 'geometry',
				stylers: [{
					color: '#ebe3cd'
				}]
			},
			{
				elementType: 'labels.text.fill',
				stylers: [{
					color: '#523735'
				}]
			},
			{
				elementType: 'labels.text.stroke',
				stylers: [{
					color: '#f5f1e6'
				}]
			},
			{
				featureType: 'administrative',
				elementType: 'geometry.stroke',
				stylers: [{
					color: '#c9b2a6'
				}]
			},
			{
				featureType: 'administrative.land_parcel',
				elementType: 'geometry.stroke',
				stylers: [{
					color: '#dcd2be'
				}]
			},
			{
				featureType: 'administrative.land_parcel',
				elementType: 'labels.text.fill',
				stylers: [{
					color: '#ae9e90'
				}]
			},
			{
				featureType: 'landscape.natural',
				elementType: 'geometry',
				stylers: [{
					color: '#dfd2ae'
				}]
			},
			{
				featureType: 'poi',
				elementType: 'geometry',
				stylers: [{
					color: '#dfd2ae'
				}]
			},
			{
				featureType: 'poi',
				elementType: 'labels.text.fill',
				stylers: [{
					color: '#93817c'
				}]
			},
			{
				featureType: 'poi.park',
				elementType: 'geometry.fill',
				stylers: [{
					color: '#a5b076'
				}]
			},
			{
				featureType: 'poi.park',
				elementType: 'labels.text.fill',
				stylers: [{
					color: '#447530'
				}]
			},
			{
				featureType: 'road',
				elementType: 'geometry',
				stylers: [{
					color: '#f5f1e6'
				}]
			},
			{
				featureType: 'road.arterial',
				elementType: 'geometry',
				stylers: [{
					color: '#fdfcf8'
				}]
			},
			{
				featureType: 'road.highway',
				elementType: 'geometry',
				stylers: [{
					color: '#f8c967'
				}]
			},
			{
				featureType: 'road.highway',
				elementType: 'geometry.stroke',
				stylers: [{
					color: '#e9bc62'
				}]
			},
			{
				featureType: 'road.highway.controlled_access',
				elementType: 'geometry',
				stylers: [{
					color: '#e98d58'
				}]
			},
			{
				featureType: 'road.highway.controlled_access',
				elementType: 'geometry.stroke',
				stylers: [{
					color: '#db8555'
				}]
			},
			{
				featureType: 'road.local',
				elementType: 'labels.text.fill',
				stylers: [{
					color: '#806b63'
				}]
			},
			{
				featureType: 'transit.line',
				elementType: 'geometry',
				stylers: [{
					color: '#dfd2ae'
				}]
			},
			{
				featureType: 'transit.line',
				elementType: 'labels.text.fill',
				stylers: [{
					color: '#8f7d77'
				}]
			},
			{
				featureType: 'transit.line',
				elementType: 'labels.text.stroke',
				stylers: [{
					color: '#ebe3cd'
				}]
			},
			{
				featureType: 'transit.station',
				elementType: 'geometry',
				stylers: [{
					color: '#dfd2ae'
				}]
			},
			{
				featureType: 'water',
				elementType: 'geometry.fill',
				stylers: [{
					color: '#b9d3c2'
				}]
			},
			{
				featureType: 'water',
				elementType: 'labels.text.fill',
				stylers: [{
					color: '#92998d'
				}]
			}
		], {
			name: 'Styled Map'
		});

	map = new google.maps.Map(document.getElementById('map'), {
		zoom: 3,
		mapTypeControlOptions: {
			mapTypeIds: ['roadmap', 'satellite', 'terrain',
				'styled_map'
			]
		}

	});

	map.mapTypes.set('styled_map', styledMapType);
	map.setMapTypeId('styled_map');

	var input = document.getElementById('locationTextField')

	var autocomplete = new google.maps.places.Autocomplete(input)
	autocomplete.bindTo('bounds', map)

	autocomplete.addListener('place_changed', function(event) {
		console.log('adding place change listener')


		var place = autocomplete.getPlace()

		if (!place.geometry) {
			console.log('Invalid format')
			return;
		}

		else {
			map.setCenter(place.geometry.location)
			map.setZoom(14)
		}

	})

}


//Submit City Name

$('#submitLocationForm').on('submit', function(event) {
	console.log('submitting', event)
	event.preventDefault()

	$('.modal').modal('hide')

	var userinput = $('#locationTextField').val()

	console.log(userinput)

	$.get(`/search?query=${userinput}`, function(googleData, status) {

		googleData = JSON.parse(googleData)

		var latitude = googleData.results[0].geometry.location.lat
		var longitude = googleData.results[0].geometry.location.lng

//GET REQUEST TO FACEBOOK

	//Restaurants

// 		$.get(`/place?center=${latitude},${longitude}`, function(facebookData, status) {

// 			facebookData = JSON.parse(facebookData)

// 			for (var i = 0; i < facebookData.data.length; i++) {

// //PUSH AND SORT LOCATIONS ARRAY
	
// 				fbLocations.push({
// 					lat: facebookData.data[i].location.latitude,
// 					lng: facebookData.data[i].location.longitude
// 				})

// 				fbAllLocations.push(facebookData.data[i])

// 			}

// 			fbAllLocations.sort(function(a,b){

// 				return b.checkins - a.checkins
// 			})

// 			console.log(fbAllLocations)



// //MARKERS AND CLUSTERS

// 			var locationLabels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

// 			var locationMarkers = fbLocations.map(function(location, i) {
// 				// console.log(location)
// 				try {
					
// 					return new google.maps.Marker({
// 						position: new google.maps.LatLng(location.lat, location.lng),
// 						label: locationLabels[i % locationLabels.length]
// 					});
				
// 				} catch (err) {
					
// 					console.log(err)
// 				}
// 			});

// 			var markerCluster = new MarkerClusterer(map, locationMarkers, {
// 				imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
// 			});
// 		})

	

		$.get(`/restaurants?center=${latitude},${longitude}`, function(restaurantsFacebookData, status) {

				restaurantsFacebookData = JSON.parse(restaurantsFacebookData)

				for (var i = 0; i < restaurantsFacebookData.data.length; i++) {

	//PUSH AND SORT LOCATIONS ARRAY
		
					fbRestaurants.push({
						lat: restaurantsFacebookData.data[i].location.latitude,
						lng: restaurantsFacebookData.data[i].location.longitude
					})

					fbRestaurantsAll.push(restaurantsFacebookData.data[i])

				}

				fbRestaurantsAll.sort(function(a,b){

					return b.checkins - a.checkins
				})

				console.log(fbRestaurantsAll)	

					var restaurantsLabels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

					var restaurantsMarkers = fbRestaurants.map(function(location, i) {
							
							return new google.maps.Marker({
								position: new google.maps.LatLng(location.lat, location.lng),
								label: restaurantsLabels[i % restaurantsLabels.length]
							});
					});

					var restaurantsMarkerCluster = new MarkerClusterer(map, restaurantsMarkers, {
						imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
					});
		})

		$.get(`/entertainment?center=${latitude},${longitude}`, function(entertainmentFacebookData, status) {

				entertainmentFacebookData = JSON.parse(entertainmentFacebookData)

				for (var i = 0; i < entertainmentFacebookData.data.length; i++) {

	//PUSH AND SORT LOCATIONS ARRAY
		
					fbEntertainment.push({
						lat: entertainmentFacebookData.data[i].location.latitude,
						lng: entertainmentFacebookData.data[i].location.longitude
					})

					fbEntertainmentAll.push(entertainmentFacebookData.data[i])

				}

				fbEntertainmentAll.sort(function(a,b){

					return b.checkins - a.checkins
				})

				console.log(fbEntertainmentAll)	

				var entertainmentLabels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

					var entertainmentMarkers = fbEntertainment.map(function(location, i) {
						// console.log(location)
						
							
							return new google.maps.Marker({
								position: new google.maps.LatLng(location.lat, location.lng),
								label: entertainmentLabels[i % entertainmentLabels.length]
							});
						
						
					});

					var entertainmentMarkerCluster = new MarkerClusterer(map, entertainmentMarkers, {
						imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
					});
		})

		$.get(`/recreation?center=${latitude},${longitude}`, function(recreationFacebookData, status) {

				recreationFacebookData = JSON.parse(recreationFacebookData)

				for (var i = 0; i < recreationFacebookData.data.length; i++) {

	//PUSH AND SORT LOCATIONS ARRAY
		
					fbRecreation.push({
						lat: recreationFacebookData.data[i].location.latitude,
						lng: recreationFacebookData.data[i].location.longitude
					})

					fbRecreationAll.push(recreationFacebookData.data[i])

				}

				fbRecreationAll.sort(function(a,b){

					return b.checkins - a.checkins
				})

				console.log(fbRecreationAll)

				var recreationLabels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

					var recreationMarkers = fbRecreation.map(function(location, i) {
						// console.log(location)
						
							
							return new google.maps.Marker({
								position: new google.maps.LatLng(location.lat, location.lng),
								label: recreationLabels[i % recreationLabels.length]
							});
						
						
					});

					var recreationMarkerCluster = new MarkerClusterer(map, recreationMarkers, {
						imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
					});	
		})

		$.get(`/shopping?center=${latitude},${longitude}`, function(shoppingFacebookData, status) {

				shoppingFacebookData = JSON.parse(shoppingFacebookData)

				for (var i = 0; i < shoppingFacebookData.data.length; i++) {

	//PUSH AND SORT LOCATIONS ARRAY
		
					fbShopping.push({
						lat: shoppingFacebookData.data[i].location.latitude,
						lng: shoppingFacebookData.data[i].location.longitude
					})

					fbShoppingAll.push(shoppingFacebookData.data[i])

				}

				fbShoppingAll.sort(function(a,b){

					return b.checkins - a.checkins
				})

				console.log(fbShoppingAll)

				var shoppingLabels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

					var shoppingMarkers = fbShopping.map(function(location, i) {
						// console.log(location)
						
							
							return new google.maps.Marker({
								position: new google.maps.LatLng(location.lat, location.lng),
								label: shoppingLabels[i % shoppingLabels.length]
							});
						
						
					});

					var shoppingMarkerCluster = new MarkerClusterer(map, shoppingMarkers, {
						imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
					});	
		})

	})

})
