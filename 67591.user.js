// ==UserScript==
// @name           Hide Sketchy/NSFW images on Wallbase
// @namespace      http://userscripts.org/users/70005
// @description    Auto-hides the options to search for "Sketchy" or "NSFW" images on Wallbase. Also removes the default "sketchy" images with a quick reload of the page. 
// @include        http://wallbase.net/search
// ==/UserScript==
/*Changelog
1.0.1.30. Initial Release
2.0.6.12. Added changelog. 
	Altered to match new wallbase.net coding
*/
document.body.innerHTML += '<style type="text/css">#filters .fboard ul {display:none !important;} #filters > a{float: left !important; margin-left: 15px !important;}</style>';
var filters=document.getElementById("filters").getElementsByTagName("input")[1];
if(filters.value!=100){filters.value=100; document.forms[0].submit();}
