var globalPlaces;
var map;

function initialize() {
  // var initialLocation;
  var london = new google.maps.LatLng(51.50582506134367, -0.11665589599611614);

  var markers = [];
  var myOptions = {
    zoom: 12,
    maxZoom: 16, 
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  window.map = new google.maps.Map(document.getElementById("map-canvas"), myOptions);

  window.map.setCenter(london);

  // Create the search box and link it to the UI element.
  var input = /** @type {HTMLInputElement} */(
      document.getElementById('pac-input'));
  window.map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  var searchBox = new google.maps.places.SearchBox(
    /** @type {HTMLInputElement} */(input));

  // [START region_getplaces]
  // Listen for the event fired when the user selects an item from the
  // pick list. Retrieve the matching places for that item.
  google.maps.event.addListener(searchBox, 'places_changed', function() {
    var places = searchBox.getPlaces();
    window.globalPlaces = places;

    if (places.length == 0) {
      $("#select-place-hide").hide()
      return;
    } else {
    	$("#select-place-hide").show()
    };
    for (var i = 0, marker; marker = markers[i]; i++) {
      marker.setMap(null);
    }

    // For each place, get the icon, place name, and location.
    markers = [];
    var bounds = new google.maps.LatLngBounds();
    for (var i = 0, place; place = places[i]; i++) {
      var image = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };

      // Create a marker for each place.
      var marker = new google.maps.Marker({
        map: window.map,
        icon: image,
        title: place.name,
        position: place.geometry.location
      });

      markers.push(marker);

      bounds.extend(place.geometry.location);
    }

    window.map.fitBounds(bounds);
  });
  // [END region_getplaces]

  // Bias the SearchBox results towards places that are within the bounds of the
  // current map's viewport.
  google.maps.event.addListener(window.map, 'bounds_changed', function() {
    var bounds = window.map.getBounds();
    searchBox.setBounds(bounds);
  });
}

		// google.maps.event.addDomListener(window, 'load', initialize);


function get_address_element(address_components,element_name) {
	for (var i = 0; i < address_components.length; i++) {
		for (var y = 0; y < address_components[i]['types'].length; y++) {
			if (address_components[i]['types'][y] == element_name) {
				return address_components[i]['long_name']
			} 
		}
	}
}

$(".merchants.edit").ready(function() {


	// google.maps.event.addDomListener(window, 'load', initialize);
	$(document).ready(function() {
		$("#collapse-map").collapse({toggle: false});
		$("#collapse-map").on('shown.bs.collapse',function(){
			if( window.map == undefined) {
				initialize();
			}
		})
	})
	

  $(function() {
    $("#select-place").click(function() {
      $('input[name="merchant[name]"]').attr("value",window.globalPlaces[0]['name']);
      $('input[name="merchant[phone_number]"]').attr("value",window.globalPlaces[0]['international_phone_number']);
      $('input[name="merchant[website]"]').attr("value",window.globalPlaces[0]['website']);
      $('input[name="merchant[address1]"]').attr("value",window.globalPlaces[0]['vicinity']);
      $('input[name="merchant[address2]"]').attr("value",get_address_element(window.globalPlaces[0]['address_components'],'political'));

      $('input[name="merchant[postcode]"]').attr("value",get_address_element(window.globalPlaces[0]['address_components'],'postal_code'));
      $('input[name="merchant[city]"]').attr("value",get_address_element(window.globalPlaces[0]['address_components'],'postal_town'));
      $('input[name="merchant[country]"]').attr("value",get_address_element(window.globalPlaces[0]['address_components'],'country'));

      $('input[name="merchant[google_place_id]"]').attr("value",window.globalPlaces[0]['place_id']);
      $('input[name="merchant[google_url]"]').attr("value",window.globalPlaces[0]['url']);
      $('input[name="merchant[google_rating]"]').attr("value",window.globalPlaces[0]['rating']);
      $('input[name="merchant[google_num_reviews]"]').attr("value",window.globalPlaces[0]['user_ratings_total']);
      $('input[name="merchant[google_price_level]"]').attr("value",window.globalPlaces[0]['price_level']);
      $('input[name="merchant[lat]"]').attr("value",window.globalPlaces[0]['geometry']['location']['A']);
      $('input[name="merchant[lng]"]').attr("value",window.globalPlaces[0]['geometry']['location']['F']);

      return false;
    })
  })
})