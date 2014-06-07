// ==UserScript==
// @name			DSaddStandingUnits
// @namespace		none
// @author		Heinzel
// @description		Fügt in Berichten eine zusätzliche Zeile ein, in der steht, wieviele Truppen noch im Dorf stehen
// @include		http://ch*.staemme.ch/game.php?*screen=report&mode=all&view=*
// ==/UserScript==


/* get the right tables */
var tabs = document.getElementsByTagName("table");
var tables = [];
for(var x = 0; x < tabs.length; x++)
{
  if(tabs[x].innerHTML.match(/Azau:/) && !tabs[x].getElementsByTagName("table")[0])
  {
	tables.push(tabs[x]);
  }
}

var len, clone, newTr, newTd;
var unitsWent, unitsLose, unitsSurv;
for(var x = 0; x < tables.length; x++)
{
  len = tables[x].getElementsByTagName("tr")[1].getElementsByTagName("td").length;
  newTr = tables[x].getElementsByTagName("tr")[1].cloneNode(true);
  newTd = newTr.getElementsByTagName("td")[0].cloneNode(true);
  newTr.innerHTML = "";
  newTd.innerHTML = "Lebende: ";
  newTr.appendChild(newTd);
  
  for(var y = 1; y < len; y++)
  {
	/* calc survived Units */
	unitsWent = tables[x].getElementsByTagName("tr")[1].getElementsByTagName("td")[y].innerHTML;
	unitsLose = tables[x].getElementsByTagName("tr")[2].getElementsByTagName("td")[y].innerHTML;
	unitsSurv = (parseInt(unitsWent)-parseInt(unitsLose));
	
	/* set survied Units */
	newTd = newTd.cloneNode(true);
	newTd.innerHTML = unitsSurv;
	newTd.className = (unitsSurv == 0) ? "hidden" : "";
	newTr.appendChild(newTd);
  }
  
  tables[x].appendChild(newTr);
}