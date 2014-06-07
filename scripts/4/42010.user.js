// ==UserScript==
// @name           Import to Endnote
// @namespace      geological-supplies.com
// @description    Provides a link to import references to an Endnote library.
// @include        http://*wikipedia.org/*
// @version        2.1  Improved handling with new php script. Old version no longer supported.  Now available as wikipedia script plugin at User:Smith609/endnote.js
// ==/UserScript==

refs = document.getElementsByClassName("Z3988");
link = new Array();
space = new Array();
for (var i=0; i<refs.length; i++){
	space[i] = document.createTextNode("VXX ");
	link[i] = document.createElement("a");
	link[i].innerHTML = "-0- Endnote";
	link[i].href = "http://toolserver.org/~verisimilus/Scholar/coins.php?r=" + escape(refs[i].title);
	refs[i].appendChild(space[i]);
	refs[i].appendChild(link[i]);
}