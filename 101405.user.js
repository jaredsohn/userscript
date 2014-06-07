// ==UserScript==
// @name          Egg On Page!
// @description   Notifies you when an egg is on the page
// @include       http://www.gaiaonline.com/*
// @exclude       http://www.gaiaonline.com/grant?key=easter2011scavX*
// @version       1
// ==/UserScript==

var x = document.getElementsByTagName("a");
var grantkey = "/grant?key=easter2011scav";
for( i in x){
	if(x[i].href.indexOf(grantkey) != -1 ){
		alert("Egg on Page!");
	}
}