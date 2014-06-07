// ==UserScript==
// @name	        الوحدات الناجية
// @namespace		none
// @author		Heinzel
// @description		Geeft een nieuwe kolom weer in een bericht, met de overlevende troepen
// @include		http://ae*.tribalwars.ae/game.php*view=*screen=report*
// ==/UserScript==
/* Updated 19-08-2013 by Tuam for TW version 8.14*/
/* get the right tables */
var tabs = document.getElementsByTagName("table");
var tables = [];
for(var x = 0; x < tabs.length; x++)
{
  if(tabs[x].innerHTML.match(/الكمية:/) && !tabs[x].getElementsByTagName("table")[0])
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
	newTd.setAttribute('style','text-align:center');
  newTr.innerHTML = "";
  newTd.innerHTML = "الناجين:";
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
  
  tables[x].getElementsByTagName('tbody')[0].appendChild(newTr);
}