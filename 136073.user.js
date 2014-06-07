// ==UserScript==
// @name           Tahoma Font For vozforums
// @author         favadi
// @description    Changes vozforums font to Tahoma
// @include        http://vozforums.com/*
// ==/UserScript==

//Styles
var cssStyle = "";
cssStyle += "body{font-family:tahoma;}";
GM_addStyle(cssStyle);
