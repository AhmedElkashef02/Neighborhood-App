var map;

var locations = [
  {title: 'Marhaba Restaurant', location: {lat: 29.995796, lng: 31.159291}},
  {title: 'Spectra Restaurant & Cafe', location: {lat: 29.993909, lng: 31.160769}},
  {title: 'HSBC Bank Egypt', location: {lat: 29.994082, lng: 31.161756}},
  {title: 'Hardees Restaurant', location: {lat: 29.994366, lng: 31.160844}},
  {title: 'Mobile Shop', location: {lat:29.994541, lng: 31.161083}},
  {title: 'Metro Market', location: {lat: 29.994368, lng: 31.16008931}},
  {title: 'Kebda Fathy', location: {lat: 29.994366, lng: 31.159492}},
  {title: 'BiscoMisr Haram', location: {lat: 29.995045, lng: 31.160481}},
  {title: 'Aspats Private School', location: {lat: 29.993638, lng: 31.161312}},
  {title: 'HSBC ATM', location: {lat:29.994429, lng: 31.159993}},
  {title: 'AlHaram Hospital', location: {lat: 29.993368, lng: 31.160473}},
  {title: 'Shopping Mall', location: {lat:29.994262, lng: 31.160438}},
  {title: 'Wang Fu Restaurant', location: {lat:29.993836, lng: 31.159316}}
];

// New Array that will hold the listings of the markers
var markers = [];

function initMap() {
  // Create an InfoWindow
  this.largeInfowindow = new google.maps.InfoWindow();
  // Create a new map
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 29.9942453, lng: 31.1604205},
    zoom: 18,
    mapTypeControl: false
  });
  // Creating new markers for all locations
  for (var i = 0; i < locations.length; i++) {
    var marker = new google.maps.Marker({
      position: locations[i].location,
      title: locations[i].title,
      animation: google.maps.Animation.DROP,
      id: i
    });
    markers.push(marker);
    marker.addListener('click', function() {
      this.setAnimation(4);
    });
    marker.addListener('click', function() {
      decideInfoWindow(largeInfowindow, this);
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

// intermediary function to just use one infowindow
this.decideInfoWindow = function(infowindow, event, marker = 0) {
  console.log("infowindow:",infowindow);
  console.log("event:",event);
  console.log("marker",marker);
  if (event) { // if clicked from sidebar
    //use event and infowindow
    for(var i = 0; i < markers.length; i++) {
      if(markers[i].title == event.title) {
        var marker = markers[i];
      }
    }
    if (this.largeInfowindow.marker != marker) {
      console.log(infowindow);
      this.largeInfowindow.marker = marker;
      this.largeInfowindow.setContent('<div>' + marker.title + '</div>');
      this.largeInfowindow.open(map, marker);
      // Make sure the marker property is cleared if the infowindow is closed.
      this.largeInfowindow.addListener('closeclick', function() {
        this.largeInfowindow.marker = null;
      });
    }

  } if (!event) { // if clicked on marker itself use marker and infowindow
    populateInfoWindow(marker, this.largeInfowindow);
  }
}

function openMarker(event) {
  for(var i = 0; i < markers.length; i++) {
    if(markers[i].title == event.title) {
      var marker = markers[i];
    }
  }
  populateInfoWindow(marker, new google.maps.InfoWindow());
}
