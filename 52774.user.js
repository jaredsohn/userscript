// ==UserScript==
// @name				DSdyeBHvalues
// @namespace			none
// @description			Dieses Script färbt 100% volle Bauernhöfe rot und 90% volle Bauernhöfe orange ein
// @include			http://de*.die-staemme.de/game.php?*
// ==/UserScript==



function dye(element)
{
  var set = element.innerHTML.split("/")[0];
  var all = element.innerHTML.split("/")[1];
  var percent = parseInt(set)/parseInt(all)*100;
  
  if(percent == 100)
	element.style.color = "red";
  else if(percent >= 90)
	element.style.color = "orange";
}


var pa = (document.body.innerHTML.match(/village\.php|group|Rekrutieren/)) ? true : false;

if(pa && location.href.match(/overview_villages^|intro^/))
  if(document.getElementById("overview").value != "prod")
	return;

if(location.href.match(/overview_villages/))
{
  var tab = document.evaluate('//table[@class="main"]/tbody/tr/td/table[@class="vis"]/tbody',document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
  tab = (pa) ? tab.snapshotItem(2) : tab.snapshotItem(0);
  var rows = tab.getElementsByTagName("tr");
  
  for(var x = 0; x < rows.length; x++)
  {
	if(!rows[x].innerHTML.match(/<span id="label_\d+/))
	  continue;
	
	var cells = rows[x].getElementsByTagName("td");
	var cell = (pa) ? cells[4] : cells[cells.length-1];
	dye(cell);
  }
}


var tab = document.evaluate('//table[@class="box"]/tbody',document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
tab = (tab.snapshotItem(tab.snapshotLength-1).innerHTML.match(/graphic\/unit\/att\.png/)) ? tab.snapshotItem(tab.snapshotLength-2) : tab.snapshotItem(tab.snapshotLength-1);
var cell = tab.getElementsByTagName("td")[1];
dye(cell);