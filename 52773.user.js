// ==UserScript==
// @name				DSDropDownGroupList
// @author				
// @description			Dieses Script Ãndert lediglich in den Übersichten die Links zur Gruppenauswahl in ein einziges DropDown-Auswahlfeld, in dem man jetzt die Gruppe wählen kann.
// @namespace			none
// @include			http://de*.die-staemme.de/game.php?*screen=overview_villages*
// ==/UserScript==




/* Gruppen auslesen */
function getGroups(cell)
{
  var groups = [cell.getElementsByTagName("strong")[0].innerHTML.replace(/^\s+|\s+$|&gt;|&lt;/g, "") + ":" + document.body.innerHTML.match(/javascript:popup_scroll\('villages.php\?.+?group_id=(\d+)/)[1]];
  var links = cell.getElementsByTagName("a");
  
  for(var x = 0; x < links.length; x++)
	groups.push(links[x].innerHTML.replace(/^\s+|\s+$|\[|\]/g, "") + ":" + links[x].href.match(/group=(\d+)/)[1]);
  
  return groups;
}

/* Die DropDown-Auswahlliste fÃ¼r die Gruppen erstellen */
function createDropDown(cell, groups)
{
  /* Die Gruppenlinks lÃ¶schen */
  cell.innerHTML = "";
  
  /* Das AuswahlgerÃ¼st erstellen */
  var dropdown = document.createElement("select");
  dropdown.id = "dropdown";
  dropdown.addEventListener('change', selectGroup, false);
  cell.appendChild(dropdown);
  
  /* Die einzelnen Auswahlfelder erstellen */
  for(var x = 0; x < groups.length; x++)
  {
	var field = document.createElement("option");
	field.innerHTML = groups[x].split(":")[0];
	field.value = groups[x].split(":")[1];
	dropdown.appendChild(field);
  }
}

/* Leitet in die ausgewÃ¤hlte Gruppe weiter */
function selectGroup()
{
  var id = this.options[this.selectedIndex].value;
  location.href = location.href + "&group=" + id;
}

(function main()
{
  /* Stelle der Gruppen ermitteln */
  var cell = document.evaluate('//table[@class="main"]/tbody/tr/td/table[@class="vis"][2]/tbody/tr/td[2]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
  var groups = getGroups(cell);
  createDropDown(cell, groups);
})();