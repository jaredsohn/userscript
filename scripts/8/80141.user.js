// ==UserScript==
// @name           getRidOfFlashyThing
// @namespace      /
// @include        http://www.nonexistantsite.com/
/* copyright */
// ==/UserScript==

var images = document.getElementsByTagName('img');
var x;
for(x in images){
	if(x.src == 'images/new.gif'){
		x.style.display = 'none';
	}
}