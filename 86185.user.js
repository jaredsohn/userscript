// ==UserScript==
// @name           TVDB Hide Non-English
// @namespace      jobson.us
// @description    Hides non-Englsh langauges from search results
// @include        http://thetvdb.com/?string=*
// ==/UserScript==

var tr = document.getElementById('listtable').getElementsByTagName('tr');
for (var i=1;i<tr.length;i++) {
	if (tr[i].getElementsByTagName('td')[1].innerHTML!='English') {
		tr[i].parentNode.removeChild(tr[i]);
		i--;
	}
}

if (tr.length==2) {
	window.location.href = tr[1].getElementsByTagName('a')[0].href;
}