// ==UserScript==
// @name           Neopets Cheat Cheat
// @namespace      Neopets
// @include        http://www.neopets.com/games/cheat/cheat.phtml
// ==/UserScript==
var dropdown = "";
dropdown = '	<OPTION VALUE="">Select Card Value</OPTION><OPTION VALUE="1">Ace</OPTION><OPTION VALUE="2">2</OPTION><OPTION VALUE="3">3</OPTION><OPTION VALUE="4">4</OPTION><OPTION VALUE="5">5</OPTION><OPTION VALUE="6">6</OPTION><OPTION VALUE="7">7</OPTION><OPTION VALUE="8">8</OPTION><OPTION VALUE="9">9</OPTION><OPTION VALUE="10">10</OPTION><OPTION VALUE="11">Jack</OPTION><OPTION VALUE="12">Queen</OPTION><OPTION VALUE="13">King</OPTION>';
document.forms[1].elements[5].innerHTML = dropdown;