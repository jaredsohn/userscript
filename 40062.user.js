// ==UserScript==
// @name           Hide non friend comments
// @namespace      richbradshaw
// @include        http://friendfeed.com/
// @include        http://friendfeed.com/*
// ==/UserScript==

var code = (function(){
	if (!window.jQuery) return;
	
	jQuery('#body').height('auto');
	
	jQuery('div .comment:not(.friend)').css({'display' : 'none'});
})

// evaluate the Code after jQuery has been loaded...
window.addEventListener("load", function(){
	var scripts = document.getElementsByTagName('script');
	var lastScript = scripts[scripts.length-1];
	var newElement = document.createElement('script');
	newElement.innerHTML = '('+code+')()';
	lastScript.parentNode.insertBefore(newElement, lastScript.nextSibling);
}, false);