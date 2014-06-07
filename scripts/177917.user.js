// ==UserScript==
 
// @name          Make your browser more ca$h
 
// @namespace     http://www.poweruprecord.co.uk
 
// @description   Make your browser more ca$h. Version 4, supports capitals.
 
// @include       *
 
// ==/UserScript==
 
var n, walk=document.createTreeWalker(document.documentElement,NodeFilter.SHOW_TEXT,null,false);

while(n=walk.nextNode()) {
	n.textContent = n.textContent.replace(/s\b/g, 'z');
	n.textContent = n.textContent.replace(/s/g, "$");
	n.textContent = n.textContent.replace(/\b(?=[^\sf]*f)\S{4,}/g, function(match) { return match.replace(/f/g, "ph");});	
}