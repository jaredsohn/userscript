// ==UserScript==
// @name           ek$i sözlük üç nokta geri getirme aparati
// @namespace      http://userscripts.org/users/62169
// @include        http://sozluk.sourtimes.org/index.asp*
// @include        http://sozluk.sourtimes.org/info2left.asp*
// @include        http://www.eksisozluk.com/index.asp*
// @include        http://www.eksisozluk.com/info2left.asp*
// ==/UserScript==

ullist = document.getElementsByTagName("ul")[0];
ullist.style.width = "210px";
linkler = ullist.childNodes;

if (window.location.href.indexOf("index.asp") >= 0) {
	// sol taraf
	
	for (i = 0; i < linkler.length; i++) {
		tdnode = linkler[i];
		if (tdnode.childNodes.length > 1)
			tdnode.childNodes[1] = '&nbsp;' + tdnode.childNodes[1].nodeValue.replace(/^\s+/gi, "");
		entryCount = tdnode.firstChild.title.match(/\(.*?\)/);
		if (entryCount) {
			countArray = entryCount[0].match(/\d+/g);
			if (countArray[0] != countArray[1]) {
				tdnode.innerHTML += '&nbsp;<a href="' + tdnode.firstChild.href + '" style="visibility: hidden;" target="sozmain">...</a>';
				linkler[i].addEventListener('mouseover', function(event) { this.lastChild.style.visibility = 'visible'; }, true);
				linkler[i].addEventListener('mouseout', function(event) { this.lastChild.style.visibility = 'hidden'; }, true);
			}			
			tdnode.firstChild.href = tdnode.firstChild.href.replace(/(&a=[a-z][a-z]|&d=\d\d.\d\d.\d\d\d\d)/, '');
		}
	}
}

else {
	for (i = 0; i < linkler.length; i++) {
	tdnode = linkler[i];
	if (tdnode.firstChild) {
		linkhref = tdnode.firstChild.href.match(/(.*)\%2F%23/)[1];
		if (linkhref) {
				tdnode.innerHTML += '&nbsp;<a href="' + linkhref + '" style="visibility: hidden;" target="sozmain">...</a>';
				linkler[i].addEventListener('mouseover', function(event) { this.lastChild.style.visibility = 'visible'; }, true);
				linkler[i].addEventListener('mouseout', function(event) { this.lastChild.style.visibility = 'hidden'; }, true);
			}
		}
	}
}
