// ==UserScript==
// @name           note di terapia
// @namespace      http://userscripts.org/notediterapie
// @description    cambia il maiuscolo in minuscolo
// @include        http://www.otiomeopatici.com/cd/medicina_naturale/omeopatia/omotossicologia/NOTE%20DI%20TERAPIA/*
// @exclude        http://www.otiomeopatici.com/cd/medicina_naturale/omeopatia/omotossicologia/note%20di%20terapia/*
// ==/UserScript==

var oldloc = this.location.href;
if(oldloc.charCodeAt(oldloc.lastIndexOf("/")-1)== 65){
	var newloc = oldloc.substring(0,oldloc.lastIndexOf("/")).toLowerCase() + oldloc.substring(oldloc.lastIndexOf("/"));
	this.location.replace(newloc);
}