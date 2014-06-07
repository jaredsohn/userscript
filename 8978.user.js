// ==UserScript==
// @name           Heise.de pure content
// @namespace      *
// @include        http://www.heise.de/newsticker/*
// @exclude        http://www.heise.de/newsticker/meldung/print/*
// @exclude        http://www.heise.de/newsticker/foren/*
// @exclude        http://www.heise.de/newsticker/*view=zoom*
// ==/UserScript==

var root = document.getElementsByTagName("body");
root = root[0];
root.style.backgroundColor = "white";
root.style.backgroundImage = "none";

function remove_node_class(tagname, cla) {
	var ebody = document.getElementsByTagName(tagname);
	for (var i = 0; i <= (ebody.length - 1); i++) {
		var el = ebody[i];

		if (el.className == cla) {
			el.parentNode.removeChild(el);
		}
	}
}


elist = document.getElementsByTagName("div");

for (var i = 0; i <= (elist.length - 1); i++) {
	if (elist[i].id == "mitte_links") { el = elist[i]; }
}	

i = 0;
		
while (root.childNodes.length > 0) {
	root.removeChild(root.firstChild);
}

root.appendChild(el);

textel = document.getElementsByTagName("div");

textel = document.getElementsByTagName("p");

for (var i = textel.length - 1; i > 0; i--) {
	if (textel[i].className == "translation") {
		textel[i].parentNode.removeChild(textel[i]);
	}

}

remove_node_class("div","related_items");
remove_node_class("div","readspeaker");
remove_node_class("p","news_navi");