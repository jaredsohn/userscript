// ==UserScript==
// @name          Google Maps in Flickr
// @version	  4.0
// @description   GMiF - Display Google Maps in flickr
// @namespace     http://webdev.yuan.cc/
// @include       http://www*.flickr.com/photos/*
// @include       http://flickr.com/photos/*

// Whats New
// =========
// v4.0   5/01/06 Support Google Maps API 2.0
// v3.5   6/11/05 Bugs fixed to work with Firefox 1.5Beta + GM0.6.2 and Flock
// v3.0    4/8/05 1. Load GMiF js library dynamically
//		  2. Can 'play' geotagged photostream
//		  3. New icon and infobox when displaying where photo owner is
//		  4. User can specify a geotagged photo to be her/his location icon
// v2.3   31/7/05 1. Add the owner's geotagged photostream below the map
//		  2. Display the city on map where the photo owner lives in
//		  3. 'Fly To' button and {FLYTO_KML} macro now use RobRoyAus's FlickFly
//		  4. Upgrade to maps.14.js
// v2.2.1 21/7/05 Temporary fix to replace GM APIs with cookies and XMLHttpRequest 
// v2.2   19/7/05 Add an option dialog box to GMiF. Current options are:
//		  1. Customized description/comment (with MACRO support)
//		  2. Default map type: Map or Satellite
//		  3. Enable/disable japandatumhacks
// v2.1.1 16/7/05 Fix the map shift problem between WGS84 Datum and Tokyo Datum
// v2.1   14/7/05 Upgrade to maps.11.js to show Japanese map 
//		  Change the pin color of nearby photos to blue
//		  Non-owner can't place marker
// v2.0   13/7/05 Named GMiF officially
//		  Get nearby photos from http://www.geobloggers.com/makeXML.cfm
//		  Geocoded photos are supported
//		  Fly-To feature for Google Earth is added
// v1.7   12/7/05 Steeev added functions to add geotags, comments, and desc at a click-at-once
// v1.6   11/7/05 A toolbar with Lat/Lon box,favorite places,some map controls,and etc...
// v1.5.1  8/7/05 Fix the comments overlap problem caused by a transparent gif photo
// v1.5    6/7/05 A toolbar is added above gmap. (large map, hide map, lengthen map)
// v1.4    6/7/05 CK hide gmap div instead of deleting div
// v1.4    6/7/05 CK add an internal link to jump down to the map
// v1.3    5/7/05 Billy fixed a bug that occured when a picture was posted in the comments of an image
// v1.2    5/7/05 Billy fixed the gmap resize problem and put gmap under the photo
// v1.1    4/7/05 Fix photo notes overlay problem
// v1.0    3/7/05 Capability to add geotags and post to geobloggers
// v0.9    2/7/05 Upgrade to maps.10.js
// v0.1   28/6/05 Initial release, embed gmap into flickr
//
// Description
// ===========
// This script will display Google Maps if the photo is geotagged. 
//
// Official Group: http://www.flickr.com/groups/flickr_tools/
// GeoTagging Flickr group: http://www.flickr.com/groups/geotagging/
// Geobloggers: http://www.geobloggers.com/ 
//
// Credits
// =======
// v0.1 Created by .CK ( http://www.flickr.com/photos/ckyuan/ )
//    - Initial product
// v1.2 Modified by Billy ( http://www.flickr.com/photos/cowfish/ )
//    - Have Gmap to appear under flickr photo and fix Gmap resize problem
//    - Fix many bugs in v1.2 v2.1
// v1.4 Suggestion from Steeev ( http://www.flickr.com/photos/steeev/ )
//    - Add internal link to jump down to the map
// v1.7 Code contribution from Steeev ( http://www.flickr.com/photos/steeev/ )
//    - 1 click add of geotags
//    - 1 click add of description or comment
//    - 1 click post to geobloggers (and get response whether it worked or failed)
//      or alternatively 1 click to do all the above functions :)
// v2.3 'Fly To' launches FlickFly by RobRoyAus ( http://www.flickr.com/photos/robroy/ )
//
// ==/UserScript==


(function() {

    var re = /http:\/\/(www\.)?flickr\.com\/photos\/[^\/]+\/\d+\/?/;
    if( !re.test(document.location) ) return;

    if(unsafeWindow) w = unsafeWindow;
    else w = window;
    global_photos = w.global_photos;

    GMiF_GMAPI = true;
    GMiF_getValue = function(key, defaultValue) {

	if(GMiF_GMAPI) return GM_getValue(key,defaultValue);
	else {
	    if( _get_cookie(key) == undefined ) return defaultValue;
	    else {
		_set_cookie(key, _get_cookie(key),1000);
		return _get_cookie(key);
	    }
	}
    }

    GMiF_setValue = function(key,value) {
	if(GMiF_GMAPI) GM_setValue(key, value);
	else _set_cookie(key,value,1000);
    }

    GMiF_xmlhttpRequest = function(req) {

	if(GMiF_GMAPI) GM_xmlhttpRequest(req);
	else {
	    var xmlhttp = new XMLHttpRequest();
	    xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState==4) {
		    if (xmlhttp.status==200) req.onload(xmlhttp);
		}
	    }
	    xmlhttp.open(req.method, req.url, true);
	    xmlhttp.send(null);
	}
    }

    for(var i in global_photos) {
	global_photos[i].getValue = GMiF_getValue;
	global_photos[i].setValue = GMiF_setValue;
	global_photos[i].xmlhttpRequest = GMiF_xmlhttpRequest;
    }

    var js = document.createElement("script");
    js.language = "javascript";
    js.src = "http://webdev.yuan.cc/gmif/gmif_v4.0.js";
    document.body.appendChild(js);

})();

