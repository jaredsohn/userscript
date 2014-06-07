// ==UserScript==
// @name        Open Instagram links in new tabs
// @author		Xiao
// @include     *://instagram.com/*
// @version     1
// @grant       none
// ==/UserScript==

window.addEventListener('click', function(e){
	if(e.button == 1 || (e.button == 0 && e.ctrlKey)){
		e.stopPropagation();
	}
}, true);