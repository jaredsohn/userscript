// ==UserScript==
// @name		Facebook Places - With Google Maps - SC
// @namespace	http://bluelovers.net
// @description	Facebook places by default has Bing maps, but if you wish to have Google Maps instead. This is the right script for you
//
// @author		Swaroop
// @author		bluelovers
//
// @include		http://www.facebook.com/pages/*
// @include		http://facebook.com/pages/*
// @require		http://code.jquery.com/jquery-latest.pack.js
// ==/UserScript==

$(function() {
	function fetchLatitudeAndLongitude() {
		try {

			GM_log('Start looking for the pagelet_place_info');
			// A pain to drill down to find the right element - you need to know the id or name of the element.
			// This will be replaced with JQuery later - don't worry - the logic won't change
/*
		var divPagelet_Place_info = document.getElementById('pagelet_info');
		*/
			var divPagelet_Place_info = $('#pagelet_info .mtm');
			GM_log('Found pagelet_place_info');

			// 0/1/1/0/1
/*
        bingImgReference = divPagelet_Place_info.childNodes[0].childNodes[1].childNodes[1].childNodes[0].childNodes[1];
        */
			var bingImgReference = $('img.img', divPagelet_Place_info);
			GM_log("Found Bing Image = " + bingImgReference);

/*
		var bingMapsImageSrc = bingImgReference.src;
		*/
			var bingMapsImageSrc = bingImgReference.attr('src');
			GM_log('bingMapsImageSrc = ' + bingMapsImageSrc);

			// If the current image is already replaced, don't spend more time constructing a Google Maps image again
			if (alreadyReplacedNew(bingImgReference)) {
				return;
			}

			var coordinateURL = fetchURLParameter(bingMapsImageSrc, 'url');
			coordinateURL = unescape(coordinateURL);
			coordinateURL = unescape(coordinateURL);

			GM_log('Coordinate URL = ' + coordinateURL);
			var coordinates = fetchURLParameter(coordinateURL, 'ppl');
			//GM_log('Coordinates = ' + coordinates);

			// would be in the format xxxx,,latitude,longitude
			var coordinatesArray = coordinates.split(',');
			var latitude = coordinatesArray[2];
			var longitude = coordinatesArray[3];
			GM_log('Latitude = ' + latitude + ' Longitude = ' + longitude);

/*
		var imageWidth = bingImgReference.width;
        var imageHeight = bingImgReference.height + 200;
        */
			var imageWidth = intval(bingImgReference.attr('width'));
			var imageHeight = intval(bingImgReference.attr('height')) + 200;

			var googleMapsDimensions = imageWidth + 'x' + imageHeight;

			var latlong = latitude + ',' + longitude;
			var googleMapsStaticURL = 'http://maps.google.com/maps/api/staticmap?center=' + latlong + '&zoom=14&size=' + googleMapsDimensions + '&sensor=false&markers=color:red|label:.|' + latlong;
/*
		bingImgReference.src = googleMapsStaticURL;
        bingImgReference.height = imageHeight;
        */
			bingImgReference.attr('src', googleMapsStaticURL).height(imageHeight);

			GM_log('Facebook places - now replaced Bing Maps with Static Google Map image');

			var googleMapsURL = 'http://maps.google.com/maps?q=' + latlong;

			GM_log('googleMapsURL - ' + googleMapsURL);

			divPagelet_Place_info.on('click', 'img, a', function(event) {
				doane(event);
				window.open(googleMapsURL);
			});

			GM_log('now click divPagelet_Place_info will open googleMapsURL');

		} catch (ex) {
			GM_log("Error encountered " + ex.description + ex.message);
		}
	}

/*
    Checks using a variable if the maps image has been replaced
*/

	function alreadyReplacedNew(bingImageRef) {
/*
    var src = bingImageRef.src;
    */
		var src = $(bingImageRef).attr('src');
		if (src.indexOf('http://maps.google.com') >= 0) {
			GM_log('Google Maps already loaded, skipping');
			return true;
		} else {
			GM_log('Google Maps not loaded, loading now');
			return false;
		}
	}

	// Fetch the URL parameter from your "http://yoururl/someAction?param1=value1&param2=value2"
	// works with "?param1=value1&param2=value2"

	function fetchURLParameter(fullURL, paramName) {
		var parameters = fullURL.slice(fullURL.indexOf('?') + 1);
		// GM_log('Paramters = ' + parameters);
		var paramArray = parameters.split('&');
		for (var a = 0; a < paramArray.length; a++) {
			var eachParam = paramArray[a];
			// GM_log('Param[' + a + '] = ' + eachParam);
			var eachParamArray = eachParam.split('=');
			// GM_log('Key = ' + eachParamArray[0] + ' Param = ' + eachParamArray[1]);
			if (eachParamArray[0] == paramName) {
				return eachParamArray[1];
			}
		}
	}

	// Wait till the page has loaded
/*
if (!window.top || top.location.href == window.location.href) {
  setInterval(function() {
    fetchLatitudeAndLongitude();
  }, 2000);
}
*/

	fetchLatitudeAndLongitude();

	/**
	 * @link http://phpjs.org/functions/intval:435
	 */

	function intval(mixed_var, base) {
		// Get the integer value of a variable using the optional base for the conversion
		//
		// version: 1109.2015
		// discuss at: http://phpjs.org/functions/intval    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
		// +   improved by: stensi
		// +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
		// +   input by: Matteo
		// +   bugfixed by: Brett Zamir (http://brett-zamir.me)    // +   bugfixed by: Rafa? Kukawski (http://kukawski.pl)
		// *     example 1: intval('Kevin van Zonneveld');
		// *     returns 1: 0
		// *     example 2: intval(4.2);
		// *     returns 2: 4    // *     example 3: intval(42, 8);
		// *     returns 3: 42
		// *     example 4: intval('09');
		// *     returns 4: 9
		// *     example 5: intval('1e', 16);    // *     returns 5: 30
		var tmp;

		var type = typeof(mixed_var);
		if (type === 'boolean') {
			return +mixed_var;
		} else if (type === 'string') {
			tmp = parseInt(mixed_var, base || 10);
			return (isNaN(tmp) || !isFinite(tmp)) ? 0 : tmp;
		} else if (type === 'number' && isFinite(mixed_var)) {
			return mixed_var | 0;
		} else {
			return 0;
		}
	}

	function doane(event, preventDefault, stopPropagation) {

		if ($.type(preventDefault) == 'undefined') preventDefault = 1;
		if ($.type(stopPropagation) == 'undefined') stopPropagation = 1;

		if (preventDefault) event.preventDefault();
		if (stopPropagation) event.stopPropagation();

		return false;
	}

});