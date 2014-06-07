// ==UserScript==
// @name Stämme Map Grose Karte
// @namespace http://harmoniemand.de
// @include http://de67.die-staemme.de/game.php?*
// ==/UserScript==


/********************************************************
 *	Vergrößerung der Map.
 *	Leider gibt es hier offensichtlich noch Verbesserungsbedarf.
 *
 **** 
 *	Script for a bigger Map
 *	There are some mistakes. Sometimes there are graphical bugs.
 */

if ( document.URL.search( /screen=map/ ) > 0 ) {
	//alert(  "bla");
	window.setTimeout(function() { 
	 document.getElementById("map").style.width = "500px";
	 document.getElementById("map").style.height = "350px"; }
	, 1000);
}



/********************************************************
 *	Schnellumschalter für die Gebäude
 *	Erstellt ein DIV auf der linken Seite mit der Gebäudeliste.
 *
 **** 
 *	Quickchange for the buildings
 *	Creates a DIV on the left side.
 */
		var outerBorder = document.createElement("div");		
		var class = document.createAttribute("class");
		class.nodeValue = "outerBorder";
		outerBorder.setAttributeNode( class );
		var style = document.createAttribute("style");
		style.nodeValue ="position:fixed; top: 100px; left:20px; width:150px;";
		outerBorder.setAttributeNode( style );
		
		var innerBorder = document.createElement("div");
		var class = document.createAttribute("class");
		class.nodeValue  = "innerBorder";
		innerBorder.setAttributeNode( class );
		
		var table = document.createElement("table");
		var class = document.createAttribute("class");
		class.nodeValue  = "vis";
		table.setAttributeNode( class );
		var width = document.createAttribute("width");
		width.nodeValue  = "100%";
		table.setAttributeNode( width );
		
		var tbody = document.createElement("tbody");
		
		var tr1 = document.createElement("tr");
		var th1 = document.createElement("th");
		
		var tr2 = document.createElement("tr");
		var td1 = document.createElement("td");
		
		var newText = document.createTextNode("Deine Dörfer");
  		th1.appendChild( newText );
		
		var newText = document.createTextNode("");
  		td1.appendChild( newText );
		
		var url_split = document.URL.split("?");
		var url_get = url_split[1].split("&");
		var dorfId = url_get[0].split("=");
		
		td1.innerHTML += "<a href='http://de67.die-staemme.de/game.php?village="+dorfId[1]+"&screen=main'>Hauptgebäude</a>";
		td1.innerHTML += "<br>";
		td1.innerHTML += "<a href='http://de67.die-staemme.de/game.php?village="+dorfId[1]+"&screen=barracks'>Kaserne</a>";
		td1.innerHTML += "<br>";
		td1.innerHTML += "<a href='http://de67.die-staemme.de/game.php?village=="+dorfId[1]+"&screen=stable'>Stall</a>";
		td1.innerHTML += "<br>";
		td1.innerHTML += "<a href='http://de67.die-staemme.de/game.php?village="+dorfId[1]+"&screen=garage'>Werkstatt</a>";
		td1.innerHTML += "<br>";
		td1.innerHTML += "<a href='http://de67.die-staemme.de/game.php?village="+dorfId[1]+"&screen=market'>Markt</a>";
		td1.innerHTML += "<br>";
		td1.innerHTML += "<a href='http://de67.die-staemme.de/game.php?village="+dorfId[1]+"&screen=snob'>Adelshof</a>";
		td1.innerHTML += "<br>";
		td1.innerHTML += "<a href='http://de67.die-staemme.de/game.php?village="+dorfId[1]+"&screen=place'>Versammlungsplatz</a>";
		td1.innerHTML += "<br>";
		td1.innerHTML += "<br>";
		td1.innerHTML += "<a href='http://de67.die-staemme.de/game.php?village="+dorfId[1]+"&place&mode=sim'>Simulator</a>";
		td1.innerHTML += "<br>";
		td1.innerHTML += "<a href='http://de67.die-staemme.de/game.php?village="+dorfId[1]+"&screen=place&mode=units'>Truppen</a>";
		td1.innerHTML += "<br>";
		
		
		document.body.appendChild( outerBorder );
		
		outerBorder.appendChild( innerBorder );
		outerBorder.appendChild( table );
		table.appendChild( tbody );
		tbody.appendChild( tr1 );
		tbody.appendChild( tr2 );
		tr1.appendChild( th1 );
		tr2.appendChild( td1 );