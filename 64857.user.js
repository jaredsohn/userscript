// ==UserScript==
// @name           GowallaToolsFlickr
// @namespace      masukomi.org
// @description    Adds related flickr images to a Gowalla spot by auto-inserting Gowallatools.com's Flickr integration beneath the spot's map
// @include        http://*gowalla.com/spots/*
// @exclude        http://*gowalla.com/spots/*/*
// ==/UserScript==


function addGTFlickr(count){
	var undefined_var;
	if (count === undefined_var || isNaN(count) ){ count = 0;}
	if (count < 10){
		count++;
		try {
			if (true ){//Gowalla != undefined_var && Gowalla.spot != undefined_var){
				if (! document.getElementById('gowallatools-flickr')) {
					var lat = Gowalla.spot.lat;
					var lng = Gowalla.spot.lng;
					var radius = Gowalla.spot.radius;
					var id = Gowalla.spot.url.substr(7);
					var link = document.createElement("link");
					link.setAttribute("rel", "stylesheet");
					link.setAttribute('href', 'http://gowallatools.com/web/flickr/_flickr.css');
					link.setAttribute('type', 'text/css');
					document.getElementsByTagName('head')[0].appendChild(link);
					var gw_flickr_div = document.createElement('div');
					gw_flickr_div.setAttribute('id', 'gowallatools-flickr');
					var gw_iframe = document.createElement('iframe');
					gw_iframe.setAttribute('src', 'http://gowallatools.com/web/flickr/_flickr.php?lat='+lat+'&lng='+lng+'&radius='+radius+'&id='+id);
					gw_flickr_div.appendChild(gw_iframe);
					var map_wrapper = document.getElementById('map-wrapper');
					map_wrapper.parentNode.insertBefore( gw_flickr_div, map_wrapper.nextSibling );
				}
				return true;
			} else {
				// Gowalla is undefined, try again later
				setTimeout("addGTFlickr(" + count+")", 500);
				return false;
			}
		} catch (e){
			//console.log ("oh my: " +e);
			setTimeout("addGTFlickr(" + count+")", 500);
			return false;
		}
	} else {
		return false;
	}
};

var script = document.createElement("script");
script.type = "application/javascript";
script.textContent = "" + addGTFlickr ;
document.getElementsByTagName('head')[0].appendChild(script);

try {
	window.addEventListener(
		'load', 
		addGTFlickr,
		true);
} catch (e){}
