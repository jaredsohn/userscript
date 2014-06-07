// ==UserScript==
// @name		Percentage overlevende troepen @berichten
// @namespace		none
// @author		Heinzel bewerkt bij Kjors
// @description		Geeft het percentage van de verliezen
// @include		http://nl*.tribalwars.nl/game.php?*screen=report*
// @include		http://nl*.tribalwars.nl/public_report/*
// ==/UserScript==


/* get the right tables */
var tabs = document.getElementsByTagName("table");
var tables = [];
for(var x = 0; x < tabs.length; x++)
{
  if(tabs[x].innerHTML.match(/Aantal:/) && !tabs[x].getElementsByTagName("table")[0])
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
  newTd.innerHTML = "%verlies: ";
  newTr.appendChild(newTd);
  
  for(var y = 1; y < len; y++)
  {
	/* calc survived Units */
	unitsWent = tables[x].getElementsByTagName("tr")[1].getElementsByTagName("td")[y].innerHTML;
	unitsLose = tables[x].getElementsByTagName("tr")[2].getElementsByTagName("td")[y].innerHTML;
	if(unitsWent == '0')
		unitsSurv = 0;
	else 
		unitsSurv = ((Math.round(parseInt(unitsLose)*100/parseInt(unitsWent) * 100) / 100) + '%');

	/* set survied Units */
	newTd = newTd.cloneNode(true);
	newTd.innerHTML = unitsSurv;
	newTd.className = (unitsSurv == 0) ? "hidden" : "";
	newTr.appendChild(newTd);
  }
  
  tables[x].appendChild(newTr);
}