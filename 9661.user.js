// ==UserScript==
// @name           Geocaching Enhanced OS Map Substituter
// @namespace      http://grand.edgemaster.googlepages.com/
// @description    (v1.0.6) Replaces the geocaching.com map on cache pages with a draggable OS map.
// @include        http://www.geocaching.com/seek/cache_details.aspx*
// @include        http://www.geocaching.com/seek/wpt.aspx*
// ==/UserScript==

// This script (C) 2007 Thomas Wood (Edgemaster) <grand.edgemaster@gmail.com>
// All rights reserved.
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are met:
// Redistributions of source code must retain the above copyright
// notice and this condition.
// If modifications to the source code are made and redistributed,
// please acknowledge the modification by adding a basic description below this license.

// IMPORTANT: WHEN SAVING ENSURE DEGREE SYMBOLS IN THE FUNCTION GT_WGS84.prototype.parseString ARE SAVED PROPERLY (UTF-8)

var MMurl = 'http://mc.multimap.com/cs/mi10/';
// A few stylistic things to save space later
GM_addStyle(".OSbar { width: 100%; position: absolute;  color: #fff;" +
			"font: 10px sans-serif; height: 13px; opacity: 0.7; background: #00f;"+
			"z-index: 89; left: 0px;}");
GM_addStyle(".OSbar a { color: #fff; } ");
			
// (container function, so we can include the geotools at the end)
function go() {

/**************************
 * Scrape the cache's NGR *
 **************************/
var lon, lat; //Defining these outside also makes them appear inside the later defined function

// Extract the grid reference and convert it into an easting & northing
// If any of this fails, return without doing anything to the page
var LatLon = document.getElementById("LatLon"); 
var Waypoint_Owner = document.getElementById("Waypoint_Owner");
var wptpage = cachepage = 0;

if (LatLon) {
	//Ok, a UK cache page
	var Location = document.getElementById("Location");
	var showmap = 0;
	showmap = (Location.innerHTML.indexOf("United Kingdom") != -1) ? 1 : showmap;
	showmap = (Location.innerHTML.indexOf("Isle of Man") != -1) ? 1 : showmap;
	if(!showmap) return;

	cachepage = 1;
	pos = LatLon.childNodes[0].innerHTML;
} else if(Waypoint_Owner) {
	//It's a child waypoint page
	wptpage = 1;
	pos = Waypoint_Owner.parentNode.nextSibling.nextSibling.innerHTML;
}
if(pos) {
	var w = new GT_WGS84();
	if(!w.parseString(pos)) return;
	c = w.getOSGB();
	if(c.status != 'OK') return;
	lon = c.eastings;
	lat = c.northings;
}

// Disable new yahoo maps script from erroring (placed here so maps do show if non-uk)
unsafeWindow.ws_lm = function() {}

/******************
 * Print friendly *
 ******************/
if(window.location.href.indexOf('pf=y') != -1) {
	unsafeWindow.ws_sm = function() {}
	yahoo = document.getElementById('lnkLrgMap').parentNode;
	tbody = yahoo.parentNode;
	tbody.removeChild(yahoo);
	
	smap = document.getElementById('smlMap');
	smap.parentNode.removeChild(smap);
	
	//Page tidying
	row = document.evaluate("//tr[@bgcolor='#eff4f9']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	row = row.snapshotItem(0);
	box = row.parentNode;
	bakrow = box.removeChild(row);
	box.innerHTML = '';
	box.appendChild(bakrow);	
	
	// User pref to not show map
	if(GM_getValue('disablepf', false)) {
		return;
	}
	
	var url = makeMultiMapUrl(lon, lat, 250, 208);
	
	tr = document.createElement('tr');
	tr.innerHTML = '<td><img src="'+url+'" style="border: 1px solid;" /></td>';
	

	box.appendChild(tr);
	
	return; // Leave now, the rest of the script is all dynamic
}

/*******************************
 * Include the mapping library *
 *******************************/
var sc = document.createElement('script');
sc.src = 'http://www.openlayers.org/dev/lib/OpenLayers.js';
document.getElementsByTagName('head')[0].appendChild(sc);

/**********************************************
 * Replace the map with new map container div *
 **********************************************/
var div = document.createElement('div');
div.id = 'OScontainer';
div.setAttribute('style', 'float: right;');
div.style.height = '250px';
div.style.width = '400px';
div.style.border = '1px solid';
div.style.position = 'relative';
div.style.margin = cachepage ? 'auto -175px auto auto' : '';

//Alternative sizes
oscw = '100%';
osch = '350px';
oscm = 'auto';
oscbig = 0;

div.innerHTML = '<div id="OSmap" style="width: 100%; height: 100%;"></div>' + 
				'<div style="top: 0px; text-align: center; width: 60%; left: 20%; visibility: hidden;" class="OSbar" id="OScaption"></div>' +
				'<div style="bottom: 0px;" class="OSbar">&copy; Crown Copyright '+
				'<span style="position: absolute; left: 100px;"><a href="" id="OSsizelink">Increase Size</a></span> ' +
				'<span style="position: absolute; left: 200px;"><a href="" id="OSorigposlink">Original Position</a></span>' +
				'<span id="location" style="position: absolute; right: 5px;"></span></div>';
				
				// (Action for OSorigposlink is set later, when we have access to openlayers)

if(wptpage) {
	tbody = Waypoint_Owner.parentNode.parentNode;
	header = tbody.getElementsByTagName('span')[0];
	tbody.insertBefore(div, header.nextSibling);	
} else if(lmap = document.getElementById('lnkLrgMap')) {
	lmap.parentNode.removeChild(lmap.parentNode.childNodes[2]); //br doesnt look nice
	lmap.parentNode.replaceChild(div, lmap);
} else if(ftxt = document.getElementById('FindText')) {
	// New cache listings sometimes dont have a map, lets insert where it should be
	ftxt.parentNode.removeChild(ftxt.parentNode.childNodes[1]); //br doesnt look nice
	ftxt.parentNode.insertBefore(div, ftxt);
}

// Find the additional waypoints table
if(cachepage) {
	awptbls = document.evaluate("//table[@bgcolor='#448e35']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	
	var markers = [];
	
	// Loop through alternate rows of the table, grabbing coords, converting and putting them into the array
	if(awptbls.snapshotItem(0)) {
		awptblr = awptbls.snapshotItem(0).rows;
		for (var i = 0; i <= (awptblr.length-2)/2; i++) {
			var w = new GT_WGS84();
			if(!w.parseString(awptblr[(i*2)+1].cells[5].innerHTML)) continue;
			o = w.getOSGB();
			o.wptType = awptblr[(i*2)+1].cells[1].firstChild.alt;
			o.name = awptblr[(i*2)+1].cells[4].innerHTML;
			markers.push(o);
			//Enable name display
			document.getElementById('OScaption').style.visibility = "visible";
		}
	}
}


	
// Wait until pageload so we can use OpenLayers lib
window.addEventListener('load', function (){

	//Use the included library
	OpenLayers = unsafeWindow.OpenLayers;
	
	/* Image tile cropper class extends default Image tile class */
	OpenLayers.Tile.Imagecrop = OpenLayers.Class.create();
	OpenLayers.Tile.Imagecrop.prototype = OpenLayers.Class.inherit( OpenLayers.Tile.Image, {
			
		draw:function() {
			if (this.layer != this.layer.map.baseLayer && this.layer.reproject) {
				this.bounds = this.getBoundsFromBaseLayer(this.position);
			}
			if (!OpenLayers.Tile.prototype.draw.apply(this, arguments)) {
				return false;    
			}
			if (this.imgDiv == null) {
				this.initImgDiv();
			}
			
			this.imgDiv.viewRequestID = this.layer.map.viewRequestID;
			        
			this.url = this.layer.getURL(this.bounds);
			  
			this.imgDiv.style.backgroundImage = 'url(' + this.url + ')';
			OpenLayers.Util.modifyDOMElement(this.imgDiv, null, this.position, this.size) ;
			
			this.drawn = true;
			return true;
		},
			
		clear: function() {
			OpenLayers.Tile.prototype.clear.apply(this, arguments);
			//if(this.imgDiv) {
				//this.imgDiv.style.display = "none";
			//}
		},
			
		initImgDiv: function() {
			this.imgDiv = OpenLayers.Util.createDiv(null, this.position, this.size, null, "absolute", null, "hidden", null);
			this.imgDiv.className = 'olTileImage';
			this.layer.div.appendChild(this.imgDiv);
			// we need this reference to check back the viewRequestID
			this.imgDiv.map = this.layer.map;
		},
			
		/** @final @type String */
		CLASS_NAME: "OpenLayers.Tile.Imagecrop"
	});
			
			
	/***************************
	* MAP CREATION
	***************************/
	unsafeWindow.map = new OpenLayers.Map('OSmap', {controls:[], maxExtent: new OpenLayers.Bounds(0, 0, 700000, 1300000), maxResolution: 100/15, units: 'meters', projection: "EPSG:27700"});
	map = unsafeWindow.map;
	mmlayer = new OpenLayers.Layer.WMS("OS 1:50k Map", url);
	mmlayer.buffer = 1;
	mmlayer.tileSize = new OpenLayers.Size(300,300);
			
	/* Replacement addTile function to use Image tile cropper class */
	mmlayer.addTile = function (bounds,position) {
		url = this.getURL(bounds);
		return new OpenLayers.Tile.Imagecrop(this, position, bounds, url, this.tileSize);
	};
			
	/* Replacement layer getURL function, WMS is close to what we need, but for slight request differences */
	mmlayer.getURL = function (bounds){
		// X&Y locate a point at the centre of the image
		// Shift the centre requested appropriately
		var w = this.tileSize.w;
		var h = this.tileSize.h;

		var l = bounds.left + (500 * (w/150));
		var t = bounds.top - (500 * (w/150));
			        
		return makeMultiMapUrl(l, t, w, h);
	};  // Inline function redefinition
		            
	map.addLayer(mmlayer);
	
	// Uses lat/lon defined outside of this function
	// If you're wondering why it works - http://diveintogreasemonkey.org/patterns/onload.html	
	ll = new OpenLayers.LonLat(lon, lat);
	map.setCenter(ll, 0);
			
	/***************
	 * MARKERS 
	 ***************/
	// Marker icon images
	dotredimg = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABGdBTUEAANbY1E9YMgAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAVrSURBVHjarFdrTFRXEJ77WheWfbC7IFBRFgQKlGdRm6K2xsakbZrGJtqWtIKN8ZemP2zaWNTYGFvS2qaptU1pQk1Tgz%2FUpqGRH1LqAy0K6gKGlQryXlhg2Rf7vI%2Ft3CUgq%2ByCt0wyuXv23HvmOzPfzJxDBINBWEisu7YDSRAwzbLQ7XCB2eODEbeXum93lTZbJrb2udzp%2BC0NBHAGZdzAOn38X%2BsStLd08hVccqwccjUqUDIMCLi%2B7tffIZLQsIgQqLE0Db3O6eKfu%2FuqJ7y%2BrflaNVWZZQA1Q4OT5aB9yg4XBsxHr1kmr1Rmph3MUCpuErA0WRSAAo3UD5orqo2mmu2GVbKjxbmQr9MAQT36NMjzYJpykMeMpi1fGE3XPRy%2F%2F0hx7o%2F%2FG4CCpuBkV89uNF5bu3k97M5bCyAIEOQE4AU2zEu5eg3UbSuDN7tTqPK%2FW37Qy1eQHxdkn3KhhyQBYIMCXBqxlH7UYvzp9MsboAKNC74ALMQY8T%2Be4xEID%2B%2FkZABFErCz8cbJHI2yY2OS%2Flo0AGSkCbPbB1VtncffMqxiKnIiG38CiM8PO5Afu7IMxKetnZ8Pujy0JACXhsc23bM5tx0uycNV%2BUWNhwnHQRVypW%2FavbF%2ByLxVEoCzfUMv5caroQgJJyCA%2BXJrYgr2NN%2BGlXV%2Fhp7ieL4IvABZGiWU6LRwtneoTBIA46RtTQ7mMlDUE7uv6e6D33oHwRFgQ09x%2FHgogCQhT6uCBw5XiiQAIkFVzMLhqx8ajTqeFZWMER%2BUVAB%2Bqz8ACwX%2FjdTkqONZmURCigklKQ03JSf03LPZQUBCERCOY2%2B2YW7novHZ8fy6IBK3w%2BqAkgTtgCQAb6evbtp%2F406g2WKVbU5JxDx%2FVFDWJ2hDGtGtWMBuj09B55Q9%2BNWGgiuSQlCkVd8pW6k%2Ff6i1I7QlsTEtRUKvIQEPtXVCiT6%2Bfp1e1ywJwFqVEr5cX3AYU8x2DBcjGBqWAoFkZPDN3S6xik6f2FB4MEetBEkAGCynz%2Bu1vTWbSnceabvn%2B679PpAzrI4oFM7Xdj2AAy1G7vsXi8vLEnVdYlmW3IzEs8C76asb%2Fbzw3t5rrecyVHHwetozwC%2FQYChs2c0jFthztRW%2BfqFo7wdZhnrnIo0oqgcC2PVEtfr98P7aNef35WV%2BVnH5JljcXmw24Z9RGHgvGqvE%2BfKM1af252b%2B4gxwocOIEAxKA4C7ntMJzOdPCp89hi225cA%2FxlB1DI8XDdXGLpjyBx4eLMypMns84GADeFhhQyoJAC42p2JBcbMcfyA%2Fu%2BpMTz%2FcHbcihhkQYozHpz1woqMbPnwu67icIh02Pwsu9MCsSgJgDwTC1OzxQoFW3VSki79Y3W4KpdoMi2ioxV6Ahv99JSXxzAQC9mARmq%2BSAMjQwOPKYKwrs9K%2B%2FaN%2FBIadrhAXOHRxjakHdqSn1sQytJ9F3vAY9%2FkqCYDYBx7XEfRCmlJxWUaRvQ1DY4iSgdYJGwy6vb5XU5POBQQeyFDRCleJJOSfUB8qTRBsqT6%2B4UL%2FsEgAaMB%2BkKqIaVMxzIDNFx77pXAgYh2IdJgUUzNfq7lY1zu4j8OUbMTcL9RpGux4NsDTMDytRAQgBCN5JghpcQqjm%2BM81y2TsQ9dbtiSnHjVi8bF%2BC8bAJH1kS4qKKMxFDXUMDyWzQmCY2WM3OTDerFY0XlKD0RejEH2q2WykSbzeLaCpoflNGllhac8uC4GYNTrg2gpShEw2WVzAt4DR8e9%2FhA3YDkBRPOmOBdDU1Y31gAuuMIpXl7Z5QZQjFetSILxh2GPd6zDaodMVdzoa6uSwMvzywtAzTBRASTFyPvF30mx8vsymgRpDAD4T4ABAHfmwYA0OtzCAAAAAElFTkSuQmCC";
	
	dotredicon = new OpenLayers.Icon(dotredimg, new OpenLayers.Size(32,30), new OpenLayers.Pixel(-16, -32));
	
	ml = new OpenLayers.Layer.Markers("Cache");
	map.addLayer(ml);
	ml.addMarker(new OpenLayers.Marker(ll, dotredicon));
	
	// Pick up additional waypoints and plot them
	if(cachepage && markers.length) {
		mlc = new OpenLayers.Layer.Markers("Child Waypoints");
		map.addLayer(mlc);
		map.addControl( new OpenLayers.Control.LayerSwitcher());
		
		iconimgs = new Object();
		iconimgs['Reference Point'] = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAUCAYAAAC58NwRAAAABGdBTUEAAK%2FINwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAHASURBVHjajJIxSAJhFMefnt%2BBnVzWckLFNeQQCFEQREFBNERLSIMNjRVkezlUQ9DWUmA0BA3S0Nba0hJEEUVJmGKUREuUnsiJlpxf79kValY%2B%2BB3fe9%2F7f%2Ffe%2Bz4LVFo%2FMol0mP49so8cV%2BWBBdlEOGMyV5Rh7nKNcFF0cooh24jwlUgWRPxutx88nhVwOJRSUNdfIBJZg1hsg9wdZIZUg8iW2z0PAwNBEAQHGAZAsQggihKo6ijkchlIJk97MO%2FEih%2BfzSbhyQEoFD4Tv4zWFPN4FoGxRgpNkKC9qakLy2itSC4XNTQo0NzcTW4bCQzDyAPn8KdRDulJcJNKXYGmXYPN9jNRwC7T6Vvs4YLcKAlCKMxfXgbw9xwslrJZm2va45y6gRBN6RVJ6%2FrdWDb7iFMZ%2F%2B6F%2Fnh2NgeJxB65C8iBYB52jlg17WqIMSe4XH2lUuLxXQiHl2l%2FHVmt1dsR3bTX%2B8R9Pp3b7S00CiqeffdUJYgWi2%2FTjDmAyjNLmaX4XxM8lCSVy3InnR4uez6%2F2pT54IglqMNU5N0U9NYjoLt5QDKIXL1Z426BbuEZyZuifwVkmimEegUJRKq18SHAAJM0l0WNxRYoAAAAAElFTkSuQmCC";
		iconimgs['Trailhead'] = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAUCAYAAAC58NwRAAAABGdBTUEAAK%2FINwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAGwSURBVHjajJI9LARREMfn7boPt7unkSBxOYWgkggaBRqNSohQKIiPRBQSDRKNlu5EconyqmuprqFAIw7xEeTiI1FJJBJEbu92d8ysXc7d4Sb5vcx7M%2F%2F35s17An5aBzFM1DvzWyJO7OblgSAiBGqKwK5WGbvbZKxQBfIaESXkXME6Byb7PZjaVDB7qKJB3GwpOD3odUUbbnKnm4xnGuoHKr7sfcI%2Bnms4M%2BRxRT0SDUMBv4CFMS%2Fo7wh65vtY9tNvCPOjXggqXDUMsKCuuUGCcI0EmSwUWNYAqK2SoKWJUyHEo6lnEEwL7ZsXM4tiaf3TZcH5ybUFZykLyv2FyeU%2BgIsbC5KXJk%2BvWBBD2mAhooNhCpBzmidLfFMBi2scAy445sZmuAsjvR67na%2F7BHXJTGo43vfVobn805c5sDLrQzzWEI80jC753eTVX64H25oC9oM97ahYU2m%2FdJLwfJWZJ7ii1k6oAQEPjwjxhMFrU7wOf1giVC2wsU7i3U%2Bdf%2FanjTh1M0tQgoWJjCNoL0XAb3NHvBDB%2FGBZsZ9APBJpR%2FSvgO3ZEUKpgntCKRb4EGAAw9qvqkFvafEAAAAASUVORK5CYII%3D";
		iconimgs['Question to Answer'] = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAUCAYAAAC58NwRAAAABGdBTUEAAK%2FINwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAHcSURBVHjajJI%2FaBNhGMaf3OVSm%2BRKIINwrX%2BILrHLIXQwg9JV6dShrTp0UMHirIuTgy6FiqB06KQ4dGvp5OJQoRCk0JamKUJUVARJ2oh3lHr1vs%2F3Oa7%2BianNA7%2Fj3vd7n4%2F3e78vgb9VEkaF03H8VpgVXrXUISE8ErSVtbRzztFOydEpO6WZE6YFc7%2BQeixMFK8U4d50YR%2B3o6T%2Fycfq9CoqTysMZ4TrdJ0XnhQvFzH4cBDJI0mE30OoHwpduS4UhgrYqe%2BgvlI%2FK3VLhnxGkt1JuLdcBH6AMAh%2F9cn%2FwAvgTriQ9pgapuFk%2Fkwedp8Ntadazxblsk4W%2Bf48w2M0hGxBK42DxDXW0E%2FDeqPSwNbGFthaq3im5psmGmsNhps0PJPB7ZYflKFCBcM0fs%2FaTEBrjfL9aG2PtZwSrV%2B9D95F76OHwqVCZKSstIXFO4uoLdQY3hbmzHiz14KxXd2%2BYGUs9JZ6YVgGqs%2BrWJ5a5vqkcK%2Fd%2BV7ypseWxvT4%2BrhOH01zEnRY%2BwVmi2FTBepaKpOC%2F9lHbT5q5Qbz%2BI9eyNx17lSOu6%2F98XwO1NX4wZG76EAnhCA2DHRi4EW8E74JPf9cZBsDL%2BGLsBubDjVQzdiITg3vhUy7hZ8CDACEjqcjUTSjTQAAAABJRU5ErkJggg%3D%3D";
		iconimgs['Parking Area'] = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAUCAYAAAC58NwRAAAABGdBTUEAAK%2FINwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAHESURBVHjajJI%2FLENRFMZP%2B96j2qIkNFENwkAMQiIREhIMGBg6MBhFgsFGBxazSVKRGAxisFktFolIhPgXOqBSJIikVKWt6ru%2B8%2FpeQhU9ye%2Fl3XO%2B795z%2F5joe7SCIVCjj6%2FAOthO05EJLABRIMuis6hEdAOHrAjOgSUgfTX4uDDuqhL3rT1CdHk0Htt6xWR5tWFaJt3VDhYnyqrIV99MdgkpVYVEkE3JoZ5SN4XfY7QbDjVBt2PGZ9AGkbeylij5kRIbwf8fCZpGrVBWOONhQ2WD3UHledbvYiOESs7cPGrMd%2FDIzYZkTE1qLfwegjQNpmTD6eHrMx1FwtiR9FNrlugctf1wiEd%2BNqyikZj34gSLYBWT6cthp%2F69lyeUECLBWp7yCTxfRN%2F6gtE3GnC6tb61kGQa8x%2FQ2sMtj6bAhtHDHi9%2BGHnpcKCtlmInZjfTyl2AZgNnXJ8Hc5l2t8U3fYsLi7T3C1euhU9iHyiGIH2X%2FriqjtglhYLxKFq54dwo5%2F84QtqssFhFnTWfZz%2FW39mfMay%2FHWaGsogK8K4bmrMx8N0EAG6SCtKLcgYDX8IDiOmmfw0cId1I2RqugS1T4VOAAQDkdp2PrH9XuAAAAABJRU5ErkJggg%3D%3D";
		iconimgs['Stages of a Multicache'] = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAUCAYAAAC58NwRAAAABGdBTUEAAK%2FINwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAHoSURBVHjajJLLSxtRFMY%2FJ5k8TLRKE1CjqCgUdWexaBe6qKB0Y6FIXdSVj4V%2FgCtBcNNN7cKiFKrdFFpEhIIgKkUEwSykFKpC8FEfVXwlKr5IJjNze850FB2izQe%2FgXPP993X3BTc1lOiiSg269%2FEMDFr8SGF6COEx%2B0QFaUB8aQsILypDsFjxAfCdmVk9RMdjc9K0dpQjoA%2F3ejsHp7h09hPfJ1aZM8g0capamKAzW86auFy2hGLa1A1HQ88LtRXFSN8comFtYNy8s1J9HnlJlP7i8e4iCpQyHwlRdVwdqkYq3rdDh56yYGCR%2Fk%2B5PjTEFd169mMlbIeelFS6OMyjwNaTFGh6QJ3SRcCMcVYWefAYmgzjOXNiLF%2Fq5wOO1b%2FHGFp%2FZDLEAc%2B0wTR3i9BaJqATZKuzTaJroqa74yeHmcv31KYONk%2BOH2%2BQ9dYV1lE2%2Ft3FrdTRvfHGUwEV7nsJL7ZzMnmCWl5K1KT6pJRWZYLWZYw8n0JA6PcwluiJ9H5pvlPT71vFsGhFuHP9PBN%2FCDk621aAqG4qrXyKnuRc4zPrfBYO4%2FjHk1m%2B7yiMCeDZ%2F914%2Fncqdfmg2O6kITy%2BVWYgYpkAvwj1olTIt3atCd6CcQ%2BETVD%2Fw2wjs0gkg1sEJ5Ejb8CDADy%2BKeAhLXFLQAAAABJRU5ErkJggg%3D%3D";
		iconimgs['Final Location'] = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAUCAYAAAC58NwRAAAABGdBTUEAAK%2FINwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAHOSURBVHjajJI9SBthGMf%2F6SUluXAhiyDoUaUKDtbB4lK0c9tBIrG0g5AlOKtDp0JSVxcpKAHHTg6Ka5cuhW4NSaPo1AQrQqB4ekS8eB9Pn%2Be4WD38yB9%2Bxz0f%2F3vfe583gpt6wbxnhoL4N7PJfA%2F1IcJ8ZkiLajTZM0lTPVOUiqVIckyJUa4b1qSQG8xR5VWFTrInZGQNqr6uUv5pvmPaQOB6yaxzM0oTJSSUBCzPgk020o%2FTmNFn0LSaKBvlce778Ygf71RFxdLIElpOC22vfbXspXcJ0zaxOLIILaZJKiuGgdH0KHRV9xvCsj0bfYk%2BjKXHJNTF4FquBY883CWptV1%2FZU8Mu7XTGvbMPX%2F%2FYcWVOPbNfVSMioQHYvhCIKtQK8AlF0rk%2F%2Bl13ou1IhxybOmVzF%2FmtHHeeHN4foiMnoHjOX6jGlWxUF7A9tG2hB%2BYneurf5LzXn62TOZbk85mz2j1%2BWpnBit3%2Fd83mbQMrD5dp954rzT%2FZGJX2wwZDvho88lYEscXx9j6syW5ecnjHn3tV%2FtpWBuWr%2F8K7tm9mgv2LXxEF3oityIwTHRjkNnUGZNJhYvR224C02SswPSgQWQERnRraDDJ2wr%2FBBgA4fuyl95uDNMAAAAASUVORK5CYII%3D";
		iconimgs['default'] = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAUCAYAAAC58NwRAAAABGdBTUEAAK%2FINwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAFrSURBVHjaYmRABVZAHAHEKlD%2BPSBeCcSH0dQxMALxJCD%2Bz8fH99%2FJyem%2Fi4vLfwEBgf8gMSCeAcTMyBqmgiSysrL%2Bv3jx4j8MvHr16n9%2Bfj5M02yYYjuQQHZ29n9coLCwEKbJFWw6Nzf3%2F8ePH%2BPUALKVn58f7DQmIKGgr6%2FPICMjw4ALiIuLMxgaGoKYsiANf3%2F8%2BMFACEDV%2FAMRbUxMTP8vXLiA00nXrl37z8rKCnJSN0iDJhB%2F9%2FDw%2BP%2Fv3z%2BsGvz8%2FECKfwGxHszGbFAoJCYmYijOyMiAhVARujMbQRL9%2Ff1wxfPmzYMp7sblt32gmH7y5Mn%2FL1%2B%2B%2FJeWlgYpPgvErDAFzGgabvz8%2BTOFh4eH4dGjRwxLly4FiaWBxPGF4E55efn%2FmpqaINMvQdMZXhADdTcI1zAQAeShQQjSYEqMBlDs3wfiT0DMhy7JgkUDKPpfglIDVBNBDSDwHpZuiNXwAIi5sUkABBgAW1X%2BGM4UutQAAAAASUVORK5CYII%3D";
	
		icons = new Object();
		for (n in iconimgs) {
			icons[n] = new OpenLayers.Icon(iconimgs[n], new OpenLayers.Size(12,20), new OpenLayers.Pixel(-6, -20));
		}
		
		//GM_log('Picking up AWPTs');
		markers.forEach(function (o){
			if (!(i = icons[o.wptType])) i = icons['default'];
			marker = new OpenLayers.Marker(new OpenLayers.LonLat(o.eastings, o.northings), i.clone());
			marker.events.register('mouseover', marker, function(evt) {
				document.getElementById('OScaption').innerHTML = o.name;
			});
			mlc.addMarker(marker);
			//GM_log(a);
		});
	}

		
	/****************
	 * ADD CONTROLS *
	 ****************/

	/********* POSITION *********/
	osposition = new OpenLayers.Control.MousePosition({element: document.getElementById('location'), numdigits: 5, update: 1});
	/* Replacement redraw function for MousePosition control, formats as NGR rather than raw numbers */
	osposition.redraw = function (evt) {
		var lonLat;
		if(!this.update) {
			return;
		}
				
		if (evt == null) {
			lonLat = new OpenLayers.LonLat(0, 0);
		} else {
			if (this.lastXy == null || Math.abs(evt.xy.x - this.lastXy.x) > this.granularity || Math.abs(evt.xy.y - this.lastXy.y) > this.granularity) {
				this.lastXy = evt.xy;
				return;
			}
			lonLat = this.map.getLonLatFromPixel(evt.xy);
			this.lastXy = evt.xy;
		}
		        
		var digits = parseInt(this.numdigits);
		
		var gro = new GT_OSGB();
		gro.eastings = lonLat.lon;
		gro.northings = lonLat.lat;
		        		
		var gr = gro.getGridRef(digits);
		        		
		var newHtml = this.prefix + gr + this.suffix;
		
		if (newHtml != this.element.innerHTML) {
			this.element.innerHTML = newHtml;
		}
	};  // Inline function redefinition
			
	map.addControl( osposition );
	
	/********* LAYERS *********/
	// Control added with child waypoint layer
			
	/********* MOUSE *********/
	var mousecontrol = new OpenLayers.Control.MouseDefaults();
	// Disable mouse bindings for zoom
	mousecontrol.defaultWheelUp = mousecontrol.defaultWheelDown = mousecontrol.defaultDblClick = function (){};
	//There's also a shift+drag zoom box, i cant be bothered to remove all the bindings, lets just remove the resulting action
	mousecontrol.zoomBoxEnd = function () {this.removeZoomBox();};
			
	/* Replacement defaultClick function for MouseDefaults control, onclick will stop the grid ref updating */
	mousecontrol.defaultClick = function (evt) {
		if (!OpenLayers.Event.isLeftClick(evt)) return;
		var notAfterDrag = !this.performedDrag;
		this.performedDrag = false;
			
		if(notAfterDrag) {
			// Global, defined in init(), used in osredraw()
			// Freezes the map position onclick of the map, unfreeze on another click
			if(osposition.update) {
				osposition.update = 0;
			} else {
				osposition.update = 1;
			}
		}
		return notAfterDrag;
	};  // Inline function redefinition
		
	map.addControl( mousecontrol );
			
			
	/********* PAN *********/
	var panzoom = new OpenLayers.Control.PanZoom();
	/* Replacement draw function for PanZoom to remove the Zoom */
	panzoom.draw = function (px) {
		OpenLayers.Control.prototype.draw.apply(this, arguments);
		px = this.position;
		
		this.buttons = new Array();
		
		var sz = new OpenLayers.Size(18,18);
		var centered = new OpenLayers.Pixel(px.x+sz.w/2, px.y);
		
		this._addButton("panup", "north-mini.png", centered, sz);
		px.y = centered.y+sz.h;
		this._addButton("panleft", "west-mini.png", px, sz);
		this._addButton("panright", "east-mini.png", px.add(sz.w, 0), sz);
		this._addButton("pandown", "south-mini.png", centered.add(0, sz.h*2), sz);
		return this.div;
	};  // Inline function redefinition
			
	map.addControl( panzoom );
	
	/*********** Caption bar control links ***********/
	document.getElementById('OSorigposlink').addEventListener('click', function(event){
		map.setCenter(ll, 0);
		event.stopPropagation();
    	event.preventDefault();
	},true);
	
	document.getElementById('OSsizelink').addEventListener('click', function(event){
		centre = map.getCenter();
		osc = document.getElementById('OScontainer');
		oh = osc.style.height;
		ow = osc.style.width;
		om = osc.style.margin;
		osc.style.height = osch;
		osc.style.width = oscw;
		osc.style.margin = oscm;
		map.setCenter(centre, 0);
		
		osch = oh;
		oscw = ow;
		oscm = om;
		document.getElementById('OSsizelink').textContent = oscbig ? 'Increase Size' : 'Reduce Size';
		oscbig = oscbig ? 0 : 1;
		
		event.stopPropagation();
    	event.preventDefault();
	},true);
	
}, false);  // Inline function definition for load event handler

}


function makeMultiMapUrl(east, north, width, height) {
	mmX = ""+Math.round(east/250);
	mmY = ""+Math.round(north/250);
	var u = MMurl;
	u += "X" + mmX.slice(0,2);
	u += "/Y" + mmY.slice(0,2);
	u += "/X" + mmX + "Y" + mmY + "S25";
	u += "W" + width + "H" + height + ".gif";
	
	return u;
}








/**
 * GeoTools javascript coordinate transformations
 * http://files.dixo.net/geotools.html
 *
 * This portion copyright (c)2005 Paul Dixon (paul@elphin.com)
 *

 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; either version 2
 * of the License, or (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 59 Temple Place - Suite 330, Boston, MA  02111-1307, USA.
 * 

 * --------------------------------------------------------------------------- 
 * 
 * Credits

 *

 * The algorithm used by the script for WGS84-OSGB36 conversions is derived 

 * from an OSGB spreadsheet (www.gps.gov.uk) with permission. This has been
 * adapted into Perl by Ian Harris, and into PHP by Barry Hunter. Conversion
 * accuracy is in the order of 7m for 90% of Great Britain, and should be 
 * be similar to the conversion made by a typical GPSr
 *

 * See accompanying documentation for more information
 * http://files.dixo.net/geotools.html
 */
 
/*****************************************************************************
*
* GT_OSGB holds OSGB grid coordinates
*
*****************************************************************************/

function GT_OSGB()
{
	this.northings=0;
	this.eastings=0;
	this.status="Undefined";
}

GT_OSGB.prefixes = new Array (
	new Array("SV","SW","SX","SY","SZ","TV","TW"),
	new Array("SQ","SR","SS","ST","SU","TQ","TR"),
	new Array("SL","SM","SN","SO","SP","TL","TM"),
	new Array("SF","SG","SH","SJ","SK","TF","TG"),
	new Array("SA","SB","SC","SD","SE","TA","TB"),
	new Array("NV","NW","NX","NY","NZ","OV","OW"),
	new Array("NQ","NR","NS","NT","NU","OQ","OR"),
	new Array("NL","NM","NN","NO","NP","OL","OM"),
	new Array("NF","NG","NH","NJ","NK","OF","OG"),
	new Array("NA","NB","NC","ND","NE","OA","OB"),
	new Array("HV","HW","HX","HY","HZ","JV","JW"),
	new Array("HQ","HR","HS","HT","HU","JQ","JR"),
	new Array("HL","HM","HN","HO","HP","JL","JM"));
			

GT_OSGB.prototype.setGridCoordinates = function(eastings,northings)
{
	this.northings=northings;
	this.eastings=eastings;
	this.status="OK";
}

GT_OSGB.prototype.setError = function(msg)
{
	this.status=msg;
}

GT_OSGB.prototype._zeropad = function(num, len)
{
	var str=new String(num);
	while (str.length<len)
	{
		str='0'+str;
	}
	return str;
}

GT_OSGB.prototype.getGridRef = function(precision)
{
	if (precision<0)
		precision=0;
	if (precision>5)
		precision=5;
		
	var e="";

	var n="";
	if (precision>0)
	{
		var y=Math.floor(this.northings/100000);
		var x=Math.floor(this.eastings/100000);


		var e=Math.round(this.eastings%100000);
		var n=Math.round(this.northings%100000);


		var div=(5-precision);
		e=Math.round(e / Math.pow(10, div));
		n=Math.round(n / Math.pow(10, div));
	}
	
	var prefix=GT_OSGB.prefixes[y][x];
	
    return prefix+" "+this._zeropad(e, precision)+" "+this._zeropad(n, precision);
}

GT_OSGB.prototype.parseGridRef = function(landranger)
{
	var ok=false;

	
	this.northings=0;
	this.eastings=0;
	
	var precision;

	for (precision=5; precision>=1; precision--)
	{
		var pattern = new RegExp("^([A-Z]{2})\\s*(\\d{"+precision+"})\\s*(\\d{"+precision+"})$", "i")
		var gridRef = landranger.match(pattern);
		if (gridRef)
		{
			var gridSheet = gridRef[1];
			var gridEast=0;
			var gridNorth=0;
			
			//5x1 4x10 3x100 2x1000 1x10000 
			if (precision>0)
			{
				var mult=Math.pow(10, 5-precision);
				gridEast=parseInt(gridRef[2],10) * mult;
				gridNorth=parseInt(gridRef[3],10) * mult;
			}
			
			var x,y;
			search: for(y=0; y<GT_OSGB.prefixes.length; y++) 
			{
				for(x=0; x<GT_OSGB.prefixes[y].length; x++)
					if (GT_OSGB.prefixes[y][x] == gridSheet) {
						this.eastings = (x * 100000)+gridEast;
						this.northings = (y * 100000)+gridNorth;
						ok=true;
						break search;
					}
			
			}
		
		}
	}

	

	return ok;
}


GT_OSGB.prototype.getWGS84 = function()
{
	
	var height = 0;

	var lat1 = GT_Math.E_N_to_Lat (this.eastings,this.northings,6377563.396,6356256.910,400000,-100000,0.999601272,49.00000,-2.00000);
	var lon1 = GT_Math.E_N_to_Long(this.eastings,this.northings,6377563.396,6356256.910,400000,-100000,0.999601272,49.00000,-2.00000);

	var x1 = GT_Math.Lat_Long_H_to_X(lat1,lon1,height,6377563.396,6356256.910);
	var y1 = GT_Math.Lat_Long_H_to_Y(lat1,lon1,height,6377563.396,6356256.910);
	var z1 = GT_Math.Lat_H_to_Z     (lat1,      height,6377563.396,6356256.910);

	var x2 = GT_Math.Helmert_X(x1,y1,z1,446.448 ,0.2470,0.8421,-20.4894);
	var y2 = GT_Math.Helmert_Y(x1,y1,z1,-125.157,0.1502,0.8421,-20.4894);
	var z2 = GT_Math.Helmert_Z(x1,y1,z1,542.060 ,0.1502,0.2470,-20.4894);

	var latitude = GT_Math.XYZ_to_Lat(x2,y2,z2,6378137.000,6356752.313);
	var longitude = GT_Math.XYZ_to_Long(x2,y2);

	var wgs84=new GT_WGS84();
	wgs84.setDegrees(latitude, longitude);
	return wgs84;
}

/*****************************************************************************
*
* GT_WGS84 holds WGS84 latitude and longitude
*
*****************************************************************************/

function GT_WGS84()
{
	this.latitude=0;
	this.longitude=0;
}

GT_WGS84.prototype.setDegrees = function(latitude,longitude)
{
	this.latitude=latitude;
	this.longitude=longitude;
}

GT_WGS84.prototype.parseString = function(text)
{
	var ok=false;

	var str=new String(text);

	//N 51Â° 53.947 W 000Â° 10.018

	var pattern = /([ns])\s*(\d+)[Â°\s]+(\d+\.\d+)\s+([we])\s*(\d+)[Â°\s]+(\d+\.\d+)/i;
	var matches=str.match(pattern);
	if (matches)
	{
		ok=true;
		var latsign=(matches[1]=='s' || matches[1]=='S')?-1:1;
		var longsign=(matches[4]=='w' || matches[4]=='W')?-1:1;
		
		var d1=parseFloat(matches[2]);
		var m1=parseFloat(matches[3]);
		var d2=parseFloat(matches[5]);
		var m2=parseFloat(matches[6]);
		
		this.latitude=latsign * (d1 + (m1/60.0));
		this.longitude=longsign * (d2 + (m2/60.0));
		
		
	}
	
	return ok;
}



GT_WGS84.prototype.isGreatBritain = function()
{
	return this.latitude > 49 &&
		this.latitude < 62 &&
		this.longitude > -9.5 &&
		this.longitude < 2.3;
}

GT_WGS84.prototype.isIreland = function()
{
	return this.latitude > 51.2 &&
		this.latitude < 55.73 &&
		this.longitude > -12.2 &&
		this.longitude < -4.8;
}



GT_WGS84.prototype.getOSGB = function()
{
	var osgb=new GT_OSGB();
	if (this.isGreatBritain())
	{
		var height = 0;
		
		var x1 = GT_Math.Lat_Long_H_to_X(this.latitude,this.longitude,height,6378137.00,6356752.313);
		var y1 = GT_Math.Lat_Long_H_to_Y(this.latitude,this.longitude,height,6378137.00,6356752.313);
		var z1 = GT_Math.Lat_H_to_Z     (this.latitude,      height,6378137.00,6356752.313);

		var x2 = GT_Math.Helmert_X(x1,y1,z1,-446.448,-0.2470,-0.8421,20.4894);
		var y2 = GT_Math.Helmert_Y(x1,y1,z1, 125.157,-0.1502,-0.8421,20.4894);
		var z2 = GT_Math.Helmert_Z(x1,y1,z1,-542.060,-0.1502,-0.2470,20.4894);

		var latitude2  = GT_Math.XYZ_to_Lat (x2,y2,z2,6377563.396,6356256.910);
		var longitude2 = GT_Math.XYZ_to_Long(x2,y2);

		var e = GT_Math.Lat_Long_to_East (latitude2,longitude2,6377563.396,6356256.910,400000,0.999601272,49.00000,-2.00000);
		var n = GT_Math.Lat_Long_to_North(latitude2,longitude2,6377563.396,6356256.910,400000,-100000,0.999601272,49.00000,-2.00000);

		osgb.setGridCoordinates(Math.round(e), Math.round(n));
	}
	else
	{
		osgb.setError("Coordinate not within Great Britain");
	}

	return osgb;
}




/*****************************************************************************
*
* GT_Math is a collection of static methods doing all the nasty sums
*
*****************************************************************************/

//GT_Math is just namespace for all the nasty maths functions
function GT_Math()
{
}

GT_Math.E_N_to_Lat = function(East, North, a, b, e0, n0, f0, PHI0, LAM0)
{
	//Un-project Transverse Mercator eastings and northings back to latitude.
	//Input: - _
	//eastings (East) and northings (North) in meters; _
	//ellipsoid axis dimensions (a & b) in meters; _
	//eastings (e0) and northings (n0) of false origin in meters; _
	//central meridian scale factor (f0) and _
	//latitude (PHI0) and longitude (LAM0) of false origin in decimal degrees.

	//'REQUIRES THE "Marc" AND "InitialLat" FUNCTIONS

	//Convert angle measures to radians
    var Pi = 3.14159265358979;
    var RadPHI0 = PHI0 * (Pi / 180);
    var RadLAM0 = LAM0 * (Pi / 180);

	//Compute af0, bf0, e squared (e2), n and Et
    var af0 = a * f0;
    var bf0 = b * f0;
    var e2 = (Math.pow(af0,2) - Math.pow(bf0,2)) / Math.pow(af0,2);
    var n = (af0 - bf0) / (af0 + bf0);
    var Et = East - e0;

	//Compute initial value for latitude (PHI) in radians
    var PHId = GT_Math.InitialLat(North, n0, af0, RadPHI0, n, bf0);
    
	//Compute nu, rho and eta2 using value for PHId
    var nu = af0 / (Math.sqrt(1 - (e2 * ( Math.pow(Math.sin(PHId),2)))));
    var rho = (nu * (1 - e2)) / (1 - (e2 * Math.pow(Math.sin(PHId),2)));
    var eta2 = (nu / rho) - 1;
    
	//Compute Latitude
    var VII = (Math.tan(PHId)) / (2 * rho * nu);
    var VIII = ((Math.tan(PHId)) / (24 * rho * Math.pow(nu,3))) * (5 + (3 * (Math.pow(Math.tan(PHId),2))) + eta2 - (9 * eta2 * (Math.pow(Math.tan(PHId),2))));
    var IX = ((Math.tan(PHId)) / (720 * rho * Math.pow(nu,5))) * (61 + (90 * ((Math.tan(PHId)) ^ 2)) + (45 * (Math.pow(Math.tan(PHId),4))));
    
    var E_N_to_Lat = (180 / Pi) * (PHId - (Math.pow(Et,2) * VII) + (Math.pow(Et,4) * VIII) - ((Et ^ 6) * IX));
	
	return (E_N_to_Lat);
}

GT_Math.E_N_to_Long = function(East, North, a, b, e0, n0, f0, PHI0, LAM0)
{
	//Un-project Transverse Mercator eastings and northings back to longitude.
	//Input: - _
	//eastings (East) and northings (North) in meters; _
	//ellipsoid axis dimensions (a & b) in meters; _
	//eastings (e0) and northings (n0) of false origin in meters; _
	//central meridian scale factor (f0) and _
	//latitude (PHI0) and longitude (LAM0) of false origin in decimal degrees.

	//REQUIRES THE "Marc" AND "InitialLat" FUNCTIONS

	//Convert angle measures to radians
    var Pi = 3.14159265358979;
    var RadPHI0 = PHI0 * (Pi / 180);
    var RadLAM0 = LAM0 * (Pi / 180);

	//Compute af0, bf0, e squared (e2), n and Et
    var af0 = a * f0;
    var bf0 = b * f0;
    var e2 = (Math.pow(af0,2) - Math.pow(bf0,2)) / Math.pow(af0,2);
    var n = (af0 - bf0) / (af0 + bf0);
    var Et = East - e0;

	//Compute initial value for latitude (PHI) in radians
    var PHId = GT_Math.InitialLat(North, n0, af0, RadPHI0, n, bf0);
    
	//Compute nu, rho and eta2 using value for PHId
   	var nu = af0 / (Math.sqrt(1 - (e2 * (Math.pow(Math.sin(PHId),2)))));
    var rho = (nu * (1 - e2)) / (1 - (e2 * Math.pow(Math.sin(PHId),2)));
    var eta2 = (nu / rho) - 1;

	//Compute Longitude
    var X = (Math.pow(Math.cos(PHId),-1)) / nu;
    var XI = ((Math.pow(Math.cos(PHId),-1)) / (6 * Math.pow(nu,3))) * ((nu / rho) + (2 * (Math.pow(Math.tan(PHId),2))));
    var XII = ((Math.pow(Math.cos(PHId),-1)) / (120 * Math.pow(nu,5))) * (5 + (28 * (Math.pow(Math.tan(PHId),2))) + (24 * (Math.pow(Math.tan(PHId),4))));
    var XIIA = ((Math.pow(Math.cos(PHId),-1)) / (5040 * Math.pow(nu,7))) * (61 + (662 * (Math.pow(Math.tan(PHId),2))) + (1320 * (Math.pow(Math.tan(PHId),4))) + (720 * (Math.pow(Math.tan(PHId),6))));

    var E_N_to_Long = (180 / Pi) * (RadLAM0 + (Et * X) - (Math.pow(Et,3) * XI) + (Math.pow(Et,5) * XII) - (Math.pow(Et,7) * XIIA));
	
	return E_N_to_Long;
}

GT_Math.InitialLat = function(North, n0, afo, PHI0, n, bfo)
{
	//Compute initial value for Latitude (PHI) IN RADIANS.
	//Input: - _
	//northing of point (North) and northing of false origin (n0) in meters; _
	//semi major axis multiplied by central meridian scale factor (af0) in meters; _
	//latitude of false origin (PHI0) IN RADIANS; _
	//n (computed from a, b and f0) and _
	//ellipsoid semi major axis multiplied by central meridian scale factor (bf0) in meters.
 
	//REQUIRES THE "Marc" FUNCTION
	//THIS FUNCTION IS CALLED BY THE "E_N_to_Lat", "E_N_to_Long" and "E_N_to_C" FUNCTIONS
	//THIS FUNCTION IS ALSO USED ON IT'S OWN IN THE  "Projection and Transformation Calculations.xls" SPREADSHEET

	//First PHI value (PHI1)
   	var PHI1 = ((North - n0) / afo) + PHI0;
    
	//Calculate M
    var M = GT_Math.Marc(bfo, n, PHI0, PHI1);
    
	//Calculate new PHI value (PHI2)
    var PHI2 = ((North - n0 - M) / afo) + PHI1;
    
	//Iterate to get final value for InitialLat
	while (Math.abs(North - n0 - M) > 0.00001) 
	{
        PHI2 = ((North - n0 - M) / afo) + PHI1;
        M = GT_Math.Marc(bfo, n, PHI0, PHI2);
        PHI1 = PHI2;
	}    
    return PHI2;
}

GT_Math.Lat_Long_H_to_X = function(PHI, LAM, H, a, b)
{
	// Convert geodetic coords lat (PHI), long (LAM) and height (H) to cartesian X coordinate.
	// Input: - _
	//    Latitude (PHI)& Longitude (LAM) both in decimal degrees; _
	//  Ellipsoidal height (H) and ellipsoid axis dimensions (a & b) all in meters.

	// Convert angle measures to radians
    var Pi = 3.14159265358979;
    var RadPHI = PHI * (Pi / 180);
    var RadLAM = LAM * (Pi / 180);

	// Compute eccentricity squared and nu
    var e2 = (Math.pow(a,2) - Math.pow(b,2)) / Math.pow(a,2);
    var V = a / (Math.sqrt(1 - (e2 * (  Math.pow(Math.sin(RadPHI),2)))));

	// Compute X
    return (V + H) * (Math.cos(RadPHI)) * (Math.cos(RadLAM));
}


GT_Math.Lat_Long_H_to_Y =function(PHI, LAM, H, a, b) 
{
	// Convert geodetic coords lat (PHI), long (LAM) and height (H) to cartesian Y coordinate.
	// Input: - _
	// Latitude (PHI)& Longitude (LAM) both in decimal degrees; _
	// Ellipsoidal height (H) and ellipsoid axis dimensions (a & b) all in meters.

	// Convert angle measures to radians
    var Pi = 3.14159265358979;
    var RadPHI = PHI * (Pi / 180);
    var RadLAM = LAM * (Pi / 180);

	// Compute eccentricity squared and nu
    var e2 = (Math.pow(a,2) - Math.pow(b,2)) / Math.pow(a,2);
    var V = a / (Math.sqrt(1 - (e2 * (  Math.pow(Math.sin(RadPHI),2))) ));

	// Compute Y
    return (V + H) * (Math.cos(RadPHI)) * (Math.sin(RadLAM));
}


GT_Math.Lat_H_to_Z =function(PHI, H, a, b)
{
	// Convert geodetic coord components latitude (PHI) and height (H) to cartesian Z coordinate.
	// Input: - _
	//    Latitude (PHI) decimal degrees; _
	// Ellipsoidal height (H) and ellipsoid axis dimensions (a & b) all in meters.

	// Convert angle measures to radians
    var Pi = 3.14159265358979;
    var RadPHI = PHI * (Pi / 180);

	// Compute eccentricity squared and nu
    var e2 = (Math.pow(a,2) - Math.pow(b,2)) / Math.pow(a,2);
    var V = a / (Math.sqrt(1 - (e2 * (  Math.pow(Math.sin(RadPHI),2)) )));

	// Compute X
    return ((V * (1 - e2)) + H) * (Math.sin(RadPHI));
}


GT_Math.Helmert_X =function(X,Y,Z,DX,Y_Rot,Z_Rot,s) 
{

	// (X, Y, Z, DX, Y_Rot, Z_Rot, s)
	// Computed Helmert transformed X coordinate.
	// Input: - _
	//    cartesian XYZ coords (X,Y,Z), X translation (DX) all in meters ; _
	// Y and Z rotations in seconds of arc (Y_Rot, Z_Rot) and scale in ppm (s).

	// Convert rotations to radians and ppm scale to a factor
	var Pi = 3.14159265358979;
	var sfactor = s * 0.000001;

	var RadY_Rot = (Y_Rot / 3600) * (Pi / 180);

	var RadZ_Rot = (Z_Rot / 3600) * (Pi / 180);

	//Compute transformed X coord
    return  (X + (X * sfactor) - (Y * RadZ_Rot) + (Z * RadY_Rot) + DX);
}


GT_Math.Helmert_Y =function(X,Y,Z,DY,X_Rot,Z_Rot,s)
{
	// (X, Y, Z, DY, X_Rot, Z_Rot, s)
	// Computed Helmert transformed Y coordinate.
	// Input: - _
	//    cartesian XYZ coords (X,Y,Z), Y translation (DY) all in meters ; _
	//  X and Z rotations in seconds of arc (X_Rot, Z_Rot) and scale in ppm (s).

	// Convert rotations to radians and ppm scale to a factor
	var Pi = 3.14159265358979;
	var sfactor = s * 0.000001;
	var RadX_Rot = (X_Rot / 3600) * (Pi / 180);
	var RadZ_Rot = (Z_Rot / 3600) * (Pi / 180);

	// Compute transformed Y coord
	return (X * RadZ_Rot) + Y + (Y * sfactor) - (Z * RadX_Rot) + DY;

}
GT_Math.Helmert_Z =function(X, Y, Z, DZ, X_Rot, Y_Rot, s)
{
	// (X, Y, Z, DZ, X_Rot, Y_Rot, s)
	// Computed Helmert transformed Z coordinate.
	// Input: - _
	//    cartesian XYZ coords (X,Y,Z), Z translation (DZ) all in meters ; _
	// X and Y rotations in seconds of arc (X_Rot, Y_Rot) and scale in ppm (s).
	// 
	// Convert rotations to radians and ppm scale to a factor
	var Pi = 3.14159265358979;
	var sfactor = s * 0.000001;
	var RadX_Rot = (X_Rot / 3600) * (Pi / 180);
	var RadY_Rot = (Y_Rot / 3600) * (Pi / 180);

	// Compute transformed Z coord
	return (-1 * X * RadY_Rot) + (Y * RadX_Rot) + Z + (Z * sfactor) + DZ;
}

GT_Math.XYZ_to_Lat =function(X, Y, Z, a, b) 
{
	// Convert XYZ to Latitude (PHI) in Dec Degrees.
	// Input: - _
	// XYZ cartesian coords (X,Y,Z) and ellipsoid axis dimensions (a & b), all in meters.

	// THIS FUNCTION REQUIRES THE "Iterate_XYZ_to_Lat" FUNCTION
	// THIS FUNCTION IS CALLED BY THE "XYZ_to_H" FUNCTION

    var RootXYSqr = Math.sqrt(Math.pow(X,2) + Math.pow(Y,2));
    var e2 = (Math.pow(a,2) - Math.pow(b,2)) / Math.pow(a,2);
    var PHI1 = Math.atan2(Z , (RootXYSqr * (1 - e2)) );
    
    var PHI = GT_Math.Iterate_XYZ_to_Lat(a, e2, PHI1, Z, RootXYSqr);
    
    var Pi = 3.14159265358979;
    
    return PHI * (180 / Pi);
}

GT_Math.Iterate_XYZ_to_Lat =function(a, e2, PHI1, Z, RootXYSqr) 
{
	// Iteratively computes Latitude (PHI).
	// Input: - _
	//    ellipsoid semi major axis (a) in meters; _
	//    eta squared (e2); _
	//    estimated value for latitude (PHI1) in radians; _
	//    cartesian Z coordinate (Z) in meters; _
	// RootXYSqr computed from X & Y in meters.

	// THIS FUNCTION IS CALLED BY THE "XYZ_to_PHI" FUNCTION
	// THIS FUNCTION IS ALSO USED ON IT'S OWN IN THE _
	// "Projection and Transformation Calculations.xls" SPREADSHEET


    var V = a / (Math.sqrt(1 - (e2 * Math.pow(Math.sin(PHI1),2))));
    var PHI2 = Math.atan2((Z + (e2 * V * (Math.sin(PHI1)))) , RootXYSqr);
    
    while (Math.abs(PHI1 - PHI2) > 0.000000001) {
        PHI1 = PHI2;
        V = a / (Math.sqrt(1 - (e2 * Math.pow(Math.sin(PHI1),2))));
        PHI2 = Math.atan2((Z + (e2 * V * (Math.sin(PHI1)))) , RootXYSqr);
    }

    return PHI2;
}


GT_Math.XYZ_to_Long =function (X, Y) 
{
	// Convert XYZ to Longitude (LAM) in Dec Degrees.
	// Input: - _
	// X and Y cartesian coords in meters.

    var Pi = 3.14159265358979;
    return Math.atan2(Y , X) * (180 / Pi);
}

GT_Math.Marc =function (bf0, n, PHI0, PHI) 
{
	//Compute meridional arc.
	//Input: - _
	// ellipsoid semi major axis multiplied by central meridian scale factor (bf0) in meters; _
	// n (computed from a, b and f0); _
	// lat of false origin (PHI0) and initial or final latitude of point (PHI) IN RADIANS.

	//THIS FUNCTION IS CALLED BY THE - _
	// "Lat_Long_to_North" and "InitialLat" FUNCTIONS
	// THIS FUNCTION IS ALSO USED ON IT'S OWN IN THE "Projection and Transformation Calculations.xls" SPREADSHEET

		return bf0 * (((1 + n + ((5 / 4) * Math.pow(n,2)) + ((5 / 4) * Math.pow(n,3))) * (PHI - PHI0)) - (((3 * n) + (3 * Math.pow(n,2)) + ((21 / 8) * Math.pow(n,3))) * (Math.sin(PHI - PHI0)) * (Math.cos(PHI + PHI0))) + ((((15 / 8
	) * Math.pow(n,2)) + ((15 / 8) * Math.pow(n,3))) * (Math.sin(2 * (PHI - PHI0))) * (Math.cos(2 * (PHI + PHI0)))) - (((35 / 24) * Math.pow(n,3)) * (Math.sin(3 * (PHI - PHI0))) * (Math.cos(3 * (PHI + PHI0)))));
}




GT_Math.Lat_Long_to_East =function (PHI, LAM, a, b, e0, f0, PHI0, LAM0)
{
	//Project Latitude and longitude to Transverse Mercator eastings.
	//Input: - _
	//    Latitude (PHI) and Longitude (LAM) in decimal degrees; _
	//    ellipsoid axis dimensions (a & b) in meters; _
	//    eastings of false origin (e0) in meters; _
	//    central meridian scale factor (f0); _
	// latitude (PHI0) and longitude (LAM0) of false origin in decimal degrees.

	// Convert angle measures to radians
    var Pi = 3.14159265358979;
    var RadPHI = PHI * (Pi / 180);
    var RadLAM = LAM * (Pi / 180);
    var RadPHI0 = PHI0 * (Pi / 180);
    var RadLAM0 = LAM0 * (Pi / 180);

    var af0 = a * f0;
    var bf0 = b * f0;
    var e2 = (Math.pow(af0,2) - Math.pow(bf0,2)) / Math.pow(af0,2);
    var n = (af0 - bf0) / (af0 + bf0);
    var nu = af0 / (Math.sqrt(1 - (e2 * Math.pow(Math.sin(RadPHI),2) )));
    var rho = (nu * (1 - e2)) / (1 - (e2 * Math.pow(Math.sin(RadPHI),2) ));
    var eta2 = (nu / rho) - 1;
    var p = RadLAM - RadLAM0;
    
    var IV = nu * (Math.cos(RadPHI));
    var V = (nu / 6) * ( Math.pow(Math.cos(RadPHI),3)) * ((nu / rho) - (Math.pow(Math.tan(RadPHI),2)));
    var VI = (nu / 120) * (Math.pow(Math.cos(RadPHI),5)) * (5 - (18 * (Math.pow(Math.tan(RadPHI),2))) + (Math.pow(Math.tan(RadPHI),4)) + (14 * eta2) - (58 * (Math.pow(Math.tan(RadPHI),2)) * eta2));
    
    return e0 + (p * IV) + (Math.pow(p,3) * V) + (Math.pow(p,5) * VI);
}


GT_Math.Lat_Long_to_North =function (PHI, LAM, a, b, e0, n0, f0, PHI0, LAM0) 
{
	// Project Latitude and longitude to Transverse Mercator northings
	// Input: - _
	// Latitude (PHI) and Longitude (LAM) in decimal degrees; _
	// ellipsoid axis dimensions (a & b) in meters; _
	// eastings (e0) and northings (n0) of false origin in meters; _
	// central meridian scale factor (f0); _
	// latitude (PHI0) and longitude (LAM0) of false origin in decimal degrees.

	// REQUIRES THE "Marc" FUNCTION

	// Convert angle measures to radians
    var Pi = 3.14159265358979;
    var RadPHI = PHI * (Pi / 180);
    var RadLAM = LAM * (Pi / 180);
    var RadPHI0 = PHI0 * (Pi / 180);
    var RadLAM0 = LAM0 * (Pi / 180);
    
    var af0 = a * f0;
    var bf0 = b * f0;
    var e2 = (Math.pow(af0,2) - Math.pow(bf0,2)) / Math.pow(af0,2);
    var n = (af0 - bf0) / (af0 + bf0);
    var nu = af0 / (Math.sqrt(1 - (e2 * Math.pow(Math.sin(RadPHI),2))));
    var rho = (nu * (1 - e2)) / (1 - (e2 * Math.pow(Math.sin(RadPHI),2)));
    var eta2 = (nu / rho) - 1;
    var p = RadLAM - RadLAM0;
    var M = GT_Math.Marc(bf0, n, RadPHI0, RadPHI);
    
    var I = M + n0;
    var II = (nu / 2) * (Math.sin(RadPHI)) * (Math.cos(RadPHI));
    var III = ((nu / 24) * (Math.sin(RadPHI)) * (Math.pow(Math.cos(RadPHI),3))) * (5 - (Math.pow(Math.tan(RadPHI),2)) + (9 * eta2));
    var IIIA = ((nu / 720) * (Math.sin(RadPHI)) * (Math.pow(Math.cos(RadPHI),5))) * (61 - (58 * (Math.pow(Math.tan(RadPHI),2))) + (Math.pow(Math.tan(RadPHI),4)));
    
    return I + (Math.pow(p,2) * II) + (Math.pow(p,4) * III) + (Math.pow(p,6) * IIIA);
}

go();

GM_registerMenuCommand("Toggle maps on print friendly pages", function() {
	GM_setValue('disablepf', GM_getValue('disablepf', false) ? false : true);
} );
