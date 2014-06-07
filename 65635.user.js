scr_meta=<><![CDATA[
// ==UserScript==
// @name           Skróty - MetalDamage
// @version        v0.1
// @namespace      http://userscripts.org/users/103378
// @include        http://s*.metaldamage.*/game/uebersicht.php*
// ==/UserScript==
]]></>.toString();

function skroty() {
	if ( bitelink = document.getElementById('bitelink') ) {
		bitelink.innerHTML = bitelink.innerHTML + '</p></div><div id="bitelink" style="clear:both;"><form action="robbery.php" method="POST"><h2>Skróty w grze (by peterek)</h2><p class="tdnp">&nbsp;</p><p>Wyszukanie do ataku:<br /> <select name="ujo" size="1" class="input"><option value="1">Normalne</option><option value="2">Wyszukaj silniejszego lub rownego</option></select> <input type="submit" class=input value="Wyszukaj"></form>';
		bitelink.innerHTML = bitelink.innerHTML + '<br><form action="robbery.php" method="POST">Nick do ataku:<br /><input class="input" type="text" name="ujn" size="30" value="" MAXLENGTH="30"><input type="submit" class=input value="Wykonaj!"></form>';
		bitelink.innerHTML = bitelink.innerHTML + '<br><form action="robbery.php" method="POST">Trening (koszt 10$): <select name="mjz" size="1" class="input"><option value="600">10 minut</option></select><input type="submit" class=input value="Wykonaj!"></p></form>';
		bitelink.innerHTML = bitelink.innerHTML + '<br><form action="city.php" method="POST"><input type="hidden" name="typ" value="2">Praca: <select name="az" size="1" class="input"><option value="1">1 godziny</option><option value="2">2 godziny</option><option value="3">3 godziny</option><option value="4">4 godziny</option><option value="5">5 godziny</option><option value="6">6 godziny</option><option value="7">7 godziny</option><option value="8">8 godziny</option></select> <input class="input" name="dowork" value="Wykonaj!" type="submit"></p></form>';
	} else { window.setTimeout(skroty, 150); }
}
skroty();