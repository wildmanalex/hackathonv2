function initMap(){

	var center = new google.maps.LatLng(51.5074, 0.1278);

	var map = new google.maps.Map(document.getElementById('map'), {
	  zoom: 3,
	  center: center,
	  mapTypeId: google.maps.MapTypeId.ROADMAP
	});



	// var markers = [];
	// for (var i = 0; i < 100; i++) {
	//   var dataPhoto = data.photos[i];
	//   var latLng = new google.maps.LatLng(dataPhoto.latitude,
	// 	  dataPhoto.longitude);
	//   var marker = new google.maps.Marker({
	// 	position: latLng
	//   });
	//   markers.push(marker);
	// }
	//
	// var options = {
	// 	imagePath: 'https://gmaps-marker-clusterer.github.io/gmaps-marker-clusterer/assets/images/m'
	// };
	//
	// var markerCluster = new MarkerClusterer(map, markers, options);
}
$.get(`/search`, function(googleData, status){

		googleData = JSON.parse(googleData)

		console.log(googleData)

		// var latitude = googleData.results[0].geometry.location.lat
		// var longitude = googleData.results[0].geometry.location.lng
	})


// var mainVm = new Vue({
//
//     el: '#app',
//     data: {
// 		userinput:'',
// 		fbLocations:[],
// 		parks:[],
// 		restaurants:[],
//
//     },
//
//
//
// 	methods: {
//
// 			// $.get('/search', function(googleData, status){
// 			// 		googleData = JSON.parse(googleData)
// 			//
// 			// 		console.log(googleData)
// 			//
// 			// 		var latitude = googleData.results[0].geometry.location.lat
// 			// 		var longitude = googleData.results[0].geometry.location.lng
// 			// 	}
//
// //GET REQUEST TO FACEBOOK
//
// 					$.get(`/place?center=${latitude},${longitude}`, function(facebookData, status){
//
// 						facebookData = JSON.parse(facebookData)
//
// 						console.log(facebookData)
//
// 						// console.log(facebookData.checkins)
//
// 						for(var i = 0; i < facebookData.data.length; i++){
//
// 							// console.log(facebookData.data[i].checkins)
//
// 		//PUSH AND SORT LOCATIONS ARRAY
//
// 								mainVm.fbLocations.push(facebookData.data[i])
//
// 								mainVm.fbLocations.sort(function(a,b) {
//
// 									return b.checkins - a.checkins
// 								})
//
// 		//PUSH PARKS ARRAY
//
// 							if (facebookData.data[i].category === 'Park') {
//
// 								mainVm.parks.push(facebookData.data[i])
// 							}
//
// 		//PUSH RESTAURANTS ARRAY
//
// 							if (facebookData.data[i].category === 'Restaurant') {
//
// 								mainVm.restaurants.push(facebookData.data[i])
// 							}
//
// 						}
// 								console.log(mainVm.fbLocations)
// 								console.log(mainVm.parks)
// 								console.log(mainVm.restaurants)
//
// 					})
// 			})
// 		}
// 	},
// })
