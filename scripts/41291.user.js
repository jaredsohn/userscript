// ==UserScript==
// @name           DSmarkFullVids
// @author		Heinzel
// @namespace      none
// @include        http://de*.die-staemme.de/game.php?*screen=overview_villages*
// ==/UserScript==



if(document.getElementById("overview").value != "units")
  return;

var XPath = document.evaluate('//tr[@class="units_there"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

for(var x = 0; x < XPath.snapshotLength; x++)
{
  var cells = XPath.snapshotItem(x).getElementsByTagName("td");
  var sum = 0;
  
  switch(cells.length-2)
  {
	case 11:
	  var count = [1,1,1,1,2,4,5,6,5,8,100];
	  break;
	case 9:
	  var count = [1,1,1,2,4,6,5,8,100];
	  break;
	default:
	  GM_log("Für diese Welt sind keine Einheitendaten vorhanden!");
	  return;
  }
  
  for(var y = 1; y < cells.length-1; y++)
	sum += cells[y].innerHTML*count[y-1];
  
  if(sum > 36000)
  {
	XPath.snapshotItem(x).style.outline = "2px solid red";
  }
}