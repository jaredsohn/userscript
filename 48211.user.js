// ==UserScript==
// @name           (nietestowany i niezmieniony)Pfandrechner by NewMan V5
// @namespace      http://ego-shooters.foren-city.de/
// @description    Berechnung des Flaschenpfands zum aktuellen Kurs.
// @include        http://pennergame.de/stock/bottle/
// @include        http://www.pennergame.de/stock/bottle/
// @include        http://pennergame.de/stock/bottle/sell/
// @include        http://www.pennergame.de/stock/bottle/sell/

// ==/UserScript==

window.setTimeout("location.reload()", 30000);
var maximal = parseInt(document.getElementById("max").value);
//var anzahl = document.getElementById('menge_verkauf').value;				
//var my_kurs = document.getElementById('pfandflaschen_kurs_ajax').innerHTML;
var my_kurs_x = document.getElementById('wirkung').innerHTML.split('0,');
var my_kurs_2 = my_kurs_x[1].substr(0, 2)/100;

var jetzt = new Date();
var Stunde = jetzt.getHours();
var StundeA = ((Stunde < 10) ? "0" + Stunde : Stunde);

var Minuten = jetzt.getMinutes();
var MinutenA = ((Minuten < 10) ? "0" + Minuten : Minuten);

var Sek = jetzt.getSeconds();
var SekA = ((Sek < 10) ? "0" + Sek : Sek);

var Jahr = jetzt.getFullYear();

var Tag = jetzt.getDate();
var TagA = ((Tag < 10) ? "0" + Tag : Tag);

var Jahresmonat = jetzt.getMonth();
var Monat = (Number (Jahresmonat) + Number (1))
var MonatA = ((Monat < 10) ? "0" + Monat : Monat);

if (Number (my_kurs_2) >= Number (17))
{
	alert ("Guter Kurs! Um "+ StundeA +":"+ MinutenA +":"+ SekA +" Uhr mit "+ my_kurs_2 +" Cent.")
}

var table = document.getElementsByClassName('listshop')[0].getElementsByTagName('table')[0];
var tbody = table.getElementsByTagName('tbody')[0];
var tr = tbody.getElementsByTagName('tr');
var table_2 = document.getElementById('infoscreen').getElementsByTagName('ul')[0];
var cash = table_2.getElementsByTagName('li')[1].innerHTML;
cash = cash.split(unescape("%u20AC"));
cash = cash[1].replace(/\./g, "");
cash = cash.replace(/,/, ".");



var newtr = new Array();
for (x = 0; x <= 6; x++){
		newtr[x] = document.createElement('tr');
		tbody.appendChild(newtr[x]);
	}

document.getElementById('menge_verkauf').setAttribute('onkeyup', 'document.getElementById("summe").value = Math.round(document.getElementById("menge_verkauf").value * ' + my_kurs_2 +'*100)/100 ; document.getElementById("all").value = Math.round((document.getElementById("menge_verkauf").value * ' + my_kurs_2 +' + '+ cash +')*100)/100; if(document.getElementById(\'all\').value.length > 6){document.getElementById(\'all\').size++;document.getElementById(\'summe\').size++;document.getElementById(\'menge_verkauf\').size++;};' );
table.getElementsByTagName('input')[3].setAttribute('onclick', 'max_flaschen();document.getElementById("summe").value = Math.round(document.getElementById("menge_verkauf").value * ' + my_kurs_2 +'*100)/100 ; document.getElementById("all").value = Math.round((document.getElementById("menge_verkauf").value * ' + my_kurs_2 +' + '+ cash +')*100)/100; if(document.getElementById(\'all\').value.length > 6){document.getElementById(\'all\').size = document.getElementById(\'all\').value.length - document.getElementById(\'menge_verkauf\').size;document.getElementById(\'summe\').size = document.getElementById(\'all\').value.length - document.getElementById(\'menge_verkauf\').size;document.getElementById(\'menge_verkauf\').size = document.getElementById(\'all\').value.length - document.getElementById(\'menge_verkauf\').size;};');

tr[1].innerHTML = '<td><img src="http://media.pennergame.de/img/cash.png" alt="summe"></td><td>Gew&uuml;nschter Betrag</td><td><input id="summe" type="text" size="3" name="summe" value="' + my_kurs_2 + '" onKeyup="document.getElementById(\'menge_verkauf\').value = Math.ceil(document.getElementById(\'summe\').value / ' + my_kurs_2 + '); document.getElementById(\'all\').value = Math.round((Number(document.getElementById(\'summe\').value) + '+ cash +')*100)/100; if(document.getElementById(\'all\').value.length > 6){document.getElementById(\'all\').size++;document.getElementById(\'summe\').size++;document.getElementById(\'menge_verkauf\').size++;};"/>&nbsp;&euro;</td>';


tr[2].innerHTML = '<td><img src="http://media.pennergame.de/img/cash.png" alt="summe2"></td><td>Gew&uuml;nschter Gesamtbetrag</td><td><input id="all" type="text" size="3" name="all" value="' + (Math.round((Number(cash) + Number(my_kurs_2))*100)/100) + '" onKeyup="document.getElementById(\'menge_verkauf\').value = Math.ceil((document.getElementById(\'all\').value - '+ cash +') / ' + my_kurs_2 + '); document.getElementById(\'summe\').value = Math.round((document.getElementById(\'all\').value - '+ cash +')*100)/100; if(document.getElementById(\'all\').value.length > 6){document.getElementById(\'all\').size++;document.getElementById(\'summe\').size++;document.getElementById(\'menge_verkauf\').size++;};"/>&nbsp;&euro;</td>';

tr[3].innerHTML = '<td colspan="3">Maximale Ausbeute bei einem bestimmten Kurs:</td>';
tr[4].innerHTML = '<td colspan="3">Beim aktuellen Kurs von '+ my_kurs_2*100 +' Cent = '+ Math.round(maximal*my_kurs_2*100)/100 +' &euro;</td>';
tr[5].innerHTML = '<td colspan="3">Bei 16 Cent =  '+ Math.round(maximal*16)/100 +' &euro;</td>';
tr[6].innerHTML = '<td colspan="3">Bei 17 Cent =  '+ Math.round(maximal*17)/100 +' &euro;</td>';
tr[7].innerHTML = '<td colspan="3">Bei 18 Cent =  '+ Math.round(maximal*18)/100 +' &euro;</td>';



//Copyright by NewMan im Pennergame unter NewMan01 zu finden