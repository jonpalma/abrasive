var map, draggable;
$(document).ready(function () {
    google.maps.event.addDomListener(window, 'load', initialize);
});

function initialize() {
    if( $('#googleMap').attr('position') == 'contacto' ) {
        var $lat = 28.649760,
            $long = -106.011807,
            $title = 'Abrasive Solutions';
    }

    var map_canvas = document.getElementById('googleMap');

    var map_options = {
        center: new google.maps.LatLng($lat, $long),
        zoom: 17,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        scrollwheel: false,
        streetViewControl: false,
        //draggable: !("ontouchend" in document)
    };

    map = new google.maps.Map(map_canvas, map_options);

    var marker = new google.maps.Marker({
        position: new google.maps.LatLng($lat, $long),
        map: map,
        title: $title,
        url: 'http://maps.google.com/maps?q=loc:'+String($lat)+','+String($long)
    });

    google.maps.event.addListener(marker, 'click', function() {
        /*window.location.href = this.url;*/
        window.open(this.url,'_blank');
    });
}