// ==UserScript==
// @name           vagos.es link rewriter
// @description    Elimina la redireccion de linkdirecto en vagos.es
// @version        1.2
// @author         s0b
// @include        http://vagos.wamba.com/*
// ==/UserScript==

var enlaces = document.getElementsByTagName('a');

for(var i=0; i < enlaces.length; i++) {
	enlaces[i].href = enlaces[i].href.replace("http://www.linkdirecto.com/noref.php?url=","");
	enlaces[i].href = enlaces[i].href.replace("http://links.wamba.com/noref.php?url=","");
}