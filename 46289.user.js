// ==UserScript==
// @name		Drunk Blocker
// @description		Keeps you from adventuring while drunk
// @include *127.0.0.1*
// @include *kingdomofloathing.com*
// @include *charpane.php*
// ==/UserScript==



paragraphs = top.frames[1].document.getElementsByTagName("center");
drunk = 0;

for(j in paragraphs) {
	if(paragraphs[j].innerHTML.indexOf(" falling") != -1) {
		drunk = 1;
	}
}

links = document.getElementsByTagName("a");
for(i in links) {
	if(links[i].href.indexOf(".php?snarfblat") != -1 && drunk == 1) {
		links[i].href = "main.php";
	}
	if(links[i].href.indexOf("rats.php?where") != -1 && drunk == 1) {
		links[i].href = "main.php";
	}
	if(links[i].href.indexOf("document.form") != -1 && drunk == 1) {
		links[i].href = "main.php";
	}
	if(links[i].href.indexOf("barrel.php?smash") != -1 && drunk == 1) {
		links[i].href = "main.php";
	}
	if(links[i].href.indexOf("pyramid.php?action=lower") != -1  && drunk == 1) {
		links[i].href = "main.php";
	}
	if(links[i].href.indexOf("hiddencity.php?which") != -1  && drunk == 1) {
		links[i].href = "main.php";
	}
}