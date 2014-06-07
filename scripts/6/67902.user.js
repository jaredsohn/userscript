// ==UserScript==
// @name           Przyciski Piwo & Mycie & Płukanie
// @description    Dodaje przycisk do upijania menela odpowiednią ilością piw, przycisk do mycia, a także przycisk do płukania żołądka.
// @version        1.2
// @author         mikskape
// @include        http://*menelgame.pl*
// @exclude        http://*.menelgame.pl/highscore/*
// ==/UserScript==

var s_wersja = '1.2';
var s_info = 'http://userscripts.org/scripts/show/67902';
var s_url = 'http://userscripts.org/scripts/source/67902.user.js';

GM_xmlhttpRequest(
{
	method: 'GET',
	url: s_info,
	onload: function(responseDetails) {
		var content = responseDetails.responseText;
		var wersja = content.split('##[')[1].split(']##')[0];
		if (wersja != s_wersja) {
		alert('Za chwilę zostanie pobrana nowa wersja skryptu "Przyciski Piwo & Mycie & Płukanie". \nProszę potwierdzić instalację.')
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
addGlobalStyle('div#przyc4 {position:absolute; top:234px; right:81px; margin-left:0px; width:200px;}')
addGlobalStyle('.inhalt_przyc4 {padding-top:0px; padding-bottom:0px; padding-left:0%; background-color:transparent; ; font-weight:bold; color:black; font-size:15px; text-align:left; } ')

/*
Dalsza częsci skryptu zawiera śladowe ilości pożyczone ze skryptu "Przyciski Piwo&Haburger" by Agent_0700
*/
Pos = document.getElementsByTagName("li")[6].getElementsByClassName("ttip")[0].innerHTML.indexOf(".");
Alk = document.getElementsByTagName("li")[6].getElementsByClassName("ttip")[0].innerHTML.substr(Pos - 1, 4).replace(".", "").replace(/\D/g, "");
Benoetigtprozent = 280 - Alk;
Benoetigtwodka = Math.floor(Benoetigtprozent/35);
var tbody = document.createElement('div');
document.body.appendChild(tbody);
tbody.innerHTML = ''
+'<div id=\"przyc4\"><div class=\"inhalt_przyc4\">'
+'</form><form style="display:inline;" method="post" action="/stock/foodstuffs/use/"><input type="hidden" name="item" value="Bier"><input id="Bier" type="hidden" value="0.35" /><input type="hidden" name="promille" value="35" /><input type="hidden" name="id" value="1" /><input type="hidden" id="lager_Bier" value="121" /><input id="menge_Bier" type="hidden" size="2" name="menge" value="' + Benoetigtwodka + '"/><input id="drink_Bier" type="submit" value="Piwo(' + Benoetigtwodka + ')"/></form><form style="display: inline;" method="post" action="/city/washhouse/buy/"><input type="hidden" value="2" name="id"><input type="submit" class="formbutton" name="submitForm" value="Mycie"></form><form style="display:inline;" action="/city/medicine/help/" method="post"><input type="hidden" value="2" name="id"><input type="submit" value="Płukanie" name="submitForm" class="formbutton" id="submitForm1"></form>';
}