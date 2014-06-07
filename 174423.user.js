// ==UserScript==
// @name		Mathaeser.de
// @version		0.2.1
// @author		unrealmirakulix
// @description	passt Mathaeser.de für Opera 15+ an
// @icon 		http://static.mathaeser.de/1d2999443924841b00aa30b7e38930fd/omni/img/favicons/favicon_mathaeser.ico
// @include 	http://www.mathaeser.de/mm/cinecard_premium_club_mum/mein_konto/Login/
// @copyright   none
// @updateURL 	http://userscripts.org/scripts/source/174423.meta.js
// @downloadURL http://userscripts.org/scripts/source/174423.user.js
// ==/UserScript==

// Handler for .ready() called
if (document.readyState == 'complete' || document.readyState == 'interactive') {
	
	document.getElementById("portalColumnContent").style.marginLeft = "190px";

};