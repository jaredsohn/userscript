// ==UserScript==
// @name           Jappy-suche Plus
// @namespace      jappy-suche
// @description    erweitert die jappy suche direkt um einen Nachrichten button um einzelne mitglieder anzuschreiben.
// @include        http://www.jappy.de/search
// ==/UserScript==

var cont = document.getElementById("er");

if(cont.hasChildNodes()){
	for(i=0;i<cont.childNodes.length;i++){
		node = cont.childNodes[i];
		if(node.hasChildNodes()){
			userName = node.childNodes[1].getAttribute("href").replace(/\/user\//,"");
			node.innerHTML = node.innerHTML + '<a style="position:relative;top:-24px; height:22px;padding-left:11px;color:#417BC4;" href="http://www.jappy.de/mailbox/new?to='+userName+'">Mail Schreiben</a>';
		}
	}
}
