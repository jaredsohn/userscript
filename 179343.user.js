// ==UserScript==
// @name        AutoAAO
// @namespace   LST
// @include     http://www.feuerwache.net/feuerwehr-einsaetze
// @version     1
// ==/UserScript==

unsafeWindow.rel = function() {
	window.location.reload();
}

window.setTimeout('rel()', 30000);

for(var i= 0; i< document.getElementsByTagName('tr').length; i++) {
	//Enthält die Zelle ein Icon?
	if(document.getElementsByTagName('tr').item(i).childNodes.item(1).className == 'tdIcon'){
		//Einsatz neu?
		if(document.getElementsByTagName('tr').item(i).childNodes.item(1).childNodes.item(1).src == 'http://www.feuerwache.net/images/lightning.png') {
			//Eigener Einsatz?
			if(document.getElementsByTagName('tr').item(i).childNodes.item(5).getElementsByTagName('a').length > 0){
				//Eigenen Einsatz öffnen
				var url = document.getElementsByTagName('tr').item(i).childNodes.item(3).childNodes.item(1).getAttribute('href');
				window.location.href = 'http://www.feuerwache.net'+ url;
			}
		}
	}
}