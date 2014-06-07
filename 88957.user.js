// ==UserScript==
// @name           Webme: Bugfix für "Design einstellen"
// @namespace      homepage-baukasten
// @description    Hebt die Zeichenbegrenzung in den Boxen unter "Design einstellen" auf.
// @include        http://www.homepage-baukasten.de/*
// ==/UserScript== 

textareas=document.getElementsByTagName("textarea");
for(i=1;i<=textareas.length;i++){ 
	textareas[(i-1)].removeAttribute("maxlength"); 
}