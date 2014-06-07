// ==UserScript==
// @name           Skroty do Metaldamage
// @namespace      http://userscripts.org/users/195971
// @include        http://s*.metaldamage.*
// ==/UserScript==

function menu_skroty() {
	if ( left_menu = document.getElementById('left_menu') ) {
		left_menu.innerHTML = left_menu.innerHTML + '<br /><form action="robbery.php" method="POST"><p>Losowy:<br /> <select name="ujo" size="1" class="input"><option value="1">Normalne</option><option value="2">Silniejszy</option></select> <input type="submit" class=input value=" "></form></p><form action="robbery.php" method="POST"><p>Nick:<br /><input class="input" type="text" name="ujn" size="10" value="" MAXLENGTH="10"> <input type="submit" class=input value=" "></form></p><form action="city.php" method="POST"><input type="hidden" name="typ" value="2"><p>Praca:<br /><select name="az" size="1" class="input"><option value="1">1 godziny</option><option value="2">2 godziny</option><option value="3">3 godziny</option><option value="4">4 godziny</option><option value="5">5 godziny</option><option value="6">6 godziny</option><option value="7">7 godziny</option><option value="8">8 godziny</option></select> <input class="input" name="dowork" value=" " type="submit"></form></p><form action="robbery.php" method="POST"><p>Trening<br /><select name="mjz" size="1" class="input"><option value="600">10 minuty</option></select> <input type="submit" class=input value=" "></form></p>';
		
	} else { window.setTimeout(menu_sktoty, 500); }
}
menu_skroty();