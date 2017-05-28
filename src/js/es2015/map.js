// GOOGLE MAPS

var map;
function initMap() {
  map = new google.maps.Map(document.querySelector('.js-google-map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 8
  });
}
