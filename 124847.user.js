// ==UserScript==
// @name           	MunzeeMapFilter
// @description		Owned and captured Munzees are filtered from munzee.com/map without unchecking the boxes manually. You can also show ONLY special munzees.
// @namespace      	da-fi.de
// @include        	http://www.munzee.com/map
// @copyright       Daniel Fischer <dafi@da-fi.de>
// @license         Creative Commons Attribution-NonCommercial-ShareAlike 3.0, http://creativecommons.org/licenses/by-nc-sa/3.0/
// @version		   	1.4
// @require			http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// ==/UserScript==
//
//
// Changelog:		1.4		- you can switch clustering
//
//					1.3		- captured Mysteries are not shown when showing only the special munzees
//
//					1.2		- fixed bug not showing all special munzees
//
//					1.1		- you can show only the special munzees
//
//					1.0		- 
//
//
//=====================================================================================================================================


// jQuery workaround for Chrome
// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}


// Magic
function magic() {
	var zoom = markerClusterer.getMaxZoom();
	$("#ownedMunzees").attr('checked', false);
		var map = markerClusterer.getMap( );
        for (var i = 0; i < ownedMarkers.length; i++) {
          var marker = ownedMarkers[i];
          console.log ( marker );
          markerClusterer.removeMarker( marker, map );
        }
	$("#capturedMunzees").attr('checked', false);
		map = markerClusterer.getMap( );
        for (var j = 0; j < capturedMarkers.length; j++) {
          marker = capturedMarkers[j];
          markerClusterer.removeMarker( marker, map );
        }
      resetMap( );
	  
	  $("ul.inputs-list:first").append("<li><label><input type='checkbox' id='specialMunzees' name='specialMunzees'><span>Display ONLY Special Munzees</span></label></li><li><label><input type='checkbox' id='cluster' name='cluster' checked='check'><span>Cluster?</span></label></li>");
	  
	  $('#specialMunzees').change(function( ) {
	  if (this.checked) {
		map = markerClusterer.getMap( );
		for (var i = 0; i < normalMarkers.length; i++) {
		  var marker = normalMarkers[i];
		  var micon = marker.getIcon();
		  if (micon.indexOf("pin") != -1) {
			markerClusterer.removeMarker( marker, map );
		  }
		}
		for (var j = 0; j < capturedMarkers.length; j++) {
          var marker = capturedMarkers[j];
          var micon = marker.getIcon();
          if (micon.indexOf("pin") == -1 && micon.indexOf("mystery") == -1) {
			markerClusterer.addMarker( marker, map );
		  }
        }
		markerClusterer.setMaxZoom(1);
		resetMap( );
	 } else {
	    map = markerClusterer.getMap( );
		for (var i = 0; i < normalMarkers.length; i++) {
		  var marker = normalMarkers[i];
		  var micon = marker.getIcon();
		  if (micon.indexOf("pin") != -1) {
			markerClusterer.addMarker( marker, map );
		  }
		}
		markerClusterer.setMaxZoom(zoom);
		resetMap( );
	 }
	});
	
	$('#cluster').change(function( ) {
	  if (!this.checked) {
		markerClusterer.setMaxZoom(1);
		resetMap( );
	 } else {
		markerClusterer.setMaxZoom(zoom);
		resetMap( );
	 }
	});
}


// load jQuery and execute
addJQuery(magic);
