const latitude = document.querySelector("#latitude").innerHTML
const longitude = document.querySelector("#longitude").innerHTML

function startMap() {
    const penaLocation = {
        lat: Number(latitude),
        lng: Number(longitude)
      };
    const map = new google.maps.Map(
      document.getElementById('map'),
      {
        zoom: 15,
        center: penaLocation
      }
    );

    placePenas(map, penaLocation)
  }


  function placePenas(map, penaLocation) {
    new google.maps.Marker({
      position: penaLocation,
      map: map
    })
  }

 
  
  startMap();
  