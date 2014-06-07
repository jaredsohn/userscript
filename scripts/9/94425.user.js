// ==UserScript==
// @name           Southpark.de Player English
// @namespace      http://derpad.de/is/awesome
// @description    Sets English as the default language in the Southpark.de episode player
// @include        http://www.southpark.de/alleEpisoden*
// ==/UserScript==

var str = ""+window.location;
var tmp = str.substring(str.length-8);

if(tmp.substring(2) == "?lang=" || tmp == "?lang=en") {
	//window.location=window.location+="en";
} else {
	window.location=window.location+"?lang=en";
}