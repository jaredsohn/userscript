// ==UserScript==
// @name           Tahoma Font For Arabic Wikipedia
// @author         haDyy
// @description    Changes wikipedia font to tahoma (the coolest arabic font ever for websites)
// @include        http://ar.wikipedia.org/*
// ==/UserScript==

//Styles
var cssStyle = "";
cssStyle += "body{font-family:tahoma;}"; 
GM_addStyle(cssStyle);