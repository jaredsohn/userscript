// ==UserScript==
// @name			Google Images Smush It Link
// @namespace		gimagesSmushItLink
// @author			Erik Vergobbi Vold
// @version			0.1
// @license			GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @datecreated		2009-08-11
// @lastupdated		2009-08-11
// @description		This userscript will add 'smush it' links to each Google Images search result making it easier to smush images you find.
// @include			http://images.google.*/*
// ==/UserScript==

var gimagesSmushItLinkClick = function( index ) {
	var urlString = document.getElementById("tDataImage"+index).getElementsByTagName( "img" )[0].src.match( /:http.*$/i )+"";
	urlString = urlString.match( /http.*$/i )+"";

	GM_xmlhttpRequest({
		method: "GET",
		url: "http://smushit.com/ysmush.it/ws.php?img=" + encodeURI( urlString ),
		onload: function(response) {
			var responseObject = eval('(' + response.responseText + ')');
			var outputDiv = document.getElementById( "image" + index + "SmushItDivID" );

			if ( responseObject.dest_size != undefined ) {
				responseObject.dest_size = responseObject.dest_size*1;
				if ( responseObject.dest_size > 0 ) {
					// worked
					outputDiv.innerHTML = 'Percent Saved: ' + responseObject.percent + '%<br/><a target="_blank" href="' + responseObject.dest + '"/>Get Smushed Image</a>';
				}
				else {
					// fail
					outputDiv.innerHTML = 'Error: ' + responseObject.error;
				}
			}
			else if ( responseObject.error != undefined ) {
				// fail
				outputDiv.innerHTML = 'Error: ' + responseObject.error;
			}
			return true;
		}
	});
}

var gimagesSmushItLink = function( index ) {
	if( index == undefined ) {
		var index = 0;
	}

	var temp = document.getElementById( "tDataText" + index );

	if( temp == undefined ) {
		return;
	}

	var newDiv = document.createElement("div");
	newDiv.id = "image" + index + "SmushItDivID";
	var newLink = document.createElement("a");
	newLink.href = "javascript:void(0)";
	newLink.title = "Smush It!";
	newLink.innerHTML = "Smush It!";
	newDiv.setAttribute( "style", "font-size:12px;" );
	newLink.addEventListener( "click", function(e){ gimagesSmushItLinkClick( index ) }, false );
	newDiv.appendChild( newLink );
	temp.appendChild( newDiv );

	gimagesSmushItLink( index + 1 );
}
gimagesSmushItLink(0);