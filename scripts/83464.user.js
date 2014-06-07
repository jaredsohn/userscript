// ==UserScript==
// @name           Back to basics Gmail Logo
// @namespace      Btb_Gmail_Logo
// @author         Benoît Stella
// @version        1.0
// @homepage       http://bidikia.fr/
// @description    Changes the new default gmail logo by the previous one
// @include        http://mail.google.com/*

// @include        https://mail.google.com/*
// ==/UserScript==

// Based on haden's Change Gmail Logo script
// http://userscripts.org/scripts/show/37452

function onLoadHandler(){


if(window.parent!=null && window.parent.parent!=null && window.parent.parent.document.getElementById("canvas_frame")!=null) {

	canvas_frame= window.parent.parent.document.getElementById("canvas_frame").contentDocument;

	var logo=canvas_frame.getElementById(":rm");
	
	if(logo!=null && logo.tagName=="DIV") {
	
		logo.style.setProperty("background-image","url(\"images/2/5/logo1.png\")","important");

		logo.style.setProperty("margin-left", "20px", "important");

		logo.style.setProperty("margin-right", "0", "important");

	}
		
}
	
}

window.addEventListener('load',onLoadHandler,true);