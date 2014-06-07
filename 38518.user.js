// ==UserScript==
// @name				DSeditVillageNames
// @namespace			Heinzel
// @description			Ändert sämtliche Dorfnamen eines Accounts um
// @include			http://de*.die-staemme.de/game.php?*mode=combined*
// ==/UserScript==


/* Abfragen, wie die Dorfnamen sein sollen */
var name = window.prompt("Wie wollen Sie ihre Dörfer nennen? \n Fürs durchzählen verwenden Sie den Platzhalter \"@num@\".\nFür Koordinaten benutzen Sie den Platzhalter \"@koords@\".\nFür den Kontinent benutzen Sie den Platzhalter \"@konti@\".", "");

if(!name)
  return;

/* Die Stelle in der DOM-Struktur ermitteln */
var tab = document.evaluate('//table[@class="main"]/tbody/tr/td/table[@class="vis"]/tbody', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(2);
var trs = tab.getElementsByTagName("tr");
var count = 1;

for(var x = 0; x < trs.length; x++)
{
  if(!trs[x].innerHTML.match(/overview\/.+?\.png/))
	continue;
  
  /* die aktuellen Koordinaten auslesen */
  try {
	var koords = trs[x].getElementsByTagName("span")[1].innerHTML.split("(")[1].split(")")[0];
  } catch(e) {
	continue;
  }
  
  /* den aktuellen Konti auslesen */
  var konti = "K" + koords.split("|")[1][0] + koords[0];
  
  /* die aktuelle DorfID auslesen */
  var ID = trs[x].getElementsByTagName("span")[0].id.split("_")[1];
  
  /* den Wert für Durchnummerierung formatieren */
  count = count.toString();
  switch(count.length)
  {
	case (1):
	  var str = "00" +  count;
	  break;
	case (2):
	  var str = "0" +  count;
	  break;
	default:
	  var str = count;
  }
  count++;
  
  /* Die Platzhalter ersetzen */
  var repName = name.replace(/\@koords\@/, koords);
  repName = repName.replace(/\@num\@/, str);
  repName = repName.replace(/\@konti@/, konti);
  
  /* Den ermittelten Dorfnamen einsetzen und die display-Attribute verändern */
  trs[x].getElementsByTagName("input")[0].value = repName;
  document.getElementById("label_" + ID).style.display = "none";
  document.getElementById("edit_" + ID).style.display = "inline";
}