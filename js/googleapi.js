var map;

// New Array that will hold the listings of the markers
var markers = [];

function initMap() {
  // Create a new map
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 29.9942453, lng: 31.1604205},
    zoom: 18,
    mapTypeControl: false
  });

  var InfoWindow = new google.maps.InfoWindow();

  // Creating new markers for all locations
  for (var i = 0; i < locations.length; i++) {
    var position = locations[i].location;
    var title = locations[i].title;
    // create marker
    var marker = new google.maps.Marker({
      position: position,
      title: title,
      animation: google.maps.Animation.DROP,
      id: i
    });

    // Push markers to the marker array
    markers.push(marker);
    marker.addListener('click', function() {
      //populateInfoWindow(this, largeInfowindow);
    });
  }
  showListings();
}

function showListings() {
  var bounds = new google.maps.LatLngBounds();
  // Extend the boundaries of the map for each marker and display the marker
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
    bounds.extend(markers[i].position);
  }
  map.fitBounds(bounds);
}
