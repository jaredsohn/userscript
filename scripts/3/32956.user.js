// ==UserScript==
// @name           webshots fullsize
// @namespace      userscripts.org
// @description    webshots fullsize
// @include        http://*.webshots.com/photo/fullsize/*
// ==/UserScript==

(function(){

	if(document.title.match('Webshots - Full Size Photo')){
	
		window.location = document.getElementById('fullsizeimageloader').getAttribute('flashvars').split('source=')[1];

	}

})();