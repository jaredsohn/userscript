// ==UserScript==
// @name GA for everyone.
// @namespace  http://www.stfudamnit.com/
// @description Whingers
// @include  http://www.fluther.com/*
// ==/UserScript==

var pathArray = window.location.pathname.split( '/' );
var secondLevelLocation = pathArray[1];



var curllls = ("http://www.fluther.com/lurve/great/question/" + secondLevelLocation);

var ourDiv = document.getElementById("submit-info");
ourDiv.innerHTML = '<div style="margin-top:-28px; "><a style="background-color:#d9d9d9; padding: 3px; "href=' + curllls + '>Great Question.</a></div>' + ourDiv.innerHTML;


