
// ==UserScript==
// @name           Format Player Vills into Table
// @author         Bassem
// @namespace      TW
// @description    Gives you many option to format the player vills into a table
// @include        http://ae*.tribalwars.ae/game.php?*&screen=info_player*
// @include        http://us*.tribalwars.us/game.php?*&screen=info_player*
// @version        1.0
// ==/UserScript==


javascript:
function trim(str) {
	return str.replace(/^\s+|\s+$/g, "");
}

if ( typeof (claim) == "undefined")
	var claim = 1;

if (game_data.screen != 'info_player')
	location.search = '?village=' + game_data.village.id + '&screen=info_player&id=' + game_data.player.id;
var body = document.getElementById("content_value");
var table = body.getElementsByTagName('table')[1];

var jogador = table.getElementsByTagName('th')[0];
jogador.innerHTML = '[table][**]لاعب[\|\|][player]' + trim(jogador.textContent) + '[/player][/**]';

var pontos1 = table.getElementsByTagName('td')[0];
pontos1.innerHTML = '[*]' + pontos1.innerHTML;
var pontos2 = table.getElementsByTagName('td')[1];
pontos2.innerHTML = '[\|]' + pontos2.innerHTML + '[/*]';

var clss1 = table.getElementsByTagName('td')[2];
clss1.innerHTML = '[*]' + clss1.innerHTML;
var clss2 = table.getElementsByTagName('td')[3];
clss2.innerHTML = '[\|]' + clss2.innerHTML + '[/*]';

var od1 = table.getElementsByTagName('td')[4];
od1.innerHTML = '[*]' + od1.innerHTML;
var od2 = table.getElementsByTagName('td')[5];
od2.innerHTML = '[\|]' + od2.innerHTML + '[/*]';

var tribo1 = table.getElementsByTagName('td')[6];
tribo1.innerHTML = '[*]' + tribo1.innerHTML;
var tribo2 = table.getElementsByTagName('td')[7];
tribo2.innerHTML = '[\|][ally]' + trim(tribo2.textContent) + '[/ally][/*][/table]';
aumentar = false;
if (table.getElementsByTagName('td')[8] != null) {
	table.getElementsByTagName('td')[8].parentNode.style.display = "none";
}
if (table.getElementsByTagName('td')[9] != null) {
	table.getElementsByTagName('td')[9].parentNode.style.display = "none";
}
if (table.getElementsByTagName('td')[10] != null) {
	table.getElementsByTagName('td')[10].parentNode.style.display = "none";
}
if (table.getElementsByTagName('td')[11] != null) {
	table.getElementsByTagName('td')[11].parentNode.style.display = "none";
}
if (table.getElementsByTagName('td')[12] != null) {
	table.getElementsByTagName('td')[12].parentNode.style.display = "none";
}
if (table.getElementsByTagName('td')[13] != null) {
	table.getElementsByTagName('td')[13].parentNode.style.display = "none";
}
if (table.getElementsByTagName('td')[14] != null) {
	table.getElementsByTagName('td')[14].parentNode.style.display = "none";
}
if (table.getElementsByTagName('td')[15] != null) {
	table.getElementsByTagName('td')[15].parentNode.style.display = "none";
}

table = $('#villages_list')[0];

sub = table.getElementsByTagName('th');
sub[0].innerHTML = '[table][**]N.';
sub[0].setAttribute('width', '40');
sub[1].innerHTML = '[\|\|]قرية';
sub[1].setAttribute('width', '220');
sub[2].innerHTML = '[\|\|]نقاط[/**]';

if (claim == 1)
	var codigo_bb = ["[\|][claim]", "[/claim]"];
else
	var codigo_bb = ["[\|][coord]", "[/coord]"];

sub = table.getElementsByTagName('td');
for ( j = 0; j < sub.length; j++) {
	if (sub[j].textContent.indexOf('View all other') > -1) {
		sub[j].innerHTML = '[/table]';
		aumentar = true;
	} else {
		sub[j].innerHTML = '[*]' + (j / 3 + 1);
		sub[++j].innerHTML = codigo_bb[0] + sub[j++].innerHTML + codigo_bb[1];
		sub[+j].innerHTML = '[\|]' + sub[+j].innerHTML + '[/*]';
	}
}
if (aumentar == false) {
	var endtable = document.createElement('tr');
	endtable.innerHTML = '<tr><td colspan="3">[/table]</td></tr>';
	document.getElementById("villages_list").getElementsByTagName("tbody")[0].appendChild(endtable);
}
void (0);
