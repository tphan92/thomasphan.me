/*
	aptRender.js
*/
//on ready function
$(function(){
	if ($('.this-neighborhood').attr('content') == 'downtown') {
		neighborhood = downtown;
	} else if ($('.this-neighborhood').attr('content') == 'lictonSprings') {
		neighborhood = lictonSprings;
	} else if ($('.this-neighborhood').attr('content') == 'uDistrict') {
		neighborhood = uDistrict;
	} else if ($('.this-neighborhood').attr('content') == 'westGreenlake') {
		neighborhood = westGreenlake;
	} else if ($('.this-neighborhood').attr('content') == 'eastGreenlake') {
		neighborhood = eastGreenlake;
	}

	renderInfo(neighborhood);
	renderMap(neighborhood);

	$('.image-link').magnificPopup({
		type:'image'
	});
});

function renderInfo(neighborhood) {
	var aptTemplate = $('.apt-template');
	var picTemplate = $('.pic-template');
	var container = $('.apt-container');
	var picContainer = $('.pic-container');
	var instance = aptTemplate.clone();
	var imgInstance;
	var neighborhood;
	var idx;

	instance.find('.apt-name').html(neighborhood.name);
	instance.find('.apt-addr1').html(neighborhood.address1);
	instance.find('.apt-addr2').html(neighborhood.address2);
	instance.find('.apt-units').html(neighborhood.units);
	instance.find('.apt-vacancies').html(neighborhood.vacancies);
	instance.find('.apt-bedroom').html(neighborhood.bedroom);
	instance.find('.apt-bath').html(neighborhood.bath);
	instance.find('.apt-description').html(neighborhood.description);
	for (idx = 0; idx < neighborhood.pic.length; ++idx) {
		var thumb = neighborhood.pic[idx].thumb;
		var image = neighborhood.pic[idx].image;
		var caption = neighborhood.pic[idx].caption;
		imgInstance = picTemplate.clone();
		imgInstance.find('.pic').attr({
			src: thumb, 
			alt: caption
		});
		imgInstance.find('.image-link').attr({href: image});
		imgInstance.find('.caption').html(caption);
		imgInstance.removeClass('template');
		picContainer.append(imgInstance);
	}

	instance.removeClass('template');
	container.append(instance);
} //renderInfo()

function renderMap(neighborhood) {
	var aptMap = new google.maps.Map($('.map-container')[0], {
	    center: new google.maps.LatLng(neighborhood.lat, neighborhood.long), 
	    zoom: 13,                                  
	    mapTypeId: google.maps.MapTypeId.ROADMAP,  
	    streetViewControl: false                  
	});	
	addAptMarker(aptMap, neighborhood);	
} //renderMap()
 
function addAptMarker(aptMap, neighborhood) {
    var apt; 
    var mapMarker; 
  	var infoWindow;

	mapMarker = new google.maps.Marker({
	    map: aptMap,
		position: new google.maps.LatLng(neighborhood.lat, neighborhood.long),
		title: neighborhood.name
	});

   infoWindow = new google.maps.InfoWindow({
	    content: neighborhood.name
	});

   google.maps.event.addListener(mapMarker, 'click', function(){
   		infoWindow.open(aptMap, mapMarker);
   });
} //addAptMarker()

/*
$('.image-link').magnificPopup({ 
	  type: 'image'
		// other options
});

image: {
	markup: '<div class="mfp-figure">'+
	            '<div class="mfp-close"></div>'+
	            '<div class="mfp-img"></div>'+
	            '<div class="mfp-bottom-bar">'+
	              '<div class="mfp-title"></div>'+
	              '<div class="mfp-counter"></div>'+
	            '</div>'+
	          '</div>', // Popup HTML markup. `.mfp-img` div will be replaced with img tag, `.mfp-close` by close button

	cursor: 'mfp-zoom-out-cur', // Class that adds zoom cursor, will be added to body. Set to null to disable zoom out cursor. 
	  
	titleSrc: 'title', // Attribute of the target element that contains caption for the slide.
	// Or the function that should return the title. For example:
	// titleSrc: function(item) {
	//   return item.el.attr('title') + '<small>by Marsel Van Oosten</small>';
	// }

	verticalFit: true, // Fits image in area vertically

	tError: '<a href="%url%">The image</a> could not be loaded.' // Error message
}
*/