function initialize() {
    var mapOptions = {
        center: { lat: 37.091, lng: -76.478},
        zoom: 16
    };
    var map = new google.maps.Map(document.getElementById('map-canvas'),mapOptions);

    // Creating a marker and positioning it on the map  
    var marker = new google.maps.Marker({  
        position: new google.maps.LatLng(37.091, -76.478),  
        title: 'Big Gym',
        url: "https://www.google.it/maps/place/37%C2%B005'27.6%22N+76%C2%B028'40.8%22W/@37.091,-76.478,17z/data=!3m1!4b1!4m2!3m1!1s0x0:0x0?hl=en",
        map: map  
    });
    google.maps.event.addListener(marker, 'click', function() {
        window.location.href = "https://www.google.it/maps/place/37%C2%B005'27.6%22N+76%C2%B028'40.8%22W/@37.091,-76.478,17z/data=!3m1!4b1!4m2!3m1!1s0x0:0x0?hl=en";
    });
}