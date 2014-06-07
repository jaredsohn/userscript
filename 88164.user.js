// ==UserScript==
// @name           Ilość defów
// @namespace      http://aturime.ncse.pl
// @description    Podliczanie ilość zagród defa w wiosce
// @include        http://pl*.plemiona.pl/game.php?village=*&screen=overview*
// ==/UserScript==

var tables = document.getElementsByTagName('table');
for (var i = 0; i< tables.length; i++) {
	var ths = tables[i].getElementsByTagName('th');
	if (ths.length > 0 && ths[0].textContent == "Jednostki"){
		var rows = tables[i].getElementsByTagName('tr');
		var spaceSum = 0;
		for (var j = 1; j < rows.length; j++) {
			var tokens = rows[j].textContent.replace(/^\s\s*/, '').split(" ",2);
			if (tokens[1] == "Pikinierów" || tokens[1] == "Mieczników" || tokens[1] == "Łuczników") {
				spaceSum += parseInt(tokens[0]);
			} else if (tokens[1] == "Ciężkich") {
				spaceSum += parseInt(tokens[0]) * 6;
			}
		}
		var squads = Math.floor(spaceSum / 10000);
		squads = squads / 2;
		ths[0].innerHTML += " (" + squads + " zagród)";
	}

}