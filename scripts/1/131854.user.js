// ==UserScript==
// @name           Tahoma Font For YouTube
// @author         abmhe
// @description    Changes YouTube font to tahoma (the coolest arabic font ever for websites)
// @include        http://www.youtube.com/*
// ==/UserScript==

//Styles
var cssStyle = "";
cssStyle += "body{font-family:tahoma;}"; 
GM_addStyle(cssStyle);