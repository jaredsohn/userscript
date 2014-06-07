// ==UserScript==
// @author         marshen
// @contact        http://o-calc.com/
// @name           ogame button fix
// @namespace      ogbtnfix
// @include        http://*.ogame.*/game/index.php?page=resources*
// @include        http://*.ogame.*/game/index.php?page=station*
// @include        http://*.ogame.*/game/index.php?page=research*
// @include        http://*.ogame.*/game/index.php?page=shipyard*
// @include        http://*.ogame.*/game/index.php?page=defense*
// @include        http://*.ogame.*/game/index.php?page=fleet1*
// ==/UserScript==

//----------
// add stylesheet
//----------
function addCSS(filename) {
	var fileref=document.createElement("link");
	fileref.setAttribute("rel", "stylesheet");
	fileref.setAttribute("type", "text/css");
	fileref.setAttribute("href", filename);
	if (typeof fileref!="undefined")
		document.getElementsByTagName("head")[0].appendChild(fileref);
}


// initialize variables
addCSS("http://gm-og.o-calc.com/button_fix.css");