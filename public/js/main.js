// $('#map').hide()
$('.modal').modal('show')
$('.modal').on('shown.bs.modal', function() {
	$("#locationTextField").focus();
});



//Load Map and AutoComplete

var fbLocations = []
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
		// center: {lat: 40, lng: -105},
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

		if (place.geometry.viewport) {

			map.fitBounds(place.geometry.viewport)
		} else {
			map.setCenter(place.geometry.location)
			// map.setZoom(10)
		}

	})

}

console.log(fbLocations)

//===================================================================================================================


//Submit City Name

$('#submitLocationForm').on('submit', function(event) {
	console.log('submitting', event)
	event.preventDefault()

	$('.modal').modal('hide')

	// $('#map').show()

	var userinput = $('#locationTextField').val()

	console.log(userinput)

	$.get(`/search?query=${userinput}`, function(googleData, status) {

		googleData = JSON.parse(googleData)

		// console.log(googleData)

		var latitude = googleData.results[0].geometry.location.lat
		var longitude = googleData.results[0].geometry.location.lng

		//GET REQUEST TO FACEBOOK

		$.get(`/place?center=${latitude},${longitude}`, function(facebookData, status) {

			facebookData = JSON.parse(facebookData)

			// console.log(facebookData)

			// console.log(facebookData.checkins)

			for (var i = 0; i < facebookData.data.length; i++) {

				// console.log(facebookData.data[i].checkins)

				//PUSH AND SORT LOCATIONS ARRAY

				// fbLocations.push(facebookData.data[i])
				fbLocations.push({
					lat: facebookData.data[i].location.latitude,
					lng: facebookData.data[i].location.longitude
				})

				fbLocations.sort(function(a, b) {

					return b.checkins - a.checkins
				})

				//PUSH PARKS ARRAY

				if (facebookData.data[i].category === 'Park') {

					parks.push(facebookData.data[i])
				}

				//PUSH RESTAURANTS ARRAY

				if (facebookData.data[i].category === 'Restaurant') {

					restaurants.push(facebookData.data[i])
				}

			}
			var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

			var markers = fbLocations.map(function(location, i) {
				console.log(location)
				try {
					return new google.maps.Marker({
						position: new google.maps.LatLng(location.lat, location.lng),
						label: labels[i % labels.length]
					});
				} catch (err) {
					console.log(err)
				}
			});

			// Add a marker clusterer to manage the markers.
			var markerCluster = new MarkerClusterer(map, markers, {
				imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
			});
			console.log(markerCluster)

			// console.log(fbLocations)
			// console.log(parks)
			// console.log(restaurants)

		})

	})

	console.log(fbLocations)



})
