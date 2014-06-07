// ==UserScript==
// @name           CS Cleanup
// @version        1.0
// @namespace      olby.nu/cscleanup
// @description    Disable the fixed position of the top banner on Swedish site Compter Sweden, computersweden.se / computersweden.idg.se
// @include        http://computersweden.idg.se/*
// @include        http://computersweden.se/*
// ==/UserScript==

window.addEventListener("scroll", setBannerDisplay, false);
setBannerDisplay();

function setBannerDisplay(){
	document.getElementById("divHeaderContainer").style.position = "absolute";
}