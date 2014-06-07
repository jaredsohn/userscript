// ==UserScript==
// @name           Licznik ataków na wioskę
// @namespace      http://plemiona.pl
// @description    brak
// @include        http://pl*.plemiona.pl/*screen=info_village*
// ==/UserScript==

var ths = document.getElementsByTagName('th');

var table;
for (var i = 0; i < ths.length; i++)
{
	if (ths[i].textContent == "Twoje wojska" || ths[i].textContent == "Wojska przybywające") table = ths[i].parentNode.parentNode;
}

var rows = table.getElementsByTagName('tr');
var attCounter = 0;
var supCounter = 0;


for (var i = 1; i < rows.length; i++) {
	if (rows[i].getElementsByTagName('img')[0].src.match(/attack.png/)) attCounter++;
	else if  (rows[i].getElementsByTagName('img')[0].src.match(/support.png/)) supCounter++;
}

rows[0].getElementsByTagName('th')[0].innerHTML += "&nbsp&nbsp("+attCounter+"&nbsp<img src='/graphic/command/attack.png?1'/>, "+supCounter + "&nbsp<img src='/graphic/command/support.png?1'/>)";
						