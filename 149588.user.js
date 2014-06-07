	// ==UserScript==
	// @name                Hello World
	// @namespace	        http://eoldal.hu
	// @description	        example script to alert "Hello world!" on every page
	// @include		http://eoldal.hu
	// @include		http://eoldal.hu/*
	// @include		http://*.eoldal.hu/*
        // @version             20121004 1028
	// ==/UserScript==

	alert('Hello world!');

(function() {

	var elmNewContent = document.createElement ('almafa');
	document.body.appendChild (elmNewContent)

})();