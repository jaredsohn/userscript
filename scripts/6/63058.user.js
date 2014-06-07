// Gangsters
// version 0.1
// 2009-29-11
// Copyright (c) 2009, Godstain
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
//
// ==UserScript==
// @name            Gangsters p&p
// @description     Gangsters p&p bot
// @include         http://*.gangsters.pl*
// ==/UserScript==

(function() {


setTimeout("document.wygraj.submit()",500);
var walcz = document.createElement("div"); 
walcz.innerHTML = '<form action="http://www.gangsters.pl/index.php?id=45"><input id="sub" type="submit" /><input type="hidden" name="ks" value="1" /></form>';

if (find in source: "Ta walka jest ustawiona, nie atakuj przeciwnika! Jeżeli będziesz w niej uczestniczył zostaniesz ukarany przez Związek Zapaśniczy!") { 

var anuluj = document.createElement("div"); 
anuluj.innerHTML = '<form action="http://www.gangsters.pl/php/ks_ring.php"><input id="sub" type="submit" value="Anuluj walkę!" /><input /></form>'; 
} 

else { 

walcz.innerHTML = '<form action="http://www.gangsters.pl/index.php?id=45"><input id="sub" type="submit" /><input type="hidden" name="ks" value="1" /></form>'; 

setTimeout("document.wygraj.submit()",10000);

var wygraj = document.createElement("div"); 
wygraj.innerHTML = '<form action="http://www.gangsters.pl/php/ks_ring.php"><input id="_blokada" type="hidden" value="true" /><input type="hidden" name="y" value="100" /></form>';


}



});