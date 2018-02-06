var map;
var client_id = "DCELDDX4LN3VCQOXUN2FW335P5NW0DBSJP1Y0WNQBQ2NRDXK";

var locations = [
  {title: 'Marhaba Restaurant', location: {lat: 29.995796, lng: 31.159291}},
  {title: 'Spectra Restaurant & Cafe', location: {lat: 29.993909, lng: 31.160769}},
  {title: 'HSBC Bank Egypt', location: {lat: 29.994082, lng: 31.161756}},
  {title: 'Hardees Restaurant', location: {lat: 29.994366, lng: 31.160844}},
  {title: 'Mobile Shop', location: {lat:29.994541, lng: 31.161083}},
  {title: 'Metro Market', location: {lat: 29.994368, lng: 31.16008931}},
  {title: 'Kebda Fathy', location: {lat: 29.994366, lng: 31.159492}},
  {title: 'BiscoMisr Haram', location: {lat: 29.995045, lng: 31.160481}},
  {title: 'HSBC ATM', location: {lat:29.994429, lng: 31.159993}},
  {title: 'AlHaram Hospital', location: {lat: 29.993368, lng: 31.160473}},
  {title: 'Shopping Mall', location: {lat:29.994262, lng: 31.160438}},
  {title: 'Wang Fu Restaurant', location: {lat:29.993836, lng: 31.159316}}
];

var undesiredLocations = [];

function ViewModel() {
  var self = this;
  this.markers = [];
  this.searchTerm = ko.observable('');
  this.filteredLocations = ko.observableArray(locations);

  // Filtering the results with the search term.
  // This function hides the unneeded markers, and only displays filtered list
  this.filtration = function() {
    this.showListings();
    this.filteredLocations([]);
    undesiredLocations = [];
    var currentsearchTerm = this.searchTerm();
    // loop through list and make filtered list
    for (var i = 0; i < locations.length; i++) {
      if (locations[i].title.indexOf(currentsearchTerm) !== -1) {
        this.filteredLocations.push(locations[i]);
      } else {
        undesiredLocations.push(locations[i]);
      }
    }
    // remove the undesiredLocations markers
    for (var x = 0; x < this.markers.length; x++) {
      for(var j = 0; j < undesiredLocations.length; j++) {
        if (self.markers[x].title == undesiredLocations[j].title) {
          this.markers[x].setMap(null);
        }
      }
    }
  };

  //
  this.populateInfoWindow = function(marker, infowindow) {
  // Check to make sure the infowindow is not already opened on this marker.
  if (infowindow.marker != marker) {
    infowindow.marker = marker;
    // Block of code to ajax call foursqaure API and get Info
    var title_generic = marker.title.split(" ")[0];
    var url = "https://api.foursquare.com/v2/venues/search?ll=" +
      marker.position.lat() + "," + marker.position.lng() + "&query=" + title_generic +
      "&oauth_token=" + client_id + "&v=20180206";
    $.ajax({
      url: url,
      success: function(response) {
        var resposneObject = response.response.venues[0];
        // Accomodating some not-always Available properties
        if(!resposneObject.location.address) {
          resposneObject.location.address = "Not Available";
        }
        if(!resposneObject.location.city) {
          resposneObject.location.city = "Giza";
        }
        // setting content for markers
        infowindow.setContent('<div>' +
          '<h4>' + marker.title + '</h4>' +
          '<p><strong>Address:</strong>' + resposneObject.location.address + '</p>' +
          '<p>' + resposneObject.location.city + ',' + resposneObject.location.country + '</p>' +
          '</div>');
      }
    }).fail(function() {
        // Send alert
        alert(
          "Sorry, the Foursquare API has experienced some errors. Please refresh your page to try again."
        );
      });
      // End Of foursqaure API code
      infowindow.open(map, marker);
      // Make sure the marker property is cleared if the infowindow is closed.
      infowindow.addListener('closeclick', function() {
        infowindow.marker = null;
      });
    }
  };

  // Opens the same marker that was clicked on from the list
  this.openFromList = function(event) {
    for (var i = 0; i < self.markers.length; i++) {
      if (self.markers[i].title == event.title) {
        this.marker = self.markers[i];
        break;
      }
    }
    self.populateInfoWindow(this.marker, self.largeInfoWindow);
    this.marker.setAnimation(google.maps.Animation.BOUNCE);
    setTimeout((function() {
      this.marker.setAnimation(null);
    }).bind(this), 700);
  };

  // Shows all markers on the load of the map
  this.showListings = function() {
    this.bounds = new google.maps.LatLngBounds();
    // Extend the boundaries of the map for each marker and display the marker
    for (var i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(map);
      this.bounds.extend(this.markers[i].position);
    }
    map.fitBounds(this.bounds);
  };

  // Hides all markers
  this.hideListings = function() {
    for (var i = 0; i < this.markers.length; i++) {
      for (var j = 0; j < undesiredLocations.length; j++) {
        if (self.markers[i].title == undesiredLocations[j].title) {
          this.markers[i].setMap(null);
        }
      }
    }
  };

  // Initializing the map
  this.initMap = function() {
    // Create an InfoWindow
    this.largeInfoWindow = new google.maps.InfoWindow();
    // Create a new map
    map = new google.maps.Map(document.getElementById('map'), {
      center: {
        lat: 29.9942453,
        lng: 31.1604205
      },
      zoom: 18,
      mapTypeControl: false
    });
    // Creating new markers for all locations
    function clickTopopulate() {
      self.populateInfoWindow(this, self.largeInfoWindow);
    }
    for (var i = 0; i < locations.length; i++) {
      this.title = locations[i].title;
      this.position = locations[i].location;
      this.marker = new google.maps.Marker({
        position: this.position,
        title: this.title,
        animation: google.maps.Animation.DROP,
        id: i
      });
      this.markers.push(this.marker);
      this.marker.addListener('click', function() {
        this.setAnimation(4);
      });
      // add an infowindow populator function
      this.marker.addListener('click', clickTopopulate);
    }

    this.showListings();
  };
  this.initMap();

  // Toggles the sidebar on front-end
  this.toggleClass = function(data, event) {
    var wrapperClasses = document.getElementById("wrapper").classList;
    if (wrapper.classList[0] == "toggled") {
      wrapperClasses.remove("toggled");
    } else {
      wrapperClasses.add("toggled");
    }
  };

}

// applyBindings and fire the app
function fireApp() {
  ko.applyBindings(new ViewModel());
}
