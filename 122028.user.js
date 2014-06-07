// ==UserScript==
// @name	Amapy for geocaching beta maps
// @version	0.1
// @description	Adds czech hiking map to geocaching beta maps
// @match	*://*.geocaching.com/map/beta/*
// @include	*.geocaching.com/map/beta/*
// ==/UserScript==

//	(C) Copyright James Inge 2011, upravil masox

//  PUVODNI LICENCE A INFO
//	Grid reference conversion adapted from code (C) Copyright Chris Veness, 2005-2010.
//	Used under a Creative Commons CC-BY license. See http://www.movable-type.co.uk/scripts/latlong-gridref.html

// Change the variables below to false if you like the geocache list to open in the same window as the map,
// your own finds to show in the list, or to disable the OS Grid Reference search.

var useNewTab = true;
var filterFinds = true;
var osgbSearch = false;


var page = document.location.href;
if( page.match(/cache_details\.aspx/) ) {
	// On a geocache listing
	var oldLink = document.getElementById("lnk_slippyMap");
	if( oldLink ) {
		var target = oldLink.parentNode;
		target.removeChild(oldLink);
		target.innerHTML += '<a id="jri_slippyMap" href="#">View Dynamic Map</a>';
		document.getElementById("jri_slippyMap").addEventListener('click', jriDynamicMap, false);
	} // else No dynamic map link - either not logged in, or not Premium member for private cache.
} else {
	if( page.match(/seek/)) {
		// On the Hide & Seek page
    //nic
	} else {
		// On a Geocaching Maps page
    var s1 = document.createElement("script");
    s1.type = "text/javascript";		
		s1.innerHTML = [
			'function checkAPI() {\
				if( map && google ) {\
					if( google.maps && typeof map.mapTypeId == "string" ) {\
						if( typeof google.maps.Size == "function" && typeof google.maps.ImageMapType == "function" ) {\
							loadBingMaps();\
							return;\
						}\
					}\
				}\
				window.setTimeout(checkAPI,2000);\
				return;\
			}\
			function loadBingMaps() {\
				var target = document.getElementById("mt_standard");\
				if( target ) {\
					target.innerHTML += "<li><a mapid=\'amapy\' href=\'#\' title=\'Amapy.cz\'>Amapy.cz</a></li>";\
					map.mapTypes.set("amapy",new google.maps.ImageMapType({alt: "Amapy.cz",copyright: "© 2011 Google - Data map ©2011 Google, PPWK, TeleAtlas",getTileUrl: function(a,b){return["http://maps11.i0.cz/mps/ch_turis/"+b+"/"+a.x+"/"+a.x+"_"+a.y+".gif"].join("");},minZoom:13,maxZoom:16,name: "amapy",tileSize: new google.maps.Size(256,256)}));\
				}\
				var listIcon = \'<img border="0" style="position: relative; top: 3px;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAK3RFWHRDcmVhdGlvbiBUaW1lAFdlZCA5IFNlcCAyMDA5IDE5OjU3OjAzIC0wMDAwmC%2BFwgAAAAd0SU1FB9kJCRMJORla5NQAAAAJcEhZcwAACxIAAAsSAdLdfvwAAAAEZ0FNQQAAsY8L%2FGEFAAAABnRSTlMAAAAAAABupgeRAAABh0lEQVR42mNkAANJPQ85cy8xVVMIl5GR8e%2Bfnwz%2FGf8zMl7fs%2B7%2B3n4GGGCEUG5N%2B5cVWDAxQbn%2F%2F0PJ119%2BLT394dHND4vK9CBSLBCKifE%2FKzNTfnY6Ly8vNzd3aHbz77%2F%2Ffv75by7PHWjKtY2FQcuv%2BtqmVoQGsIkM%2Bc1z4BYzMTIC7Xv%2B7rs8D3OalfD%2BY04oGoCOBjqgON6NHwwg9gRkNN1%2By%2Fjr3x8bBVZGJgYUJzGzsAItmbp0D4T7j%2BH%2F3%2F%2F%2Ff%2F3%2Bz87GzPSP8T8DEwsrG6ofmJj%2FMTBMa8vPrp6YFeWCbA8HB4dhSRUTEwuKBggAqgaS05btAdr25%2B%2F%2Ff%2F%2F%2Ff%2Fvz7%2Fff%2F8hqUDRMbc1Pq5iQH%2BuKZoN2SRV2DSW17QwM3%2Bev2PT337%2Bvf7nx2SDMxcDJzNDQXFnf0hMW6Ilmg0lFlTg%2FNhuAqoHkqvXbgWYCjf%2F79%2F%2Fvv3%2BBtuH0Q2NNCVYbyipw%2BIEYG5gYSASwtPTvf96Ci6AkxQhLWFD6PzTh%2FIOKAgAP47NK51EXOgAAAABJRU5ErkJggg%3D%3D" alt="List"/>\';\
				var refreshIcon = \'<img border="0" style="position: relative; top: 3px;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAMAAAAMCGV4AAAALHRFWHRDcmVhdGlvbiBUaW1lAFRodSAxMSBBdWcgMjAxMSAyMjo0NTozNyAtMDAwMNeuoP4AAAAHdElNRQfbCAsVMhpZo0YcAAAACXBIWXMAAAsSAAALEgHS3X78AAAABGdBTUEAALGPC%2FxhBQAAAIdQTFRFAAAAe3t7nJyltb3GvcbWrbW9lJScjIyUvcbOztbnhISExtbn5%2B%2Fvpa2thISMc3uEhIyMe3uE1tbWc3t7jJSca3Nzzs7OnKWte4SE3t7ejJSUnJyca2tzxs7ejIyMWmNjxs7WY2trra2tWmNrlJycrbXGpa21nKWla3N7Y2tztb3Oa2trWlpj868vmwAAAAF0Uk5TAEDm2GYAAACkSURBVHjaRY%2BBDoIwDESLDtjBJsgYgoBjiCLK%2F3%2Bfm0a8pE1fe01aIqJE8j4FnwP6KBoApC649DgBYnqtXSTGNXfmHpUxdZvYRdtnQHcIoxvnnh9qwUQMkykcjp3KLG7Uw%2BYer1prA%2BbY7LBpcKwvf2bE0XbNxiGdIHTtG4106UxHhkKpUpZKV25MFKcQ8pDlUoAn%2FuCY%2F5aT70PBbs8YCyNfvwGKaAxYf68FdQAAAABJRU5ErkJggg%3D%3D" alt="Refresh"/>\';\
				target = document.getElementById("tutorial_link");\
				if( target ) {\
					var container = document.createElement("span");\
					container.innerHTML = [\' | <a id="listLink" title="Show caches as list" href="#">\', listIcon,\
						\'</a> | <a id="refreshLink" title="Refresh session">\', refreshIcon, "</a>"].join("");\
					target.parentNode.insertBefore(container,target.nextSibling);\
				} else {\
					return;\
				}\
				document.getElementById("listLink").addEventListener("click", list_fn, false);\
				document.getElementById("refreshLink").addEventListener("click", refresh_fn, false);\
			}\
			function list_fn() {\
				var url = "http://www.geocaching.com/seek/nearest.aspx?lat=" + map.getCenter().lat() + "&lng=" + map.getCenter().lng();',
			filterFinds ? 'url += "&f=1";':'',
				'document.getElementById("listLink").href = url;',
			useNewTab ? 'document.getElementById("listLink").target = url;':'',
			'}\
			function refresh_fn() {\
				if(map) {\
					var b=map.getCenter(),f=map.getZoom(),g=["http://coord.info/map?ll=",b.toUrlValue(),"&z=",f].join("");\
					if(map.getMapTypeId()!=google.maps.MapTypeId.ROADMAP) {\
						g+="&mt="+map.getMapTypeId();\
					}\
					document.location = g;\
				}\
			}',
			osgbSearch ? osgbFunctions:'',
			osgbSearch ? '	function geocodeGR(e) {\
				e.preventDefault();\
				e.stopImmediatePropagation();\
				var searchVal = $.trim($("#location_search").val());\
				if (geocoder == null) {\
					geocoder = new google.maps.Geocoder();\
				}\
				if (searchVal.length > 0) {\
					var gr = searchVal.match(/^\\s*([hnstHNST][A-Ha-hJ-Zj-z])\\s*((?:\\d\\d){1,5})\\s*$/);\
					if( gr != null ) {\
						if(gr.length==3){\
							if(2* Math.floor(gr[2].length / 2 ) == gr[2].length){\
								var ngr = gridrefLetToNum(gr[1], gr[2]);\
								var coords = OSGridToLatLon(ngr[0], ngr[1]);\
								map.panTo(new google.maps.LatLng(coords.lat,coords.lon));\
								map.setZoom(10+gr[2].length/2);\
							}\
						}\
						return false;\
					}\
					gr = searchVal.match(/^\\s*(\\d{3,6})\\s*,\\s*(\\d{4,7})\\s*$/);\
					if( gr != null ) {\
						if(gr.length==3){\
							var coords = OSGridToLatLon(gr[1], gr[2]);\
							map.panTo(new google.maps.LatLng(coords.lat,coords.lon));\
						}\
						return false;\
					}\
					geocoder.geocode({ "address": searchVal }, function (results, status) {\
						if (status == google.maps.GeocoderStatus.OK) {\
							if (results[0].geometry.viewport) {\
								map.fitBounds(results[0].geometry.viewport);\
							} else {\
								map.setCenter(results[0].geometry.location);\
							}\
						} else {\
							alert("Geocode was not successful for the following reason: " + status);\
						}\
					});\
				};\
				return false;\
			}\
			$("#location_search").unbind();\
			$("#location_search").keyup(function (e) {\
				if (e.keyCode == 13) {\
					e.stopImmediatePropagation();\
					e.preventDefault();\
					$("#btn_Search").triggerHandler("click");\
					return false;\
				}\
			});\
			$("#btn_Search").unbind();\
			$("#btn_Search").click(geocodeGR);':'',
			'checkAPI();'
		].join('');
		document.documentElement.firstChild.appendChild(s1);

		if(osgbSearch) {	
			var locPanel = document.getElementById("find_loc_pnl");
			if( locPanel ) locPanel.innerHTML += '<a style="float:right;margin-right:1em;cursor:help;" title="To search using a British National Grid reference, just type it in the search box and hit Go! You can use 2, 4, 6, 8 or 10-digit grid refs with the 2-letter prefix but no spaces in the number (e.g. SU12344225) or absolute grid refs with a comma but no prefix (e.g. 439668,1175316).">OSGB</a>';
		}
	}
}

function jriDynamicMap(e) {
	e.preventDefault();
	if (typeof google !== 'undefined' && typeof google.maps !== 'undefined') {
		displayDynamicMap();
	} else {
		var s1 = document.createElement("script");
		s1.type = "text/javascript";
		s1.innerHTML = 'function displayJRIDynamicMap() {\
		$sm = $("#staticMap");\
		$map = $("<div />").addClass("map").css({ height: 325, width: 325 });\
		$("#jri_slippyMap").replaceWith($("<span>Showing Dynamic Map</span>"));\
		var items = $sm.data("markers");\
		console.log(items);\
		var bounds = new google.maps.LatLngBounds();\
		var markers = [];\
		for (var x = 0, len=items.length; x < len; x++) {\
			var item = items[x];\
			var ll = new google.maps.LatLng(item.lat, item.lng);\
			bounds.extend(ll);\
			markers.push(new google.maps.Marker( { clickable:false, icon: item.marker, position: ll, zIndex: google.maps.Marker.MAX_ZINDEX + (item.primary ? 1 : 0) }));\
		}\
		$sm.replaceWith($map);\
		var map = new google.maps.Map($map.get(0), { zoom: 14, center: bounds.getCenter(), mapTypeId: google.maps.MapTypeId.ROADMAP, mapTypeControl: true, navigationControlOptions: { style: google.maps.NavigationControlStyle.SMALL}, mapTypeControlOptions: { mapTypeIds: ["bingos", google.maps.MapTypeId.ROADMAP, google.maps.MapTypeId.HYBRID] }});\
		map.mapTypes.set("bingos",new google.maps.ImageMapType({alt: "Bing Ordnance Survey Maps",copyright: "Map data copyright Ordnance Survey",getTileUrl: function(coord,zoom) {for(var k=coord.x%(1<<zoom),l=coord.y,f="",d=zoom;d>0;d--){var g=1<<d-1,e=0;(k&g)!=0&&e++;if((l&g)!=0)e+=2;f+=e;}return ["http://ecn.t",Math.floor(Math.random()*4),".tiles.virtualearth.net/tiles/r",f,"?g=737&productSet=mmOS"].join("");},maxZoom:15,name: "OS",opacity: 1,tileSize: new google.maps.Size(256,256)}));\
		for(var x=0, len=markers.length; x<len;x++) { markers[x].setMap(map); } \
			if (bounds.length>1) { map.fitBounds(bounds); }\
		}';
		document.documentElement.firstChild.appendChild(s1);

	}
}