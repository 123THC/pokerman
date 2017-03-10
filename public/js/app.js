'use strict';

/* global google:true */

$(function () {

  $('form').validate({
    rules: {
      username: {
        required: true,
        remote: {
          url: '/register/checkUsername',
          type: 'GET'
        }
      }
    },
    messages: {
      username: {
        remote: 'That username is already taken'
      }
    }
  });

  if ($('#map').length) initSingleMap();

  var $autocomplete = $('.autocomplete');

  if ($autocomplete.length) {
    var autocomplete = new google.maps.places.Autocomplete($autocomplete[0]);
    autocomplete.addListener('place_changed', function () {
      var latLng = autocomplete.getPlace().geometry.location.toJSON();
      var address = $autocomplete.val().split(', ');
      $('[name="address[line1]"]').val(address[0]);
      $('[name="address[city]"]').val(address[1]);
      $('[name="address[country]"]').val(address[2]);
      $('[name=lat]').val(latLng.lat);
      $('[name=lng]').val(latLng.lng);
    });
  }

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