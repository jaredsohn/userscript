// ==UserScript==
// @name           Report-tekstvak
// @namespace      rete
// @description    Een automatische vervanging voor de input van het reportsysteem op GMOT.
// @include        http://www.gmot.nl/index.php?action=reporttm;*
// ==/UserScript==

// check if textarea already exists
if(!document.getElementById('_autoTextarea')){

	// get input
	var inputs   = document.getElementsByTagName('input');
	
	// create textarea
	var textarea = document.createElement('textarea');
	
	    // style
	    textarea.style.width        = "500px";
	    textarea.style.height       = "200px";
	    textarea.style.display      = "block";
	    textarea.style.marginTop    = "1em";
	    textarea.style.marginBottom = "1em";
	
	    // name and id
	    textarea.name               = "comment";
	    textarea.id                 = "_autoTextarea";
	
	// replace elements
	inputs[5].parentNode.replaceChild(textarea, inputs[5]);

}