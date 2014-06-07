// ==UserScript==
// @name           AnonAmp
// @namespace      upoo
// @include        http://anonamp.com/*
// @grant          none
// ==/UserScript==

function expandImage() {
	var img;

	img = this.getElementsByTagName('IMG')[0];
	img.src = img.src.replace(/\/thumb\/([0-9]+)s(\.[a-z]+)/, '/src/$1$2');
	img.style.width = 'auto';
	img.style.height = 'auto';

	return false;
}


var links;
links = unsafeWindow.document.getElementsByTagName('A');

for(var i = 0; i < links.length; i++) {
   
	if(links[i].href.match(/pic\.php\?dir=/) && links[i].getElementsByTagName('IMG').length > 0) {
		links[i].href = 'javascript: return false;';
		links[i].target = '';
		links[i].title = 'matched'
		links[i].addEventListener('click', expandImage, true);
	}/*
	else if(links[i].href.match(/anonamp.com\/.*\/(src|res)\//)) {
		links[i].onclick = (function(href) {
		  return function() {
    		  window.open(href);
    		  return false;
		}})(links[i].href)
	}*/
	
	links[i].onmousedown = function(e) {
	   e.stopPropagation();
	}
}

