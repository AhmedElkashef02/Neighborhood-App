var ViewModel = function() {

  this.toggleClass = function(data, event) {
    var wrapperClasses = document.getElementById("wrapper").classList;
    if (wrapper.classList[0] == "toggled") {
      wrapperClasses.remove("toggled");
    } else {
      wrapperClasses.add("toggled");
    }
  }

}

ko.applyBindings(new ViewModel())
