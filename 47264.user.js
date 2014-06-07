// ==UserScript==
// @name          FullImage
// @namespace     http://jeffpalm.com/fullimage
// @description   Provides links to the full image on Google's image search
// @include       http://images.google.com/images*
// @include       http://google.com/images*
// @include       http://www.google.com/images*
// ==/UserScript==

/*
 * Copyright 2010 Jeffrey Palm.
 */

var TESTING = true;

/** http://javascript.internet.com/snippets/insertafter.html */
function insertAfter(node,ref) {
	ref.parentNode.insertBefore(node, ref.nextSibling);
}

function insert(node,ref) {
	insertAfter(node,ref);
	insertAfter(document.createElement('BR'),ref);
}

function createNewLink(a,color,text,link) {
	var par = a.parentNode;
	var newLink = document.createElement('A');
	newLink.style.color = color;
	newLink.style.fontSize = '.8em';
	newLink.innerHTML = text;
	newLink.href = link;
	return newLink;
}

function main() {
  var as = document.getElementsByTagName('a');
  for (var i=0; i<as.length; i++) {
    var a = as[i];
    if (res = a.href.match(/[\?\&]imgrefurl=([^&]+)&/)) {
			insert(createNewLink(a,'#0000aa','direct link',res[1].replace(/%2520/g,' ')),a)
				}
		if (res = a.href.match(/[\?\&]imgurl=([^&]+)&/)) {
			insert(createNewLink(a,'#770000','full image',res[1].replace(/%2520/g,' ')),a);
    }
  }
}

try {main();} catch (e) {if (TESTING) alert(e);}
