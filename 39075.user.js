// ==UserScript==
// @name           Last.fm love track listen
// @namespace      www.lastfm.pl
// @description    Adds button to listen out love tracks on Last.fm
// @include        http://*last.fm/*
// @include        http://*lastfm.*/*
// ==/UserScript==

function getElementsByClassName(name, parent){
	for(var o = [], n = new RegExp("\\b" + name.replace(/([(){}|*+?.,^$\[\]\\])/g, "\\\$1") + "\\b"), l = (parent || document).getElementsByTagName("*"), i = l.length; i--;)
	n.test(l[i].className) && (o[o.length] = l[i]);
	return o;
}

var tab = getElementsByClassName("subjectCell", document.body);
for(i = 0; i < tab.length; i++) {
	var links = tab[i].getElementsByTagName('a');
	var str = links[0].innerHTML + " " + links[1].innerHTML;
	var a = document.createElement('a');
	a.setAttribute('href',"http://www.google.pl/search?hl=pl&q="+str+"&btnI=Szcz%C4%99%C5%9Bliwy+traf&lr=");
	a.setAttribute('target',"wrzuta");
	a.style.color = "#002299";
	a.innerHTML = "Play ";
	if(tab[i].getElementsByTagName('div').length > 0) tab[i] = tab[i].getElementsByTagName('div')[0];
	var first = tab[i].firstChild; tab[i].insertBefore(a, first);
}