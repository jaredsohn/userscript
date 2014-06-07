// ==UserScript==
// @name           	CAPS LOCK DAY @ UNDERSKOG
// @namespace      	http://userscripts.org/users/238471
// @description    	GRATULERER MED DAGEN, N00BS!!1
// @include			http://underskog.no/*
// @include       	http://*.underskog.no/*
// ==/UserScript==


function capslock(){
var sheet = document.createElement('style');
sheet.innerHTML = "* { text-transform:uppercase!important; }";
document.body.appendChild(sheet);
}

window.addEventListener("load", function() {
  capslock()
}, false);