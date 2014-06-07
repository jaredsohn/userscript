// PREtorians ad remover
// v0.324
// ==UserScript==
// @name           PREtorians ad remover
// @description    removes ads on PREtorians tracker
// @include        http://*pretorians.net/*
// ==/UserScript==

var id = document.getElementsByTagName("div");
for (var i=0; i < id.length; ++i) {
	if (id[i].className == "recent-links") {
		id[i].parentNode.removeChild(id[i]);
	}
}

var id = document.getElementsByTagName("center");
for (var i=0; i < id.length; ++i) {
	id[i].parentNode.removeChild(id[i]);
}

var id = document.getElementsByTagName("iframe");
for (var i=0; i < id.length; ++i) {
	id[i].parentNode.removeChild(id[i]);
}

var arsz = document.getElementById('head10').parentNode;
arsz.parentNode.removeChild(arsz);
