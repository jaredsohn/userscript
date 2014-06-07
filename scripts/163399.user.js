// ==UserScript==
// @name          RPS Comment Free
// @namespace     http://trioptimum.co.uk/userscripts
// @description	  Hides comments, comment counts, and comment sidebar on Rock Paper Shotgun
// @include       http://www.rockpapershotgun.com/*
// ==/UserScript==

var div = document.getElementById("comments");

if ( div ) {
	div.style.display = "none";
}

var commentlink = document.getElementsByClassName('comments');
for ( i = 0; i < commentlink.length; i++ ) {
	commentlink[i].style.display = 'none';
}
var commentblock = document.getElementsByClassName('respond');
commentblock[0].style.display = 'none';
