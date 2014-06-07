// ==UserScript==
// @name           link_style
// @namespace      http://yperevoznikov.com
// @description    Make all links on whatever page how you like
// @include        http://*
// ==/UserScript==


setInterval(function(){
	
	/**
	 * There are different styles for page's links (commit the options by '//' at start of line)
	 */
	var color = '#FF0000'; // hex code of color
	var underlined = false; // true | false
	var fontSize = '14'; 
	
	var elements = document.getElementsByTagName('a');
	
	for (var i in elements) {
		if (undefined !== color) {
			elements[i].style.color = color;
		}
		if (undefined !== underlined) {
			elements[i].style.textDecoration = underlined ? 'underline' : 'none';
		}
		if (undefined !== fontSize) {
			elements[i].style.fontSize = fontSize;
		}
	}	
}, 100);