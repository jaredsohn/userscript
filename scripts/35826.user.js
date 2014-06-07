// ==UserScript==
// @name				DSaddReadyTroups
// @namespace			none
// @author				Heinzel
// @description			Fügt im Versammlungsplatz ein, wieviele Truppen tatsächlich fertig sind
// @include			http://de*.die-staemme.de/game.php*screen=place
// @include			http://de*.die-staemme.de/game.php*screen=place&mode=command*
// ==/UserScript==


/* Hier bitte ändern, wieviele Bauernhofplätze die eigenen Gebäude verbrauchen */

var buildingsPlace = 3442;

/* Ab hier nichts mehr ändern */


/* Fügt die Einheitenzahl der bereits gebauten Truppen ein */
function setStandingUnitsCounter(units)
{
  if(!units)
	return;
  
  var tab = document.getElementById("storage").parentNode.parentNode.parentNode.parentNode.nextSibling.nextSibling.firstChild.getElementsByTagName("td")[1];
  var space = tab.innerHTML.split("/")[1];
  var full = tab.innerHTML.split("/")[0];
  
  if(space != "24000")
	return;
  
  tab.innerHTML = units + "/" + full + "/" + space;
}

/* Errechnet, wieviele Truppen bereits gebaut wurden */
function getStandingUnits()
{
  var counter = 0; 
  var fields = document.getElementsByTagName("input");
  for(var x = 0; x < fields.length; x++)
  {
    if(fields[x].name == "x")
	  break;
	
	var troups = parseInt(fields[x].nextSibling.nextSibling.innerHTML.replace(/\(|\)/g, ""));
	
	switch(fields[x].name)
	{
	  case "spear":
	  case "sword":
	  case "archer":
	  case "axe":
		var fact = 1;
		break;
	  case "spy":
		var fact = 2;
		break;
	  case "light":
		var fact = 4;
		break;
	  case "marcher":
	  case "ram":
		var fact = 5;
		break;
	  case "heavy":
		var fact = 6;
		break;
	  case "snob":
	  case "priest":
		var fact = 100;
		break;
	  case "catapult":
		var fact = 8;
		break;
	  case "knight":
		var fact = 10;
		break;
	  default:
		window.alert("Fehler bei " + fields[x].name);
	}
	
	counter += fact*troups;
  }
  
  return counter+buildingsPlace;
}

function main()
{
  setStandingUnitsCounter(getStandingUnits());
}

main();