// ==UserScript==
// @name           ticket rrechnerr by basti geandert fuer clodogame 
// @namespace      http://ego-shooters.foren-city.de/ und basti  http://pennerhack.foren-city.de
// @description    Berechnung des ticketspfanjd zum aktuellen Kurs.
// @include        http://*clodogame.fr/stock/bottle/
// @include        http://*clodogame.fr/stock/bottle/
// @include        http://*clodogame.fr/stock/bottle/sell/
// @include        http://*clodogame.fr/stock/bottle/sell/

// ==/UserScript==


var maximal = parseInt(document.getElementById("max").value);
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

if (Number (my_kurs_2)*100 >= Number (40))
{
	alert ("Guter Kurs! Um "+ StundeA +":"+ MinutenA +":"+ SekA +" Uhr mit "+ my_kurs_2*100 +" Cent.")
}

var table = document.getElementsByClassName('listshop')[0].getElementsByTagName('table')[0];
var tbody = table.getElementsByTagName('tbody')[0];
var tr = tbody.getElementsByTagName('tr');
var table_2 = document.getElementById('infoscreen').getElementsByTagName('ul')[0];
var cash = table_2.getElementsByTagName('li')[1].innerHTML;

cash = cash.split(unescape("%u20AC"));
cash = cash[0].replace(/\./g, "");
cash = cash.replace(/,/, ".");



var newtr = new Array();
for (x = 0; x <= 34; x++){
		newtr[x] = document.createElement('tr');
		tbody.appendChild(newtr[x]);
	}

document.getElementById('menge_verkauf').setAttribute('onkeyup', 'document.getElementById("summe").value = Math.round(document.getElementById("menge_verkauf").value * ' + my_kurs_2 +'*100)/100 ; document.getElementById("all").value = Math.round((document.getElementById("menge_verkauf").value * ' + my_kurs_2 +' + '+ cash +')*100)/100; if(document.getElementById(\'all\').value.length > 6 || document.getElementById(\'summe\').value.length > 6 || document.getElementById(\'menge_verkauf\').value.length > 6){document.getElementById(\'all\').size = document.getElementById(\'all\').value.length;document.getElementById(\'summe\').size = document.getElementById(\'summe\').value.length;document.getElementById(\'menge_verkauf\').size = document.getElementById(\'menge_verkauf\').value.length;}if(document.getElementById(\'all\').value >1000000){document.getElementById(\'all\').style.backgroundColor = \'#CC0000\'; document.getElementById(\'all\').value = 1000000; document.getElementById(\'summe\').value = Math.round((document.getElementById(\'all\').value - '+ cash +')*100)/100; document.getElementById(\'menge_verkauf\').value = Math.ceil(document.getElementById(\'summe\').value / ' + my_kurs_2 + ');}else{document.getElementById(\'all\').style.backgroundColor = \'\';};' );
table.getElementsByTagName('input')[3].setAttribute('onclick', 'max_flaschen();document.getElementById("summe").value = Math.round(document.getElementById("menge_verkauf").value * ' + my_kurs_2 +'*100)/100 ; document.getElementById("all").value = Math.round((document.getElementById("menge_verkauf").value * ' + my_kurs_2 +' + '+ cash +')*100)/100; if(document.getElementById(\'all\').value.length > 6 || document.getElementById(\'summe\').value.length > 6 || document.getElementById(\'menge_verkauf\').value.length > 6){document.getElementById(\'all\').size = document.getElementById(\'all\').value.length;document.getElementById(\'summe\').size = document.getElementById(\'summe\').value.length;document.getElementById(\'menge_verkauf\').size = document.getElementById(\'menge_verkauf\').value.length;}if(document.getElementById(\'all\').value >1000000){document.getElementById(\'all\').style.backgroundColor = \'#CC0000\'; document.getElementById(\'all\').value = 1000000; document.getElementById(\'summe\').value = Math.round((document.getElementById(\'all\').value - '+ cash +')*100)/100; document.getElementById(\'menge_verkauf\').value = Math.ceil(document.getElementById(\'summe\').value / ' + my_kurs_2 + ');}else{document.getElementById(\'all\').style.backgroundColor = \'\';};' );

tr[1].innerHTML = '<td><img src="http://media.clodogame.fr/img/cash.png" alt="summe"></td><td>Gew&uuml;nschter Betrag</td><td><input id="summe" type="text" size="3" name="summe" value="' + my_kurs_2 + '" onKeyup="document.getElementById(\'menge_verkauf\').value = Math.ceil(document.getElementById(\'summe\').value / ' + my_kurs_2 + '); document.getElementById(\'all\').value = Math.round((Number(document.getElementById(\'summe\').value) + '+ cash +')*100)/100; if(document.getElementById(\'all\').value.length > 6 || document.getElementById(\'summe\').value.length > 6 || document.getElementById(\'menge_verkauf\').value.length > 6){document.getElementById(\'all\').size = document.getElementById(\'all\').value.length;document.getElementById(\'summe\').size = document.getElementById(\'summe\').value.length;document.getElementById(\'menge_verkauf\').size = document.getElementById(\'menge_verkauf\').value.length;}; if(document.getElementById(\'all\').value >1000000){document.getElementById(\'all\').style.backgroundColor = \'#CC0000\'; document.getElementById(\'all\').value = 1000000; document.getElementById(\'summe\').value = Math.round((document.getElementById(\'all\').value - '+ cash +')*100)/100; document.getElementById(\'menge_verkauf\').value = Math.ceil(document.getElementById(\'summe\').value / ' + my_kurs_2 + ');}else{document.getElementById(\'all\').style.backgroundColor = \'\';};"/>&nbsp;&euro;</td>';


tr[2].innerHTML = '<td><img src="http://media.clodogame.fr/img/cash.png" alt="summe2"></td><td>Gew&uuml;nschter Gesamtbetrag</td><td><input id="all" type="text" size="3" name="all" value="' + (Math.round((Number(cash) + Number(my_kurs_2))*100)/100) + '" onKeyup="document.getElementById(\'menge_verkauf\').value = Math.ceil((document.getElementById(\'all\').value - '+ cash +') / ' + my_kurs_2 + '); document.getElementById(\'summe\').value = Math.round((document.getElementById(\'all\').value - '+ cash +')*100)/100; if(document.getElementById(\'all\').value.length > 6 || document.getElementById(\'summe\').value.length > 6 || document.getElementById(\'menge_verkauf\').value.length > 6){document.getElementById(\'all\').size = document.getElementById(\'all\').value.length;document.getElementById(\'summe\').size = document.getElementById(\'summe\').value.length;document.getElementById(\'menge_verkauf\').size = document.getElementById(\'menge_verkauf\').value.length;}if(document.getElementById(\'all\').value >1000000){document.getElementById(\'all\').style.backgroundColor = \'#CC0000\'; document.getElementById(\'all\').value = 1000000;document.getElementById(\'summe\').value = Math.round((document.getElementById(\'all\').value - '+ cash +')*100)/100; document.getElementById(\'menge_verkauf\').value = Math.ceil(document.getElementById(\'summe\').value / ' + my_kurs_2 + ');}else{document.getElementById(\'all\').style.backgroundColor = \'\';};"/>&nbsp;&euro;</td>';

if(document.getElementById('all').value.length > 6){
	document.getElementById('all').size = document.getElementById('all').value.length;
}

tr[3].innerHTML = '<td colspan="3">Maximale Ausbeute bei einem bestimmten Kurs:</td>';
tr[4].innerHTML = '<td colspan="3">Beim aktuellen Kurs von '+ my_kurs_2*100 +' Cent = '+ Math.round(maximal*my_kurs_2*100)/100 +' &euro;</td>';
tr[5].innerHTML = '<td colspan="3">Bei 15 Cent =  '+ Math.round(maximal*15)/100 +' &euro;</td>';
tr[6].innerHTML = '<td colspan="3">Bei 16 Cent =  '+ Math.round(maximal*16)/100 +' &euro;</td>';
tr[7].innerHTML = '<td colspan="3">Bei 17 Cent =  '+ Math.round(maximal*17)/100 +' &euro;</td>';
tr[8].innerHTML = '<td colspan="3">Bei 18 Cent =  '+ Math.round(maximal*18)/100 +' &euro;</td>';
tr[9].innerHTML = '<td colspan="3">Bei 19 Cent =  '+ Math.round(maximal*19)/100 +' &euro;</td>';
tr[10].innerHTML = '<td colspan="3">Bei 20 Cent =  '+ Math.round(maximal*20)/100 +' &euro;</td>';
tr[11].innerHTML = '<td colspan="3">Bei 21 Cent =  '+ Math.round(maximal*21)/100 +' &euro;</td>';
tr[12].innerHTML = '<td colspan="3">Bei 22 Cent =  '+ Math.round(maximal*22)/100 +' &euro;</td>';
tr[13].innerHTML = '<td colspan="3">Bei 23 Cent =  '+ Math.round(maximal*23)/100 +' &euro;</td>';
tr[14].innerHTML = '<td colspan="3">Bei 24 Cent =  '+ Math.round(maximal*24)/100 +' &euro;</td>';
tr[15].innerHTML = '<td colspan="3">Bei 25 Cent =  '+ Math.round(maximal*25)/100 +' &euro;</td>';
tr[16].innerHTML = '<td colspan="3">Bei 26 Cent =  '+ Math.round(maximal*16)/100 +' &euro;</td>';
tr[17].innerHTML = '<td colspan="3">Bei 27 Cent =  '+ Math.round(maximal*27)/100 +' &euro;</td>';
tr[18].innerHTML = '<td colspan="3">Bei 28 Cent =  '+ Math.round(maximal*28)/100 +' &euro;</td>';
tr[19].innerHTML = '<td colspan="3">Bei 29 Cent =  '+ Math.round(maximal*29)/100 +' &euro;</td>';
tr[20].innerHTML = '<td colspan="3">Bei 30 Cent =  '+ Math.round(maximal*30)/100 +' &euro;</td>';
tr[21].innerHTML = '<td colspan="3">Bei 31 Cent =  '+ Math.round(maximal*31)/100 +' &euro;</td>';
tr[22].innerHTML = '<td colspan="3">Bei 32 Cent =  '+ Math.round(maximal*32)/100 +' &euro;</td>';
tr[23].innerHTML = '<td colspan="3">Bei 33 Cent =  '+ Math.round(maximal*33)/100 +' &euro;</td>';
tr[24].innerHTML = '<td colspan="3">Bei 34 Cent =  '+ Math.round(maximal*34)/100 +' &euro;</td>';
tr[25].innerHTML = '<td colspan="3">Bei 35 Cent =  '+ Math.round(maximal*35)/100 +' &euro;</td>';
tr[26].innerHTML = '<td colspan="3">Bei 36 Cent =  '+ Math.round(maximal*36)/100 +' &euro;</td>';
tr[27].innerHTML = '<td colspan="3">Bei 37 Cent =  '+ Math.round(maximal*37)/100 +' &euro;</td>';
tr[28].innerHTML = '<td colspan="3">Bei 38 Cent =  '+ Math.round(maximal*38)/100 +' &euro;</td>';
tr[29].innerHTML = '<td colspan="3">Bei 39 Cent =  '+ Math.round(maximal*39)/100 +' &euro;</td>';
tr[30].innerHTML = '<td colspan="3">Bei 40 Cent =  '+ Math.round(maximal*40)/100 +' &euro;</td>';
tr[31].innerHTML = '<td colspan="3">Bei 41 Cent =  '+ Math.round(maximal*41)/100 +' &euro;</td>';
tr[32].innerHTML = '<td colspan="3">Bei 42 Cent =  '+ Math.round(maximal*42)/100 +' &euro;</td>';
tr[33].innerHTML = '<td colspan="3"><img src="http://media.pennergame.de/cache/bottlechart/'+ TagA +'_'+ MonatA +'_'+ Jahr +'_fr_FR.png" /></td>';



//http://media.pennergame.de/cache/bottlechart/30_07_2009_fr_FR.png







//Copyright by NewMan im Pennergame unter NewMan01 zu finden