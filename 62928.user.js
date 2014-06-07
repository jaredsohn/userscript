// ==UserScript==
// @name           Dashboard removal
// @namespace      *
// @include        *tehconnection.eu/peoples.php?action=person&id=*
// ==/UserScript==

for (i=0; i < document.links.length; i++)
{ 
	var onCl = document.links[i].getAttribute('onclick');
	if(onCl != null && onCl.indexOf("DashBoard(")>-1) {
		onCl = onCl.substring(0, onCl.lastIndexOf("'"));
		onCl = onCl.substring(onCl.lastIndexOf("'")+1);
		
		document.links[i].href = "torrents.php?id="+onCl;
		document.links[i].setAttribute("onclick", "");
	}
}