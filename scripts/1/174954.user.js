// ==UserScript==
// @name        Kickern-Hamburg
// @namespace   Test
// @description Modifiziert die Ligaseiten des Hamburger Kickerverbandes.
// @include     http://www.kickern-hamburg.de/liga-tool/mannschaftswettbewerbe?task=veranstaltung&veranstaltungid=63
// @require	    http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @grant		none
// @version     2
// ==/UserScript==

$(document).ready(function() {  
	alert('Hallo Du da : ' + kuckuck);
});

var Teams = {"bindings": [
        {"Name": "Kick Deluxe LSV", "ID": "792"},
        {"Name": "Makrele", "ID": "793"},
        {"Name": "Motorisierte Heckenscheren", "ID": "794"},
        {"Name": "PMS Hamburg", "ID": "795"},
    ]
};

//while (Knoten2!= null) {
for ( i=0 ; i<=10 ; i++) {
	// Filtere die Zelle aus dem DOM heraus
	Zelle=document.getElementsByTagName('table')[4+i].getElementsByTagName('tbody')[0].getElementsByTagName('tr')[0].getElementsByTagName('td')[0]
	Knoten=Zelle.firstChild;
	// Mannschaftsname zwischenspeichern
	Mannschaftsname=Knoten.nodeValue;
	for ( j=0 ; j<4; j++) {
		if (Mannschaftsname.trim() == Teams.bindings[j].Name) {
			TeamID=Teams.bindings[j].ID;
	Zelle.removeChild(Knoten);
	var link_elem = document.createElement('a');
	link_elem.href = 'http://www.kickern-hamburg.de/liga-tool/mannschaften?task=team_details&veranstaltungid=54&id='+TeamID;
	var text_elem = document.createTextNode(Mannschaftsname);
	link_elem.appendChild (text_elem);
	Zelle.appendChild(link_elem);
		}
	}
	//	alert(Knoten2.nodeName);
//	Knoten2=Knoten2.nextSibling;
}

