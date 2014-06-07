// ==UserScript==
// @name		Skins.be Forum Add Frame Killer
// @namespace		http://userscripts.org/users/108594
// @description		Kills the Add Frames from the forum images
// @version		1.0
// @include		http://image.skins.be/*
// @copyright		2009, Copyrighted parts may not be reproduced without written consent
// ==/UserScript==

(function () {

	function addEvent( obj, evt, fn ) {
	    if ( typeof obj.attachEvent != 'undefined' ) {
	        obj.attachEvent( "on" + evt, fn );
	    } else if ( typeof obj.addEventListener != 'undefined' ) {
	        obj.addEventListener( evt, fn, false );
	    }
	}

	addEvent( window, 'load', function() {
	    var divs = document.body.getElementsByTagName("div");
		    for (var i = 0; i < divs.length; i++) {
				var div = divs[i];
				var isSpam = div.id.match(/sponsorads([\d]+)/i);
				isSpam && isSpam[1] && document.body.removeChild(div);
		}
	} );

})();
