// Made by Woofcat
// ==UserScript==
// @name            Gaijin Smash annoying ad killer.
// @namespace       www.gaijinsmash.net
// @description     Remove ads that disrupt the page.
// @include         http://www.gaijinsmash.net/*
// @include	    www.gaijinsmash.net/*
// @include         http://www.gaijinsmash.net
// @include	    www.gaijinsmash.net
// @include         http://gaijinsmash.net
// @include	    http://gaijinsmash.net/*
// ==/UserScript==



if (a = document.getElementById('mediumAdvertisement')){
  a.style.display="none";
}

if (a = document.getElementById('leaderboardAdvertisement')){
  a.style.display="none";
}
if (a = document.getElementById('advertisingColumn')){
  a.style.display="none";
}
if (a = document.getElementById('rudiusAdvertisements')){
  a.style.display="none";
}
if (a = document.getElementById('sidebarAdvertisements')){
  a.style.display="none";
}
if (a = document.getElementById('eopAdvertisements')){
  a.style.display="none";
}
var RSS =  document.getElementById('FANetRSS');
if (RSS) {
    RSS.parentNode.removeChild(RSS);
}
if (div = document.getElementById('mastheadLeft')){
	div.innerHTML = '<div id="mastheadLeft" style="position:relative; top:90px"><a href="http://www.gaijinsmash.net"><img src="http://www.gaijinsmash.net/images/mastleft.jpg" width="550" height="297" border="0" alt="DevilMonkey.net" /></a></div>';
	document.body.insertBefore(div, document.getElementById('mastheadRight'));
}



