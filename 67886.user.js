// ==UserScript==
// @name           Przyciski Wodka & Hot-Dog & Mycie
// @description    Dodaje przycisk do upijania menela odpowiednią ilością wódek, przycisk do zbijania promili Hot-Dogami, a także przycisk do mycia. 
// @version        1.2
// @author         mikskape
// @include        http://*menelgame.pl*
// @exclude        http://*.menelgame.pl/highscore/*
// ==/UserScript==

var s_wersja = '1.2';
var s_info = 'http://userscripts.org/scripts/show/67886';
var s_url = 'http://userscripts.org/scripts/source/67886.user.js';

GM_xmlhttpRequest(
{
	method: 'GET',
	url: s_info,
	onload: function(responseDetails) {
		var content = responseDetails.responseText;
		var wersja = content.split('##[')[1].split(']##')[0];
		if (wersja != s_wersja) {
		alert('Za chwilę zostanie pobrana nowa wersja skryptu "Przyciski Wódka & Hot-Dog & Mycie". \nProszę potwierdzić instalację.')
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
addGlobalStyle('div#przyc42 {position:absolute; top:234px; right:92px; margin-left:0px; width:200px;}')
addGlobalStyle('.inhalt_przyc42 {padding-top:0px; padding-bottom:0px; padding-left:0%; background-color:transparent; ; font-weight:bold; color:black; font-size:15px; text-align:left; } ')

/*
Dalsza część skryptu zawiera śladowe ilośi pożyczone ze skryptu "Przyciski Piwo&Haburger" by Agent_0700
*/
Pos = document.getElementsByTagName("li")[6].getElementsByClassName("ttip")[0].innerHTML.indexOf(".");
Alk = document.getElementsByTagName("li")[6].getElementsByClassName("ttip")[0].innerHTML.substr(Pos - 1, 4).replace(".", "").replace(/\D/g, "");
Benoetigtprozent = 350 - Alk;
Benoetigtwodka = Math.floor(Benoetigtprozent/250);
Benoetigtwurst = Math.ceil(Alk/100);
var tbody = document.createElement('div');
document.body.appendChild(tbody);
tbody.innerHTML = ''
+'<div id=\"przyc42\"><div class=\"inhalt_przyc42\">'
+'</form><form style="display:inline;" method="post" action="/stock/foodstuffs/use/"><input type="hidden" name="item" value="Wodka"><input id="Wodka" type="hidden" value="2.50" /><input type="hidden" name="promille" value="250" /><input type="hidden" name="id" value="7" /><input type="hidden" id="lager_Wodka" value="987" /><input id="menge_Wodka" type="hidden" size="2" name="menge" value="' + Benoetigtwodka + '"/><input id="drink_Wodka" type="submit" value="Wódka(' + Benoetigtwodka + ')"/></form><form style="display:inline;" method="post" action="/stock/foodstuffs/use/"><input type="hidden" value="Currywurst" name="item"><input id="Currywurst" type="hidden" value="-1.00" /><input type="hidden" value="-100" name="promille"><input type="hidden" name="id" value="3" /><input type="hidden" id="lager_Currywurst" value="50" /><input id="menge_Currywurst" type="hidden" size="2" name="menge" value="' + Benoetigtwurst + '" /><input id="drink_Currywurst" type="submit" value="Hot-Dog(' + Benoetigtwurst + ')"/></form></form><form style="display: inline;" method="post" action="/city/washhouse/buy/"><input type="hidden" value="2" name="id"><input type="submit" class="formbutton" name="submitForm" value="Mycie"></form>';
}