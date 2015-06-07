function initialize() {
    var lat, lng; //Coordinates
    var url; //Map url
    
    $.ajax({
        method: "POST",
        crossDomain: true, //localhost purposes
        async: false,
        url: "../../server/getLocation.php", //Relative or absolute path to file.php file
        success: function(response) {
            console.log(JSON.parse(response));
            var location=JSON.parse(response);
 
            for(var i=0;i<location.length;i++){
                lat=location[i].Latitude;
                lng=location[i].Longitude;
                url=location[i].Url;
                console.log(lat);
                console.log(lng);
                $("#address").html(location[i].CivicNumber+" "+location[i].Address+" "+location[i].City+", "+location[i].State+" "+location[i].ZIP+", "+location[i].Country);
            }
        1},
        error: function(request,error) 
        {
            console.log("Error");
        }
    });
    
    var mapOptions = {
        center: new google.maps.LatLng(lat, lng), //37.091 -76.478
        zoom: 16
    };
    var map = new google.maps.Map(document.getElementById('map-canvas'),mapOptions);
    
    // Creating a marker and positioning it on the map  
    var marker = new google.maps.Marker({  
        position: new google.maps.LatLng(lat, lng),  
        title: 'Big Gym',
        url: url,
        map: map  
    });
    google.maps.event.addListener(marker, 'click', function() {
        window.location.href = url;
    });
}