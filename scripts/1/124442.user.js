// ==UserScript==
// @name          Correct pic size
// @namespace     http://youngpup.net/userscripts
// @description   Correct pic size in pet albums
// @include       http://www.unitedcats.com/en/cat/*/albums/*
// @include       http://www.unitedcats.com/en/dog/*/albums/*
// ==/UserScript==

if (document.getElementById('pic') != null) {
	document.getElementById('photo_container').style.height = "5000px";
}
// end of script