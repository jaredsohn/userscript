// ==UserScript==
// @name           AG-Rechner
// @namespace	   AG-Rechner
// @description	   Berechnung der momentan produzierbaren AGs
// @include        http://de60.die-staemme.de/game.php?village=*&screen=snob
// @include        http://de60.die-staemme.de/game.php?village=*&screen=snob&mode=produce
// @include        http://de60.die-staemme.de/game.php?t=*&village=*&screen=snob
// @include        http://de60.die-staemme.de/game.php?t=*&village=*&screen=snob&mode=produce
// ==/UserScript==
function calc_Ag(){
		var _tables = document.getElementById("content_value").getElementsByTagName("table");
		var _cells = _tables[_tables.length-1].getElementsByTagName("td");
		// Kosten fuer das naechste AG ermitteln
		// AGs vorhanden: [3]
		var agDa = parseInt(_cells[3].innerHTML);
		// AGs in Produktion: [5]
		var agProd = parseInt(_cells[5].innerHTML);
		// Anzahl eroberter Doerfer: [7]
		var anzErobDoerfer = parseInt(_cells[7].innerHTML);
		// Kosten fuer das naechste AG
		var _agCost;
		// Anzahl der Tabellen
		var anzTable = _tables.length;
		// Array mit den <td>-Tags in einer Tabelle
		var _cols = _tables[anzTable-4].getElementsByTagName("td");
		// Anzahl der <td>-Tags
		var anzCols = _cols.length;
		// Anzahl guenstiger AGs
		
		// 1: Wenn AGs guenstig nachgebaut werden koennen, wird der Wert aus der Tabelle genommen
		// sonst bleibt er bei 0
		// 2: Kosten fuer das naechste AG aus der Tabelle am unteren Rand entnehmen
		var _anzAgBillig = "0";
		if(anzCols > 7){
			_anzAgBillig = _cols[1].innerHTML;
			_agCost = agDa + agProd + anzErobDoerfer + 2;
		}
		else{
			_agCost = parseInt(_cols[anzCols-5].innerHTML.split(" ")[0]);		
		}
		// Anzahl der aktuell eingelagerten Rohstoffe
		//_agCost = = parseInt(_cols[anzCols-5].innerHTML.split(" ")[0]);	
		var _einlag = parseInt(_cols[anzCols-2].innerHTML.split(" ")[0]);

		var anzEinlag = 0;
		var anzMoeglAgs = 0;
		for(zaehler = 0; anzEinlag < _einlag; zaehler += 1, anzMoeglAgs += 1){
			anzEinlag += _agCost + zaehler;
		}
		anzMoeglAgs -= 1;
		// tbody ermitteln
		var _tbody = _tables[anzTable-4].getElementsByTagName("tbody")[0];
		// Tabelle erweitern
		// Neue Zeile
		var newRow = _tbody.insertRow(anzCols<8?2:3);
		// Neue Zelle 1
		var newCell1 = newRow.insertCell(0);
		newCell1.innerHTML = "Momentan produzierbar:";
		// Neue Zelle 2
		var newCell2 = newRow.insertCell(1);
		newCell2.setAttribute("align", "center");
		newCell2.innerHTML = 
			anzMoeglAgs 
			+ "("
			+ _anzAgBillig
			+ ")"
			+ " x " 
			+ '<img src="http://www.die-staemme.de/graphic/ally_rights/lead.png?1" title="Adelsgeschlecht" alt="Adelsgeschlecht">';
		var newCell3 = newRow.insertCell(2);
}
calc_Ag();