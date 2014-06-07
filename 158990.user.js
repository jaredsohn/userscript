var GMSU_meta_158990 = <><![CDATA[
// ==UserScript==
// @name        Remove featured Youtube videos
// @include     http://*.youtube.com/*
// @include     https://*.youtube.com/*
// @description as the name states, it removes those stupid movies that show up even though they have nothing to do with your preferences just because the mob is watching them
// @grant	none
// @version     0.3
// @require	http://userscripts.org/scripts/source/51513.user.js
// ==/UserScript==
]]></>;
GMSU.init(158990);

try{
	var junk=document.getElementsByClassName("yt-badge-std");
	for (var i=0;i<junk.length;i++){
		junk[i].parentNode.parentNode.parentNode.parentNode.removeChild(junk[i].parentNode.parentNode.parentNode);
	}
}
catch(err){
	if (junk[i]==0){}
}