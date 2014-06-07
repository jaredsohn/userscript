// ==UserScript==
// @name        Fuck you promoted tweets
// @namespace   hotmail
// @include     mobile.twitter.com/*
// @include     m.twitter.com/*
// @include     *.twitter.com/*
// @include     twitter.com/*
// @version     1
// ==/UserScript==

function killit()
{
var kills = document.getElementsByClassName("promoted-label");

for(var i = 0; i < kills.length; i++) 
{ 
	kills[i].parentNode.parentNode.parentNode.style.display = "none";

}
}

setTimeout(killit, 100);
