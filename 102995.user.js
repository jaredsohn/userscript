// ==UserScript==
// @name           GCPrius
// @version        1.1
// @namespace      http://sascha.vogt.at/
// @description    If you are a geocacher with a stupid on-board navigation system which only accepts DD° MM SS coordinates, this is for you.
// @include        *.geocaching.com/seek/cache_details.aspx*
// ==/UserScript==
//
//
//
(function() {

	function dec2dms(dec) {
//		alert('\"' + dec + '\"');
		var work = new Array();
		var dms = ' ';
		work = dec.split(/\s/g);
		var minLat = Math.floor(work[2]);
		var secLat = Math.round((work[2] - minLat) * 60);
		var minLon = Math.floor(work[5]);
		var secLon = Math.round((work[5] - minLon) * 60);
		dms = dms.concat( work[0] , " " , work[1] , " " , minLat.toString() , "\' " , secLat.toString(), "\" " , work[3] , " " , work[4] , " " , minLon.toString() , "\' " , secLon.toString(), "\"");
//		alert(dms);
		return dms;
		};
 
	var destTarget = document.getElementById('uxLatLon');
	var wptable    = document.getElementById('ctl00_ContentBody_Waypoints');
	var dec        = destTarget.innerHTML;
	dms = dec2dms(dec);
	destTarget.innerHTML = dms;

	if (wptable) {
		var allrows = wptable.rows.length;
		var row = 0;
		for (row=0;row<allrows;row++) {
//			alert(row + ' ' + allrows);
			if ( (row + 1) / 2 == Math.floor((row + 1) / 2) ) {
				var cell = 0;
				var tr = wptable.rows[row];
				var foo = tr.cells[6].innerHTML;
				if (foo.indexOf('N')) {
					dec = foo.substring(foo.indexOf('N'), foo.lastIndexOf('&'));
				} else {
					dec = foo.substring(foo.indexOf('S'), foo.lastIndexOf('&'));
				}
				dms = dec2dms(dec);
				tr.cells[6].innerHTML = dms;
			}
		}
	}

})();
