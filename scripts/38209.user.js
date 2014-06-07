// ==UserScript==
// @name			ESaddTW+Link
// @author			Heinzel
// @namespace		none
// @include		http://*.tribalwars.es/game.php*screen=info_player&id=*
// @include		http://*.tribalwars.es/game.php*screen=info_ally&id=*
// ==/UserScript==


function addLink(linkText,linkTarget)
{
  var tab = document.evaluate('//table[@class="main"]/tbody/tr/td/table/tbody/tr/td/table[@class="vis"]/tbody',document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0);
  var cell = document.createElement("tr");
  var row = document.createElement("td");
  var link = document.createElement("a");
  
  link.innerHTML = "&raquo; " + linkText;
  link.href = linkTarget;
  link.target = "_blank";
  row.setAttribute("colspan", "2");
  
  row.appendChild(link);
  cell.appendChild(row);
  
  tab.insertBefore(cell, tab.lastChild.previousSibling.previousSibling);
}

(function main()
{
  var world = location.href.match(/s(\d+)\./)[1];
  var kind = location.href.match(/info_(.+?)&/)[1];
  var ID = location.href.split("id=")[1];
  var text = (kind == "player") ? "Ley de jugadores" : "Ley tribales";
  
  addLink(text, "http://es" + world + ".twplus.org/file/" + kind + "/" + ID + "/");
})();