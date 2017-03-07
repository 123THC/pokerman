'use strict';

/* global google:true */

$(function () {

  if ($('#map').length) initSingleMap();

  function initSingleMap() {
    var lat = $('#map').data('lat');
    var lng = $('#map').data('lng');
    var latLng = { lat: lat, lng: lng };

    var map = new google.maps.Map($('#map').get(0), {
      zoom: 14, //this is out of 20
      center: latLng,
      scrollwheel: false
    });

    new google.maps.Marker({
      position: latLng,
      map: map
    });
  }

  function initMap() {

    var $maps = $('.indexMap');

    $.each($maps, function (index, element) {

      var mapDiv = $(element);
      var lat = mapDiv.data('lat');
      var lng = mapDiv.data('lng');
      var latLng = { lat: lat, lng: lng };

      var map = new google.maps.Map(mapDiv.get(0), {
        zoom: 14, //this is out of 20
        center: latLng,
        scrollwheel: false
      });

      new google.maps.Marker({
        position: latLng,
        map: map
      });
    });
  }

  initMap();
});