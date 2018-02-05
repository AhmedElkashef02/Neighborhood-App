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
function ViewModel() {
  var self = this;
  this.markers = [];

  this.filtration = function(event) {
    
  }

  this.populateInfoWindow = function(marker, infowindow) {
    // Check to make sure the infowindow is not already opened on this marker.
    if (infowindow.marker != marker) {
      infowindow.marker = marker;
      infowindow.setContent('<div>' + marker.title + '</div>');
      infowindow.open(map, marker);
      // Make sure the marker property is cleared if the infowindow is closed.
      infowindow.addListener('closeclick', function() {
        infowindow.marker = null;
      });
    }
  }

  this.openFromList = function(event) {
    for(var i = 0; i < self.markers.length; i++) {
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

  this.showListings = function() {
    this.bounds = new google.maps.LatLngBounds();
    // Extend the boundaries of the map for each marker and display the marker
    for (var i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(map);
      this.bounds.extend(this.markers[i].position);
    }
    map.fitBounds(this.bounds);
  };

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
      this.marker.addListener('click', function() {
        self.populateInfoWindow(this, self.largeInfoWindow);
      });
    }
    this.showListings();
  };

  this.initMap();

  this.toggleClass = function(data, event) {
    var wrapperClasses = document.getElementById("wrapper").classList;
    if (wrapper.classList[0] == "toggled") {
      wrapperClasses.remove("toggled");
    } else {
      wrapperClasses.add("toggled");
    }
  };

}

function fireApp() {
  ko.applyBindings(new ViewModel());
};
