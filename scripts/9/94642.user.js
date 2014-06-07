// ==UserScript==
// @name				سيكربت يقوم بإظهار مجموع الجيوش في القرية من تعريب أخوكم محمد احمد 20
// @author				Heinzel
// @description				يقوم بحساب مجموع القوات في القرية ..
// @namespace			none
// @include			http://*.tribalwars.*/game.php?*screen=overview_villages*
// ==/UserScript==



(function main()
{
  /* Überprüfen ob man sich in der richten Übersicht befindet */
  try {
	if(document.getElementById("overview").value != "units")
	  return;
	
	if(location.href.match(/own_home|there|away|mowing|support_detail|away_detail/))
	  return; 
  } catch(e) {
	return;
  }
  
  /* die Zellen für den Dorfnamen ermitteln */
  var cells = document.evaluate('//span[starts-with(@id, "label_") and not(starts-with(@id, "label_text"))]/parent::*', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
  
  /* die Spalten für die im Dorf-, auswärts- und unterwegs befindlichen Truppen ermitteln */
  var home_rows = document.evaluate('//tr[@class="units_home"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
  var away_rows = document.evaluate('//tr[@class="units_away"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
  var mowing_rows = document.evaluate('//tr[@class="units_moving"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
  
  /* Für jedes Dorf durchlaufen */
  for(var x = 0; x < home_rows.snapshotLength; x++)
  {
    /* für die Zellen mit dem Dorfnamen den 'rowspan'-Wert um 1 erhöhen */
    var cell = cells.snapshotItem(x);
	cell.rowSpan = parseInt(cell.rowSpan, 10)+1;
	
	/* die einzelnen Zellen für die im Dorf- auswärts- und unterwegs befindlichen Truppen ermitteln */
	var home_cells = home_rows.snapshotItem(x).getElementsByTagName("td");
	var away_cells = away_rows.snapshotItem(x).getElementsByTagName("td");
	var mowing_cells = mowing_rows.snapshotItem(x).getElementsByTagName("td");
	var units = [];
	
	/* Die zellen durchlaufen und die verschiedenen Einheitentypen zusammenrechnen */
	for(var i = 1; i < home_cells.length-1; i++)
	  units.push(parseInt(home_cells[i].innerHTML, 10)+parseInt(away_cells[i].innerHTML, 10)+parseInt(mowing_cells[i].innerHTML, 10));
	
	/* Eine neue Spalte erstellen und einfügen */
	var row = document.createElement("tr");
	row.className = "units_whole";
	row.setAttribute("name", "units_whole");
	mowing_rows.snapshotItem(x).parentNode.insertBefore(row, mowing_rows.snapshotItem(x).nextSibling);
	
	/* Eine Zelle mit der Beschriftung für die Spalte erstellen */
	var cell = document.createElement("td");
	cell.innerHTML = "<p><font size=5 face=Times color=red>مجموع القوات.</font></p>";
	row.appendChild(cell);
	
	/* Für jeden Einheitentyp eine eigene Spalte erzeugen und einsetzen */
	for(var i = 0; i < units.length; i++)
	{
	  var cell = document.createElement("td");
	  cell.innerHTML = units[i];
	  cell.className = (units[i] == 0) ? "hidden" : "";
	  row.appendChild(cell);
	}
	
	/* Eine Zelle mit dem Link "Befehle" erzeugen und einsetzen */
	var cell = document.createElement("td");
	row.appendChild(cell);
	
	var link = document.createElement("a");
	link.href = location.href.split("screen=")[0] + "screen=place";
	link.innerHTML = "إعطاء الأوامر ..";
	cell.appendChild(link);
  }
})();