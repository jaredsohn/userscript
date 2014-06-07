// ==UserScript==
// @name           Disable Neoseeker Smilies
// @namespace      smileyneo
// @description    Automatically checks 'Disable smileys in this post'.
// @include        http://neoseeker.com/forums/*
// @include        http://www.neoseeker.com/forums/*
// ==/UserScript==

// On window load
window.addEventListener("load", function(e) {

	// Get the input node
	if(input_node = document.getElementById('disablesmileys')) {

		// 'Check' it.
		input_node.checked = 'checked';

	}
	
}, false);