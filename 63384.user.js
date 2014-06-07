// ==UserScript==
// @name Markplatz Koordinatenlink
// @description (v. 1.0) Fuegt am Markplatz einen Link zum Einfuegen der Koordinaten des letzten Rohstoffversands
// @author Simon Hilz
// @namespace http://simon.hilzweb.com/userscripts
// @include http://*.die-staemme.de/game.php?*screen=market*
// ==/UserScript==

var server = document.location.host.split('.')[0];
var form = document.getElementsByTagName("form")[0];
var inputs = form.getElementsByTagName("input");
inputs[5].addEventListener("click",function() {save_kords(inputs[3].value,inputs[4].value);return false;},true);
var a = document.createElement("a");
a.setAttribute("href","#");
a.appendChild(document.createTextNode("Letztes"));
a.addEventListener("click",function() {insert_kords();},true);
inputs[4].parentNode.parentNode.getElementsByTagName("td")[1].appendChild(a);

function save_kords(x,y)
	{
	GM_setValue(server + "_market_kords_x",x);
	GM_setValue(server + "_market_kords_y",y);
	form.submit();
	}
	
function insert_kords()
	{
	var kord_x = GM_getValue(server + "_market_kords_x","");
	var kord_y = GM_getValue(server + "_market_kords_y","");
	inputs[3].value = kord_x;
	inputs[4].value = kord_y;
	}