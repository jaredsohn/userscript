// ==UserScript==
// @name           Sexinsex.Auto.Thanks
// @namespace      http://OpenGG.me
// @description    Sexinsex.Auto.Thanks, auto click the thanks button on loading a thread. You should include proper urls before using it, examples: @include http://67.220.91.30*thread*
// @match          http://sexinsex.net/*thread*
// ==/UserScript==

(function(){
	var thanksDiv, parentDiv, thanksLink;
	( thanksDiv = document.getElementById('thanksdiv') ) &&
	( parentDiv = thanksDiv.parentNode ) &&
	( thanksLink = parentDiv.getElementsByTagName('a')[0] ) &&
	thanksLink.click();
})();