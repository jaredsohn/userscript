// ==UserScript==
// @name          aim status icon
// @description   aim status icon
// @include       *
// ==/UserScript==

var a, links;
links = document.getElementsByTagName('a');

var re = /screenname/;

for (var i = 0; i < links.length; i++) {
    var a = links[i];
    if (a.href.search(re) !== -1) {

	var snLength = (a.href.length);
	var sn = a.href.substring(20,snLength);
	var link0 = "http://api.oscar.aol.com/SOA/key=je1ZtapBUYJngcu0/presence/";
	var link = link0.concat(sn);

    var newText = document.createTextNode(" \t ");
    a.appendChild(newText);

	newElement = document.createElement('img');
	newElement.src = link;
	a.parentNode.insertBefore(newElement, a.nextSibling); 

    }
}