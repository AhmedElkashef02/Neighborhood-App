var ViewModel = function() {
  var self = this;
  self.locations = [
    {title: 'Marhaba Restaurant', location: {lat: 29.995796, lng: 31.159291}},
    {title: 'Spectra Restaurant & Cafe', location: {lat: 29.993909, lng: 31.160769}},
    {title: 'HSBC Bank Egypt', location: {lat: 29.994082, lng: 31.161756}},
    {title: 'Hardees Restaurant', location: {lat: 29.994366, lng: 31.160844}},
    {title: 'Mobile Shop', location: {lat: 29.994581, lng: 31.161093}},
    {title: 'Metro Market', location: {lat: 29.994368, lng: 31.16008931}},
    {title: 'Kebda Fathy', location: {lat: 29.994366, lng: 31.159492}},
    {title: 'BiscoMisr Haram', location: {lat: 29.995045, lng: 31.160481}},
    {title: 'Aspats Private School', location: {lat: 29.993638, lng: 31.161312}},
    {title: 'HSBC ATM', location: {lat:29.994429, lng: 31.159993}},
    {title: 'AlHaram Hospital', location: {lat: 29.993368, lng: 31.160473}},
    {title: 'Shopping Mall', location: {lat:29.994262, lng: 31.160438}},
    {title: 'Wang Fu Restaurant', location: {lat:29.993836, lng: 31.159316}}
  ];
  self.toggleClass = function(data, event) {
    var wrapperClasses = document.getElementById("wrapper").classList;
    if (wrapper.classList[0] == "toggled") {
      wrapperClasses.remove("toggled");
    } else {
      wrapperClasses.add("toggled");
    }
  }
  self.showLocations = function() {

  }

}

ko.applyBindings(new ViewModel())
