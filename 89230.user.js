// ==UserScript==
// @name           Facebook Places - With Google Maps
// @namespace      http://swaroop.in
// @description    Facebook places by default has Bing maps, but if you wish to have Google Maps instead. This is the right script for you
// @include        http://www.facebook.com/pages/*
// @include        http://facebook.com/pages/*
// @include        https://www.facebook.com/pages/*
// @include        https://facebook.com/pages/* 		
// ==/UserScript==

function fetchLatitudeAndLongitude () {
    try {
	
	    GM_log('Start looking for the pagelet_place_info');
        // A pain to drill down to find the right element - you need to know the id or name of the element.
        // This will be replaced with JQuery later - don't worry - the logic won't change
        var divPagelet_Place_info = document.getElementById('pagelet_info');
        GM_log('Found pagelet_place_info');
       
		// 0/1/1/0/0		
        bingImgReference = divPagelet_Place_info.childNodes[0].childNodes[1].childNodes[1].childNodes[0].childNodes[0];      
		
		GM_log("Found Bing Image = " + bingImgReference.outerHTML);
       
        var bingMapsImageSrc = bingImgReference.src;
        GM_log('bingMapsImageSrc = ' + bingMapsImageSrc);
       
        // If the current image is already replaced, don't spend more time constructing a Google Maps image again
        if(alreadyReplacedNew(bingImgReference)) { return; }
       
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
       
        var imageWidth = bingImgReference.width;
        var imageHeight = bingImgReference.height + 200;
       
        var googleMapsDimensions = imageWidth + 'x' + imageHeight;
       
        var latlong = latitude + ',' + longitude;
        var googleMapsStaticURL = 'http://maps.google.com/maps/api/staticmap?center=' + latlong + '&zoom=14&size=' + googleMapsDimensions + '&sensor=false&markers=color:red|label:.|' + latlong;
        bingImgReference.src = googleMapsStaticURL;
        bingImgReference.height = imageHeight;
       
        GM_Log('Facebook places - now replaced Bing Maps with Static Google Map image');
       
    } catch(ex) {
        GM_log("Error encountered " + ex.description);
    }
}

/*
    Checks using a variable if the maps image has been replaced
*/
function alreadyReplacedNew(bingImageRef) {
    var src = bingImageRef.src;
    if(src.indexOf('http://maps.google.com') >= 0) {
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
    var parameters = fullURL.slice(fullURL.indexOf('?')+1);
    // GM_log('Paramters = ' + parameters);
    var paramArray = parameters.split('&');
    for(var a=0; a<paramArray.length; a++) {
        var eachParam = paramArray[a];
        // GM_log('Param[' + a + '] = ' + eachParam);
        var eachParamArray = eachParam.split('=');
        // GM_log('Key = ' + eachParamArray[0] + ' Param = ' + eachParamArray[1]);
        if(eachParamArray[0] == paramName) {
            return eachParamArray[1];
        }
    }
}

// Wait till the page has loaded
if (!window.top || top.location.href == window.location.href) {
  setInterval(function() {
    fetchLatitudeAndLongitude();
  }, 2000);
}
