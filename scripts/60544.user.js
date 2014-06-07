// ==UserScript==
// @name          Flickr Geo
// @namespace     http://jeffpalm.com/flickrgeo/
// @description   Provides map showing location of Flickr images
// @include       http://*flickr.com/photos/*
// ==/UserScript==

/*
 * Copyright 2009 Jeffrey Palm.
 */
const TESTING = false;

var targetNode;

function imageURL(id,secret,server,farm,kind) {
	// http://www.flickr.com/services/api/misc.urls.html
	var s = 'http://';
	if (farm) s += 'farm' + farm + '.';
	s += 'static.flickr.com/' + server + '/' + id + '_' + secret;
	if (kind && kind != '-') s += '_' + kind;
	s += '.jpg';			
	return s;
}

function getOriginalURL(xml) {
	// http://farm4.static.flickr.com/3104/2918903103_b0e4532f75_o.jpg
	var photo = xml.getElementsByTagName("photo")[0];
	var id     = photo.getAttribute("id");
	var secret = photo.getAttribute("originalsecret");
	if (!secret) secret = photo.getAttribute("secret");
	var server = photo.getAttribute("server");
	var farm = photo.getAttribute("farm");
	return imageURL(id,secret,server,farm,'o');
}

function parseAndShowCoords(xml) {
	var loc = xml.getElementsByTagName("location")[0];
	if (!loc) return false;
	var lat = loc.getAttribute("latitude");
	var lng = loc.getAttribute("longitude");
	if (!lat || !lng) return false;
	showCoords(lat,lng);
	return true;
}

function showNotFound() {
	targetNode.innerHTML = "not found";
}

function showCoords(lat,lng) {
	if (!lat || !lng) {
		showNotFound();
		return;
	}
	var w = 170;
	var h = 170;
	var url = 'http://jeffpalm.com/flickrgeo/map.php?lat=' + lat + '&lng=' + lng;
	var iframe = document.createElement("iframe");
	iframe.style.border = "0";
	iframe.style.width = w + "px";
	iframe.style.height = h + "px";
	iframe.style.frameBorder = "0";
	iframe.overflow = 'none';
	iframe.src = url;
	targetNode.innerHTML = '';
	targetNode.appendChild(iframe);
}

function getCoords(oUrl) {
	var url = "http://jeffpalm.com/imageo/coords.php?url=" + oUrl;
	GM_xmlhttpRequest({
			method: 'GET',
				url: url,
				headers: {},
				onload: function(response) {
				var text = response.responseText;
				var parts = text.split(/,/);
				try {
					var lat = parseInt(parts[0]);
					var lng = parseInt(parts[1]);
					showCoords(lat,lng);
				} catch (whoCares) {}
    }
		});
}

function tryToGeocode(id) {
	var url = 'http://www.flickr.com/services/rest?api_key=2dfc6eff0ef4b59e9edc7c1d66f564eb&method=flickr.photos.getInfo&photo_id='
		+ id;
	GM_xmlhttpRequest({
			method: 'GET',
				url: url,
				headers: {},
				onload: function(response) {
				if (!response.responseXML) {
					response.responseXML = new DOMParser().parseFromString(response.responseText, "text/xml");
				}
				//
				// First try to get the coords from the photo info
				//
				if (!parseAndShowCoords(response.responseXML)) {
					//
					// Then go to the dirty little trick
					//
					getCoords(getOriginalURL(response.responseXML));
				}
			}
		});
}

function findIndicatorDiv() {
	var divs = document.getElementsByTagName("DIV");
	for (var i=0; i<divs.length; i++) {
		var d = divs[i];
		if (d.className == "PeopleTagList") return d;
		if (d.className == "TagList") return d;
	}
	return null;
}

function createTargetNode(beforeNode) {
	var d = document.createElement("div");
	beforeNode.parentNode.insertBefore(d,beforeNode);
	d.className = "PeopleTagList";
	var h4 = document.createElement("h4");
	d.appendChild(h4);
	h4.innerHTML = "Location";
	var target = document.createElement("div");
	d.appendChild(target);
	target.innerHTML = "searching...";
	return target;
}

function main() {

	// First find the 'People in this photo' div, if we don't have that,
	// then we're not on the right page
	var d = findIndicatorDiv();
	if (!d) return;

	// Create the new div into which we put stuff
	targetNode = createTargetNode(d);

	// Start the search for the geo location
	var loc = String(document.location);
	var res;
	if ((res = loc.match(/\/(\d+)\//)) || (res = loc.match(/\/(\d+)$/))) {
		var id = res[1];
		tryToGeocode(id);
	}
}

try {main();} catch (e) {if (TESTING) alert("ERROR:" + e);}