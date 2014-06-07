// <![CDATA[
// ==UserScript==
// @name          Fly Resizer
// @fullname      Fly Resizer
// @author        Glenn Y. Rolland
// @version       2009-03-12.3
// @licence       GPL v2
// @namespace     http://userscripts.org/scripts/show/44123
// @description   Flash video resizer for the live work sessions of the National Assembly of France.
// @include       http://www.assemblee-nationale.fr/*/seance/seancedirect.asp
// ==/UserScript==


window.setTimeout(function() {
	var container = document.getElementById("container");
	var ply = document.getElementById("ply");

	var footer = container.parentNode.lastChild;

	while (footer.tagName != "DIV" ) {
		footer = footer.previousSibling;
	}
	
	// remove useless elements
	footer.style.display = "none";
	footer.style.visibility = "hidden";

	// resize video
	var win_width = document.body.clientWidth - 40 ;
	var win_height = document.body.clientHeight - 40 ;
	var win_ratio = win_width / win_height;

	var flv_width = 320;
	var flv_height = 260;
	var flv_ratio = flv_width / flv_height;

	var new_height = null;
	var new_width = null;

	if ( win_ratio > flv_ratio ) {
		// height is the limiter
		new_width = Math.floor( ( 320 * win_height ) / 260 )
		new_height = win_height;
	} else {
		// width is the limiter
		new_width = win_width;
		new_height = Math.floor( ( 260 * win_width ) / 320 ) 
	}
	ply.width = new_width;
	ply.height = new_height;
}, 60);

// ]]>

