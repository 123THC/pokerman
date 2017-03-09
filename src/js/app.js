/* global google:true */

$(()=>{

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

  function initSingleMap() {
    const lat = $('#map').data('lat');
    const lng = $('#map').data('lng');
    const latLng = { lat, lng };

    const map = new google.maps.Map($('#map').get(0), {
      zoom: 14, //this is out of 20
      center: latLng,
      scrollwheel: false
    });

    new google.maps.Marker({
      position: latLng,
      map
    });
  }

  function initMap() {

    const $maps = $('.indexMap');

    $.each($maps, (index, element) => {

      const mapDiv = $(element);
      const lat = mapDiv.data('lat');
      const lng = mapDiv.data('lng');
      const latLng = { lat, lng };

      const map = new google.maps.Map(mapDiv.get(0), {
        zoom: 14, //this is out of 20
        center: latLng,
        scrollwheel: false
      });

      new google.maps.Marker({
        position: latLng,
        map
      });

    });


  }

  initMap();

});
