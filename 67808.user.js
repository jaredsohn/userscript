// ==UserScript==
// @name           Przyciski Piwo & Hamburger & Mycie
// @description    Dodaje przycisk do upijania menela odpowiednią ilością piw, przycisk do zbijania promili hamburgerami, a także przycisk do mycia.
// @version        1.2
// @author         mikskape
// @include        http://www.menelgame.pl*
// @exclude        http://*.menelgame.pl/highscore/*
// ==/UserScript==

var s_wersja = '1.2';
var s_info = 'http://userscripts.org/scripts/show/67808';
var s_url = 'http://userscripts.org/scripts/source/67808.user.js';

GM_xmlhttpRequest(
{
	method: 'GET',
	url: s_info,
	onload: function(responseDetails) {
		var content = responseDetails.responseText;
		var wersja = content.split('##[')[1].split(']##')[0];
		if (wersja != s_wersja) {
		alert('Za chwilę zostanie pobrana nowa wersja skryptu "Przyciski Piwo & Hamburger & Mycie". \nProszę potwierdzić instalację.')
		window.location.href=s_url;
		}
	}
	});



if(document.getElementById("my-profile")){
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}
addGlobalStyle('div#przyc4 {position:absolute; top:234px; right:95px; margin-left:0px; width:200px;}')
addGlobalStyle('.inhalt_przyc4 {padding-top:0px; padding-bottom:0px; padding-left:0%; background-color:transparent; ; font-weight:bold; color:black; font-size:15px; text-align:left; } ')

/*
Dalsza częsci skryptu zawiera śladowe ilości pożyczone ze skryptu "Przyciski Piwo&Haburger" by Agent_0700
*/
Pos = document.getElementsByTagName("li")[6].getElementsByClassName("ttip")[0].innerHTML.indexOf(".");
Alk = document.getElementsByTagName("li")[6].getElementsByClassName("ttip")[0].innerHTML.substr(Pos - 1, 4).replace(".", "").replace(/\D/g, "");
Benoetigtprozent = 280 - Alk;
Benoetigtwodka = Math.floor(Benoetigtprozent/35);
Benoetigtwurst = Math.ceil(Alk/200);
var tbody = document.createElement('div');
document.body.appendChild(tbody);
tbody.innerHTML = ''
+'<div id=\"przyc4\"><div class=\"inhalt_przyc4\">'
+'</form><form style="display:inline;" method="post" action="/stock/foodstuffs/use/"><input type="hidden" name="item" value="Bier"><input id="Bier" type="hidden" value="0.35" /><input type="hidden" name="promille" value="35" /><input type="hidden" name="id" value="1" /><input type="hidden" id="lager_Bier" value="121" /><input id="menge_Bier" type="hidden" size="2" name="menge" value="' + Benoetigtwodka + '"/><input id="drink_Bier" type="submit" value="Piwo(' + Benoetigtwodka + ')"/></form><form style="display:inline;" method="post" action="/stock/foodstuffs/use/"><input type="hidden" name="item" value="Banda"><input id="Banda" type="hidden" value="-2.00" /><input type="hidden" name="promille" value="-200" /><input type="hidden" name="id" value="4" /><input type="hidden" id="lager_Hamburger" value="20" /><input id="menge_Hamburger" type="hidden" size="2" name="menge" value="' + Benoetigtwurst + '" /><input id="drink_Hamburger" type="submit" value="Hamburger(' + Benoetigtwurst + ')"/></form><form style="display: inline;" method="post" action="/city/washhouse/buy/"><input type="hidden" value="2" name="id"><input type="submit" class="formbutton" name="submitForm" value="Mycie"></form>';
}