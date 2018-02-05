var ViewModel = function() {
  var self = this;
  self.locations = locations;
  self.markersList = markers;
  self.toggleClass = function(data, event) {
    var wrapperClasses = document.getElementById("wrapper").classList;
    if (wrapper.classList[0] == "toggled") {
      wrapperClasses.remove("toggled");
    } else {
      wrapperClasses.add("toggled");
    }
  }
}

ko.applyBindings(new ViewModel())
