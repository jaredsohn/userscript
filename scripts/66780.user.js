// ==UserScript==
// @name           AjaxWhois Clean
// @namespace      http://userscripts.org/users/127838/
// @description    Removes the right side bar on ajaxwhois.com
// @include        http://ajaxwhois.com/
// ==/UserScript==

var wrapper = document.getElementById("mainarea");
var removeSide = function() {
	if (document.getElementById("rightside") && wrapper) {
		document.getElementById("rightside").style.display = "none";
		document.getElementById("header").style.display = "none";
		document.getElementById("welcome").innerHTML = "<h1>AjaxWhos Clean</h1>";
		document.getElementById("instructions").style.display = "none";
		document.getElementById("footer").style.display = "none";
		document.getElementById("leftside").style.padding = "0 10px 0 0";
	}
}
removeSide();