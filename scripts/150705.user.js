// ==UserScript==
// @name	Jappy Galerie Fotos Speichern
// @description	Fuegt ein Button ein, der das Bild in einem neuen Tab oeffnet, sodass man es speichern kann.
// @include	http://www.jappy.*/user/*/gallery/*
// @version	1.0
// ==/UserScript==


if(location.href.search('/gallery/')>0){
img_ele="document.getElementById('galleryContent').getElementsByTagName('a')[0].getElementsByTagName('div')[0]";
link="javascript:window.open("+img_ele+".style.background.split('(')[1].split(')')[0],'_newtab')";

document.getElementById('profilebar').innerHTML+=
'<a href="'+link+'" class="inBu3" target="_blank" style="margin:5px 10px;float:left"><span class="icSharePale"></span>Bild in neuen Tab öffnen</a>';
}
