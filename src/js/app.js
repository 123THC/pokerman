/* global google:true */

const $reserve = $('.reserve');


$(()=>{

  initMap();
  
  function initMap() {
    const lat = 51.515209;
    const lng = -0.072132;
    const latLng = { lat, lng };

    const map = new google.maps.Map(document.getElementById('map'), {
      zoom: 12,
      center: latLng,
      scrollwheel: false
    });

    $.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${user.address.line1}+${ user.address.city}+${user.address.postcode}&key=AIzaSyDOJ2tNdb1wTDfSamg1xj7vWR_w8SiLGsc`)
    .done((data)=>{
      const position = {lat: data.results[0].geometry.location.lat, lng: data.results[0].geometry.location.lng };

      new google.maps.Marker({
        position,
        map
      });
    });

  }

  const seatsRemaining = $('.seatsRemaining');
  let seatsAvailable = +seatsRemaining.html();
  function reserveSeat(e) {
    e.preventDefault;
    // take 1 from the seats available
    // push the game details into the array of games attending for the user
    // change the reserve a seat button to be disabled for that user and innerHTML to be RESERVED

    seatsAvailable--;
    console.log(seatsAvailable);
    console.log(seatsRemaining.html());
    return seatsRemaining.html(seatsAvailable);

  }

  $reserve.on('click', reserveSeat);


});
