
	$('.modal').modal('show')
	$('.modal').on('shown.bs.modal', function() {
		$("#locationTextField").focus();
	});

	// var fbLocations = []
	// var fbAllLocations = []
	// var fbAllLocationsAll = []
	// var fbRestaurants = []
	// var fbRestaurantsAll = []
	// var fbEntertainment = []
	// var fbEntertainmentAll = []
	// var fbRecreation = []
	// var fbRecreationAll = []
	// var fbShopping = []
	// var fbShoppingAll = []
	var map


	//INITIALIZE GOOGLE MAP
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

		map.mapTypes.set('styled_map', styledMapType)
		map.setMapTypeId('styled_map')

		var input = document.getElementById('locationTextField')

		var autocomplete = new google.maps.places.Autocomplete(input)
		autocomplete.bindTo('bounds', map)

		autocomplete.addListener('place_changed', function(event) {

			var place = autocomplete.getPlace()

			if (!place.geometry) {
				console.log('Invalid format')
				return
			}

			else {
				map.setCenter(place.geometry.location)
				map.setZoom(14)
			}

		})

	//MAP LEGEND
			var legend = document.getElementById('legend');
			map.controls[google.maps.ControlPosition.LEFT_TOP].push(legend);
	}

	//SUBMIT CITY NAME

	$('#submitLocationForm').on('submit', function(event) {
		
		event.preventDefault()

		var fbRestaurants = []
		var fbRestaurantsAll = []
		var fbEntertainment = []
		var fbEntertainmentAll = []
		var fbRecreation = []
		var fbRecreationAll = []
		var fbShopping = []
		var fbShoppingAll = []


		$('#results').empty()

		var userinput = $('#locationTextField').val()

		$('#locationTextField').blur()

		$('#results').append(`<h4>Results Summary</h4><i>${userinput}</i>`)

//GET REQUEST TO GOOGLE PLACES

		$.get(`/search?query=${userinput}`, function(googleData, status) {

			googleData = JSON.parse(googleData)

			var latitude = googleData.results[0].geometry.location.lat
			var longitude = googleData.results[0].geometry.location.lng

//GET REQUESTS TO FACEBOOK
		
	//RESTAURANTS ===============================================================================================================================

			$.get(`/restaurants?center=${latitude},${longitude}`, function(restaurantsFacebookData, status) {

					restaurantsFacebookData = JSON.parse(restaurantsFacebookData)

					for (var i = 0; i < restaurantsFacebookData.data.length; i++) {

						fbRestaurantsAll.push(restaurantsFacebookData.data[i])
						
						fbRestaurantsAll.sort(function(a,b){

							return b.checkins - a.checkins
						})

					}

					var fbRestaurantsSliced = fbRestaurantsAll.slice(0,20)

					var	popularRestaurant = fbRestaurantsSliced[0].name

						$('#results').append(`<li>Most Popular Restaurant:  <i>${popularRestaurant}</i></li>`)

							for(var i = 0; i < fbRestaurantsSliced.length; i++) {

			
								fbRestaurants.push({
									lat: fbRestaurantsSliced[i].location.latitude,
									lng: fbRestaurantsSliced[i].location.longitude
								})

							}

							// console.log(fbRestaurantsSliced)
							// console.log(fbRestaurants)

						var restaurantsLabels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

						var restaurantsMarkers = fbRestaurants.map(function(location, i) {
								
								return new google.maps.Marker({
									position: new google.maps.LatLng(location.lat, location.lng),
									label: restaurantsLabels[i % restaurantsLabels.length]
								})
						})

						var restaurantsMarkerCluster = new MarkerClusterer(map, restaurantsMarkers, {
							imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
						})
			})

	//ENTERTAINMENT =============================================================================================================================

			$.get(`/entertainment?center=${latitude},${longitude}`, function(entertainmentFacebookData, status) {

					entertainmentFacebookData = JSON.parse(entertainmentFacebookData)

					for (var i = 0; i < entertainmentFacebookData.data.length; i++) {


						fbEntertainmentAll.push(entertainmentFacebookData.data[i])

						fbEntertainmentAll.sort(function(a,b){

								return b.checkins - a.checkins
							})
					}

						var fbEntertainmentSliced = fbEntertainmentAll.slice(0,20)

						var popularEntertainment = fbEntertainmentSliced[0].name

							$('#results').append(`<li>Most Popular Entertainment:  <i>${popularEntertainment}</i></li>`)

							for(var i = 0; i < fbEntertainmentSliced.length; i++) {

			
								fbEntertainment.push({
									lat: fbEntertainmentSliced[i].location.latitude,
									lng: fbEntertainmentSliced[i].location.longitude
								})

							}

							// console.log(fbEntertainmentSliced)
							// console.log(fbEntertainment)

						
						var entertainmentLabels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

						var entertainmentMarkers = fbEntertainment.map(function(location, i) {
														
								return new google.maps.Marker({
									position: new google.maps.LatLng(location.lat, location.lng),
									label: entertainmentLabels[i % entertainmentLabels.length]
								})
								
						})

						var entertainmentMarkerCluster = new MarkerClusterer(map, entertainmentMarkers, {
							imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
						})
			})

	//RECREATION ================================================================================================================================

			$.get(`/recreation?center=${latitude},${longitude}`, function(recreationFacebookData, status) {

					recreationFacebookData = JSON.parse(recreationFacebookData)

					for (var i = 0; i < recreationFacebookData.data.length; i++) {
			

						fbRecreationAll.push(recreationFacebookData.data[i])

						fbRecreationAll.sort(function(a,b){

							return b.checkins - a.checkins
						})

					}

					var fbRecreationSliced = fbRecreationAll.slice(0,20)

					var popularRecreation = fbRecreationSliced[0].name

						$('#results').append(`<li>Most Popular Recreational Facility:  <i>${popularRecreation}</i></li>`)


							for(var i = 0; i < fbRecreationSliced.length; i++) {

			
								fbRecreation.push({
									lat: fbRecreationSliced[i].location.latitude,
									lng: fbRecreationSliced[i].location.longitude
								})

							}

							// console.log(fbRecreationSliced)
							// console.log(fbRecreation)


					var recreationLabels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

						var recreationMarkers = fbRecreation.map(function(location, i) {
								
								return new google.maps.Marker({
									position: new google.maps.LatLng(location.lat, location.lng),
									label: recreationLabels[i % recreationLabels.length]
								})
							
						})

						var recreationMarkerCluster = new MarkerClusterer(map, recreationMarkers, {
							imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
						})	
			})

	//SHOPPING===================================================================================================================================

			$.get(`/shopping?center=${latitude},${longitude}`, function(shoppingFacebookData, status) {

					shoppingFacebookData = JSON.parse(shoppingFacebookData)

					for (var i = 0; i < shoppingFacebookData.data.length; i++) {

						fbShoppingAll.push(shoppingFacebookData.data[i])

						fbShoppingAll.sort(function(a,b){

							return b.checkins - a.checkins
						})
					}

					var fbShoppingSliced = fbShoppingAll.slice(0,20)

					var popularShopping = fbShoppingSliced[0].name

						$('#results').append(`<li>Most Popular Shopping Places:  <i>${popularShopping}</i></li>`)


						for(var i = 0; i < fbShoppingSliced.length; i++) {

		
							fbShopping.push({
								lat: fbShoppingSliced[i].location.latitude,
								lng: fbShoppingSliced[i].location.longitude
							})

						}

						// console.log(fbShoppingSliced)
						// console.log(fbShopping)


					var shoppingLabels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

						var shoppingMarkers = fbShopping.map(function(location, i) {
								
								return new google.maps.Marker({
									position: new google.maps.LatLng(location.lat, location.lng),
									label: shoppingLabels[i % shoppingLabels.length]
								})	
							
						})

						var shoppingMarkerCluster = new MarkerClusterer(map, shoppingMarkers, {
							imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
						})
			
			})

					
		})
						

	})

	$('#newCityButton').on('click', function(){

		$('#locationTextField').val('')
		$('.modal').modal('show')
		$('.modal').on('shown.bs.modal', function() {
			$("#locationTextField").focus();
		});
	})


