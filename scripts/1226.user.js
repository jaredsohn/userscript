// Google Maps UK Traffic Overlay
// version 0.12 BETA!
// 15-07-2005
// Copyright (c) 2005, Michael Pritchard
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Google Maps Fixed Map", and click Uninstall.
//
// Made thanks to http://diveintogreasemonkey.org/
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Google Maps UK Traffic Overlay
// @namespace     http://www.blueghost.co.uk/gmaps_uk_traffic.html
// @description   Adds UK Traffic Overlay
// @include       http://maps.google.*
// @include       http://www.google.co.uk/maps*
// @include       http://www.google.com/maps*
// @exclude		  http://maps.google.com/maps?output=js
// @exclude		  http://maps.google.co.uk/maps?output=js
// @exclude		  http://maps.google.com/mapfiles/maps.12.js
// ==/UserScript==
(function(){

	var county_markers 	= [];
	var map = _m.map; //gmap object
	var tPlace;
	var tLat;
	var tLon;
	var wMarker;
	var traffic_setup	= false;
	var t_markers		= [];
	var wICon;
	var widescreen 		= false;
	var traffic_markers = [];
	var traffic_data	= [];
	var traffic_start	= [];
	var traffic_end		= [];
	var active			= false;
	var moveListener;
	var zoomListener;

	function addGlobalStyle(css) {
    	var head, style;
   	 	head = document.getElementsByTagName('head')[0];
    	if (!head) { return; }
    	style = document.createElement('style');
    	style.type = 'text/css';
    	style.innerHTML = css;
    	head.appendChild(style);
	}
	
	window.createTrafficMarker = function (lat, lon, html, src, type, start, stp,  image, alat, alon) {
		var icon = new GIcon();
		icon.image 		= "http://www.blueghost.pwp.blueyonder.co.uk/bg_site/"+image+".png";
		icon.shadow 	= "http://www.blueghost.pwp.blueyonder.co.uk/bg_site/weather/trans.png";
		icon.iconSize 	= new GSize(19, 40);
		icon.shadowSize = new GSize(1, 1);
		icon.iconAnchor = new GPoint(6, 20);
		icon.infoWindowAnchor = new GPoint(5, 1);
		var point = new GPoint(lon, lat);
  		var marker = new GMarker(point,icon);
		var info_html = '<div style="width: 200px; font-family:Verdana, Arial, Helvetica, sans-serif; font-size:small;"><img style="float:left" src="http://www.blueghost.pwp.blueyonder.co.uk/bg_site/'+type+'.png" alt="img" />'+html+'</div><strong>Source:'+src+'</strong>';
		info_html += '<div>Started @ '+start+'</div><div>End @ '+stp+'</div>';
		info_html += '<div class="weather_link"><a href="javascript:zoomTo('+lat+','+lon+', 3);">Zoom In</a></div>';
		info_html += '<div class="weather_link"><a href="javascript:zoomTo('+alat+','+alon+', 7);">Zoom Out to Area</a></div>';
		info_html += '<div class="weather_link"><a href="javascript:zoomOut();">Zoom Out Fully</a></div>';
		GEvent.addListener(marker, "click", function() {
    		marker.openInfoWindowHtml(info_html);
  		});
		return marker;
	}
	

	window.createTrafficCountyMarker = function (html, title, lat, lon){
		var point = new GPoint(lon,lat);
		var marker = new GMarker(point,tICon);
		var id = county_markers.length;
		var info_html 	= document.createElement("div");
		info_html.id = 'traffic_'+html+'';
		info_html.className = 'weather_link';
		info_html.innerHTML = '<a>'+title+'</a><br/><a href="javascript:goToTraffic(\''+html+'\', '+lat+', '+lon+', '+id+', \''+title+'\');" title="See Delays in '+title+'">Show Delays</a><br/><a href="javascript:zoomOut();" title="Show Delays in '+title+'">Zoom Out</a>';
		county_markers.push(info_html);
		GEvent.addListener(marker, "click", function() {
   			marker.openInfoWindow(county_markers[id]);
		});
		return marker;
	}
	
	window.setupTraffic = function (){
		var lo = document.getElementById('toggle');
		lo.innerHTML = "Loading Counties...";
		//alert("Called sT");
		//place backstage logo
		wICon	= new GIcon();
		wICon.image = "http://www.blueghost.pwp.blueyonder.co.uk/bg_site/bbc.png";
		wICon.shadow = "http://www.blueghost.pwp.blueyonder.co.uk/bg_site/weather/trans.png";
		wICon.iconSize = new GSize(400, 30);
		wICon.shadowSize = new GSize(1, 1);
		wICon.iconAnchor = new GPoint(0, 0);
		wICon.infoWindowAnchor = new GPoint(-5, -5);
		//alert("got1");
		//icon for each county
		tICon	= new GIcon();
		tICon.image = "http://www.blueghost.pwp.blueyonder.co.uk/bg_site/mm_20_white.png";
		tICon.shadow = "http://www.blueghost.pwp.blueyonder.co.uk/bg_site/mm_20_shadow.png";
		tICon.iconSize = new GSize(12, 20);
		tICon.shadowSize = new GSize(22, 20);
		tICon.iconAnchor = new GPoint(0, 0);
		tICon.infoWindowAnchor = new GPoint(-5, -5);
		//alert("got2");
		//add backstage logo
		var bounds = map.getBoundsLatLng();
		var width = bounds.maxX - bounds.minX;
		var height = bounds.maxY - bounds.minY;
		if (widescreen)
			var point = new GPoint(bounds.maxX-(width/1.5), bounds.maxY-(height*0.9));
		else
			var point = new GPoint(bounds.maxX-(width/1.5), bounds.maxY-(height*0.9));
		wMarker = new GMarker(point,wICon);
		//map.addOverlay(wMarker);
		//alert("got3");
		//add each county
		if (traffic_setup){
			//alert("got4.1");
			for(var i = 0; i< t_markers.length; i++)
				map.addOverlay(t_markers[i]);
			var lo = document.getElementById('toggle');
			lo.innerHTML = "Loaded Counties";
		}else{
			//alert("got4.2");
			var tmp_mkrs	= [];
    		//var request = new XMLHttpRequest();
			//var url	= "http://bbc.blueghost.co.uk/includes/travel_new.php";
			GM_xmlhttpRequest({
    			method: 'GET',
    			url: 'http://bbc.blueghost.co.uk/travel_data/locations.xml',
    			headers: {
        			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3',
        			'Accept': 'application/atom+xml,application/xml,text/xml',
    			},
				onreadystatechangeCallback: function(responseDetails) {
					//alert("Waiting at :"+responseDetails.readyState);
				},
   				onload: function(responseDetails) {
					//alert("Got XML");
        			var parser = new DOMParser();
        			var xmlDoc = parser.parseFromString(responseDetails.responseText, "application/xml");
					var markers = xmlDoc.documentElement.getElementsByTagName("t_alert");
        			for (var i=0; i< markers.length ; i++){
						var lat = markers[i].getAttribute("lat");
						var lon = markers[i].getAttribute("lon");
						var marker = createTrafficCountyMarker(markers[i].getAttribute("location"), markers[i].getAttribute("title"), lat, lon);
						map.addOverlay(marker);
						t_markers.push(marker);
					}
					var lo = document.getElementById('toggle');
					lo.innerHTML = "Loaded Counties";
					//alert("Added markers");
    			}
			});
			//alert("got5");
			traffic_setup = true;
		}
		//alert("got6");
		//onmove for backstage logo
		moveListener = GEvent.addListener(map, "move", function() {
    		map.removeOverlay(wMarker);
			var bounds = map.getBoundsLatLng();
			var width = bounds.maxX - bounds.minX;
			var height = bounds.maxY - bounds.minY;
			if (widescreen)
				var point = new GPoint(bounds.maxX-(width/1.5), bounds.maxY-(height*0.9));
			else
				var point = new GPoint(bounds.maxX-(width/1.5), bounds.maxY-(height*0.9));
			wMarker = new GMarker(point,wICon);
			map.addOverlay(wMarker);
			GEvent.addListener(wMarker, "click", function() {
				var l_text = "<div class=\"weather_link\">supported by <a href=\"http://backstage.bbc.co.uk\" target=\"_blank\">backstage.bbc.co.uk</a></div>";
    			wMarker.openInfoWindowHtml(l_text);
			});
  		});
			
		//alert("got7");
		//onzoom for backstage logo
		zoomListener = GEvent.addListener(map, "zoom", function() {
			map.removeOverlay(wMarker);
			var bounds = map.getBoundsLatLng();
			var width = bounds.maxX - bounds.minX;
			var height = bounds.maxY - bounds.minY;
			if (widescreen)
				var point = new GPoint(bounds.maxX-(width/1.5), bounds.maxY-(height*0.9));
			else
				var point = new GPoint(bounds.maxX-(width/1.5), bounds.maxY-(height*0.9));
			wMarker = new GMarker(point,wICon);
			map.addOverlay(wMarker);
			GEvent.addListener(wMarker, "click", function() {
				var l_text = "<div class=\"weather_link\">supported by <a href=\"http://backstage.bbc.co.uk\" target=\"_blank\">backstage.bbc.co.uk</a></div>";
    			wMarker.openInfoWindowHtml(l_text);
			});
  		});
		//alert("got8");
		//onclick for backstage logo
		GEvent.addListener(wMarker, "click", function() {
			var l_text = "<div class=\"weather_link\">supported by <a href=\"http://backstage.bbc.co.uk\" target=\"_blank\">backstage.bbc.co.uk</a></div>";
    		wMarker.openInfoWindowHtml(l_text);
		});
		//alert("got9");
		
		map.addOverlay(wMarker);
	}
	
	window.zoomTo = function (lat, lon, size){
		var p = new GPoint(lon,lat);
		map.centerAndZoom(p, size);
	}
	
	window.goToTraffic = function (loc, lat, lon, id, title){
		county_markers[id].innerHTML =  '<a>'+title+'</a><br/><a href="javascript:removeTraffic(\''+loc+'\', '+lat+', '+lon+', '+id+', \''+title+'\');" title="Hide Delays in '+title+'">Hide Delays</a><br/><a href="javascript:zoomOut();" title="Show Delays in '+title+'">Zoom Out</a>';
		var point = new GPoint(lon,lat);
		map.centerAndZoom(point, 7);
		tPlace 	= loc;
		tLat	= lat;
		tLon	= lon;
		reloadTraffic();
	}
	
	window.removeTraffic = function (loc, lat, lon, id, title){
		var index = 0;
		for (var i = 0; i < traffic_data.length; i++){
			if (traffic_data[i] == loc){
				index = i;
				i = traffic_data.length + 1;
			}
		}
		for (var start = traffic_start[index]; start < traffic_end[index]; start++)
			map.removeOverlay(traffic_markers[start]);
		county_markers[id].innerHTML =  '<a>'+title+'</a><br/><a href="javascript:goToTraffic(\''+loc+'\', '+lat+', '+lon+', '+id+', \''+title+'\');" title="Show Delays in '+title+'">Show Delays</a><br/><a href="javascript:zoomOut();" title="Show Delays in '+title+'">Zoom Out</a>';
	}
		
	window.reloadTraffic = function (){
		var lo = document.getElementById('toggle');
		lo.innerHTML = "Loading Traffic Data for "+tPlace+"...";
		var index = -1;
		for (var i = 0; i < traffic_data.length; i++){
			if (traffic_data[i] == tPlace){
				index = i;
				i = traffic_data.length + 1;
			}
		}
		if (index != -1){
			for (var start = traffic_start[index]; start < traffic_end[index]; start++)
				map.addOverlay(traffic_markers[start]);
			var lo = document.getElementById('toggle');
			lo.innerHTML = "Loaded Traffic Data";
		}else{
			traffic_data.push(tPlace);
			traffic_start.push(traffic_markers.length);
			GM_xmlhttpRequest({
    			method: 'GET',
    			url: 'http://bbc.blueghost.co.uk/includes/travel_new.php?area='+tPlace,
    			headers: {
        			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3',
        			'Accept': 'application/atom+xml,application/xml,text/xml',
    			},
				onreadystatechangeCallback: function(responseDetails) {
					//alert("Waiting at :"+responseDetails.readyState);
				},
   				onload: function(responseDetails) {
					//alert("Got XML");
        			var parser = new DOMParser();
        			var xmlDoc = parser.parseFromString(responseDetails.responseText, "application/xml");
					var markers = xmlDoc.documentElement.getElementsByTagName("t_alert");
        			for (var i = 0; i < markers.length; i++) {
						var places = 0;
						var lat = markers[i].getAttribute("lat");
						var lon = markers[i].getAttribute("lon");
						var logo = markers[i].getAttribute("severity");
						var marker = createTrafficMarker(lat, lon , markers[i].getAttribute("summary"), markers[i].getAttribute("src"), markers[i].getAttribute("type"), markers[i].getAttribute("start"), markers[i].getAttribute("stop"), logo, tLat, tLon);
						map.addOverlay(marker);
						traffic_markers.push(marker);
					}
					traffic_end.push(traffic_markers.length);
					var lo = document.getElementById('toggle');
					lo.innerHTML = "Loaded Traffic Data";
    			}
			});
		}
	}
	
	/**
	 * Resets all traffic markers to say "Show Delays"
	 */
	window.resetTraffic = function (){
		//not yet implemented
	}	
	
	window.removeAllTraffic = function (){
		//remove alert overlays
		for (var i = 0; i < traffic_markers.length; i++)
			map.removeOverlay(traffic_markers[i]);
		//remove county overlay
		for (var i = 0; i < t_markers.length; i++)
			map.removeOverlay(t_markers[i]);
		//backstage logo
		map.removeOverlay(wMarker);
		//reset event listeners
		//onmove for backstage logo
		GEvent.removeListener(moveListener);
		//onzoom for backstage logo
		GEvent.removeListener(zoomListener);
	}	
	
	window.setActive = function(){
		var a = document.getElementById('activeSetter');
		if (active){
			active = false;
			a.innerHTML = "Load UK Traffic";
			a.title		= "Load UK Traffic Data";
			removeAllTraffic();
		}else{
			active = true;
			a.innerHTML = "Hide UK Traffic";
			a.title		= "Hide UK Traffic Data";
			setupTraffic();
		}
	}
	
	window.zoomOut = function(){
		map.centerAndZoom(cen, 11);
	}
	
	addGlobalStyle('.weather_link { vertical-align:text-bottom; text-align: center;font-weight:bold; font-family:Geneva, Arial, Helvetica, sans-serif;font-size:small; }');
	addGlobalStyle('.weather_link a { text-decoration:none; }');
	addGlobalStyle('.weather_link a:hover { text-decoration:underline; }');
	
	if (screen.width == '1280' && screen.height == '800')
		widescreen = true;
	if (screen.width == '1280' && screen.height == '768')
		widescreen = true;
	
	var cen = new GPoint(-2.52,52.7);
	var a 	= document.createElement("a");
	a.href	= "javascript:setActive()";
	a.id	= "activeSetter";
	a.innerHTML = "Load UK Traffic";
	a.title		= "Load UK Traffic Data";
	
	var d 	= document.createElement("span");
	d.innerHTML = "&nbsp;&nbsp;&nbsp;";
	var dirs	= document.getElementById('directions');
	dirs.parentNode.insertBefore(d, dirs.nextSibling);
	d.parentNode.insertBefore(a, d.nextSibling);
})() 