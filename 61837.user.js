// ==UserScript==
// @name           Ikariam Spy Report GS Calc
// @namespace      http://userscripts.org/scripts/show/61837
// @description    Calculate the Generals Score of the units in a garrison spy report
// @include        http://s*.ikariam.*/*view=safehouseReports*
// @include        http://s*.ikariam.*/*function=executeMission*mission=6
// ==/UserScript==

String.prototype.spaces = function () {
	return this.replace(/\s/g, " ")
}


findUnit = function (root, value) {
	if (root) {
		for (var i = 0; i < root.length; i++) {
			if (root[i].Name.spaces() == value.spaces() ||
				root[i].AltName.spaces() == value.spaces()) {
				return root[i];
			}
		}
	}
	return null;
}


var Units =  [
	{Name: "Hoplite", AltName: "Hoplites", GS: 1.4},
	{Name: "Steam Giant", AltName: "Steam Giants", GS: 6.2},
	{Name: "Swordsman", AltName: "Swordsmen", GS: 1.2},
	{Name: "Spearman", AltName: "Spearmen", GS: 0.6},
	{Name: "Sulphur Carabineer", AltName: "Sulphur Carabineers", GS: 4},
	{Name: "Archer", AltName: "Archers", GS: 1.1},
	{Name: "Slinger", AltName: "Slingers", GS: 0.4},
	{Name: "Mortar", AltName: "Mortars", GS: 31},
	{Name: "Catapult", AltName: "Catapults", GS: 11.2},
	{Name: "Battering Ram", AltName: "Battering Rams", GS: 4.4},
	{Name: "Gyrocopter", AltName: "Gyrocopters", GS: 2.5},
	{Name: "Balloon-Bombardier", AltName: "Balloon-Bombardiers", GS: 5.8},
	{Name: "Doctor", AltName: "Doctors", GS: 10},
	{Name: "Cook", AltName: "Cooks", GS: 4},
	{Name: "Ram-Ship", AltName: "Ram-Ships", GS: 5.4},
	{Name: "Ballista Ship", AltName: "Ballista Ships", GS: 6.8},
	{Name: "Fire Ship", AltName: "Fire Ships", GS: 6.2},
	{Name: "Catapult Ship", AltName: "Catapult Ships", GS: 6.4},
	{Name: "Paddle-Wheel-Ram", AltName: "Paddle-Wheel-Rams", GS: 36},
	{Name: "Mortar Ship", AltName: "Mortar Ships", GS: 22.4},
	{Name: "Diving Boat", AltName: "Diving Boats", GS: 18.2}
]

if (document.getElementsByClassName("record")[0].rows[0].cells[1].textContent == "Spy out garrison") {
	var tables = document.getElementsByClassName("reportTable");
	if (tables) {
		var townGS = 0;
		for (var i = 0; i < tables.length; i++) {
			if (tables[i].parentNode.firstChild.textContent.search(/^(Troop)|(Fleet)s in/) == 0) {
				var rows = tables[i].getElementsByTagName("tr");
				var tableGS = 0;
				for (var j = 0; j < rows.length; j++) {
					if (rows[j].cells[0].textContent.search(/(Unit)|(Ship)/) == 0) {
						var th = document.createElement("th");
						th.appendChild(document.createTextNode("GS"))
						rows[j].appendChild(th);
					} else {
						var curUnit = findUnit(Units, rows[j].cells[0].textContent);
						var unitGS = 0;
						if (curUnit) {
							unitGS = rows[j].cells[1].textContent.replace(",", "") * curUnit.GS;
						}
						tableGS += unitGS;
						var cell = rows[j].insertCell(-1);
						cell.align = "right";
						cell.textContent = unitGS.toFixed(1);
					}
				}
				var totalrow = document.createElement("tr");
				var totalcell = document.createElement("td");
				totalcell.colSpan = 3;
				totalcell.align = "right";
				totalcell.textContent = tableGS.toFixed(1);
				totalrow.appendChild(totalcell);
				tables[i].appendChild(totalrow);
				townGS += tableGS;
			}
		}
		document.getElementsByClassName("report")[0].textContent = "Total GS for player in this town: " + townGS.toFixed(1);
	}
}