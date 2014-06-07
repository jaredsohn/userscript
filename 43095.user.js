// ==UserScript==
// @name           Fix Jornada
// @namespace      http://userscripts.org/users/pupitetris
// @description    Cambia el fondo de La Jornada a blanco
// @include        http://www.jornada.unam.mx/2009/*
// @exclude        http://www.jornada.unam.mx/2009/01/*
// @exclude        http://www.jornada.unam.mx/2009/02/0*
// @exclude        http://www.jornada.unam.mx/2009/02/10
// @exclude        http://www.jornada.unam.mx/2009/02/11
// @exclude        http://www.jornada.unam.mx/2009/02/12
// @exclude        http://www.jornada.unam.mx/2009/02/13
// @exclude        http://www.jornada.unam.mx/2009/02/14
// @exclude        http://www.jornada.unam.mx/2009/02/15
// @version        0.2
// @copyright      2009, Arturo Espinosa Aldama (http://userscripts.org/users/pupitetris)
// ==/UserScript==

var BACKGROUND_STYLE = "white";
var BORDER_STYLE = "1px solid black";

function findDivByClassName (parent, className) {
	for (var i = 0, child; child = parent.childNodes[i]; i++)
		if (child.nodeName == "DIV" && child.className == className)
			return child;
	return undefined;
}

var body = document.getElementsByTagName ("body")[0];
body.style.background = BACKGROUND_STYLE;

var mainBlock = findDivByClassName (body, "main-block");
if (mainBlock) {
	mainBlock.style.background = BACKGROUND_STYLE;

	var mainCont = document.getElementById ("main-cont");
	if (mainCont) {
		mainCont.style.background = BACKGROUND_STYLE;
		mainCont.style.border = BORDER_STYLE;
	}

	var pentaFecha = findDivByClassName (mainCont, "penta penta-fecha");
	if (pentaFecha) {
		var mainFecha = findDivByClassName (pentaFecha, "main-fecha");
		mainFecha.style.background = BACKGROUND_STYLE;
	}
}

var mainRemate = findDivByClassName (body, "main-remate gui");
if (mainRemate)
	mainRemate.removeChild (mainRemate.firstChild);

	


