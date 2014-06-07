// ==UserScript==
// @name           Pfandrechner by NewMan V7.1
// @namespace      http://forum.ego-shooters.net
// @description    Berechnung des Flaschenpfands zum aktuellen Kurs.
// @include        http://pennergame.de/stock/bottle/
// @include        http://www.pennergame.de/stock/bottle/
// @include        http://pennergame.de/stock/bottle/sell/
// @include        http://www.pennergame.de/stock/bottle/sell/
// @exclude        *berlin.pennergame*

// ==/UserScript==

window.setTimeout("location.reload()", 30000);
if(GM_getValue("kurs_ex") == null){
	GM_setValue("kurs_ex", 0);
}
var kurs_ex = GM_getValue("kurs_ex");
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

if (Number (my_kurs_2)*100 >= Number (17))
{
	alert ("Guter Kurs! Um "+ StundeA +":"+ MinutenA +":"+ SekA +" Uhr mit "+ my_kurs_2*100 +" Cent.")
}

var table = document.getElementsByClassName('listshop')[0].getElementsByTagName('table')[0];
var tbody = table.getElementsByTagName('tbody')[0];
var tr = tbody.getElementsByTagName('tr');
var table_2 = document.getElementById('options');
var cash = table_2.getElementsByTagName('li')[0].innerHTML;
cash = cash.split(unescape("%u20AC"))[1].split("</a>")[0];
cash = cash.replace(/\./g, "");
cash = cash.replace(/,/, ".");



var newtr = new Array();
for (x = 0; x <= 5+kurs_ex; x++){
	newtr[x] = document.createElement('tr');
	tbody.appendChild(newtr[x]);
}

var time = jetzt.getTime();
if(GM_getValue("save_time") !=  null){
	if(Number(GM_getValue("save_time"))+86400000 <= time){
		GM_setValue("save_time", time.toString());
		check();
	}
}
else {
	GM_setValue("save_time", time.toString());
	check();
}

var max_cash_1 = GM_getValue("max_cash");
document.getElementById('menge_verkauf').setAttribute('onkeyup', 'document.getElementById("summe").value = Math.round(document.getElementById("menge_verkauf").value * ' + my_kurs_2 +'*100)/100 ; document.getElementById("all").value = Math.round((document.getElementById("menge_verkauf").value * ' + my_kurs_2 +' + '+ cash +')*100)/100; if(document.getElementById(\'all\').value.length > 6 || document.getElementById(\'summe\').value.length > 6 || document.getElementById(\'menge_verkauf\').value.length > 6){document.getElementById(\'all\').size = document.getElementById(\'all\').value.length;document.getElementById(\'summe\').size = document.getElementById(\'summe\').value.length;document.getElementById(\'menge_verkauf\').size = document.getElementById(\'menge_verkauf\').value.length;}if(document.getElementById(\'all\').value >'+ max_cash_1 +'){document.getElementById(\'all\').style.backgroundColor = \'#CC0000\'; document.getElementById(\'all\').value = '+ max_cash_1 +'; document.getElementById(\'summe\').value = Math.round((document.getElementById(\'all\').value - '+ cash +')*100)/100; document.getElementById(\'menge_verkauf\').value = Math.ceil(document.getElementById(\'summe\').value / ' + my_kurs_2 + ');}else{document.getElementById(\'all\').style.backgroundColor = \'\';};' );
table.getElementsByTagName('input')[3].setAttribute('onclick', 'max_flaschen();document.getElementById("summe").value = Math.round(document.getElementById("menge_verkauf").value * ' + my_kurs_2 +'*100)/100 ; document.getElementById("all").value = Math.round((document.getElementById("menge_verkauf").value * ' + my_kurs_2 +' + '+ cash +')*100)/100; if(document.getElementById(\'all\').value.length > 6 || document.getElementById(\'summe\').value.length > 6 || document.getElementById(\'menge_verkauf\').value.length > 6){document.getElementById(\'all\').size = document.getElementById(\'all\').value.length;document.getElementById(\'summe\').size = document.getElementById(\'summe\').value.length;document.getElementById(\'menge_verkauf\').size = document.getElementById(\'menge_verkauf\').value.length;}if(document.getElementById(\'all\').value >'+ max_cash_1 +'){document.getElementById(\'all\').style.backgroundColor = \'#CC0000\'; document.getElementById(\'all\').value = '+ max_cash_1 +'; document.getElementById(\'summe\').value = Math.round((document.getElementById(\'all\').value - '+ cash +')*100)/100; document.getElementById(\'menge_verkauf\').value = Math.ceil(document.getElementById(\'summe\').value / ' + my_kurs_2 + ');}else{document.getElementById(\'all\').style.backgroundColor = \'\';};' );

tr[1].innerHTML = '<td><img src="http://media.pennergame.de/img/cash.png" alt="summe"></td><td>Gew&uuml;nschter Betrag</td><td><input id="summe" type="text" size="3" name="summe" value="' + my_kurs_2 + '" onKeyup="document.getElementById(\'menge_verkauf\').value = Math.ceil(document.getElementById(\'summe\').value / ' + my_kurs_2 + '); document.getElementById(\'all\').value = Math.round((Number(document.getElementById(\'summe\').value) + '+ cash +')*100)/100; if(document.getElementById(\'all\').value.length > 6 || document.getElementById(\'summe\').value.length > 6 || document.getElementById(\'menge_verkauf\').value.length > 6){document.getElementById(\'all\').size = document.getElementById(\'all\').value.length;document.getElementById(\'summe\').size = document.getElementById(\'summe\').value.length;document.getElementById(\'menge_verkauf\').size = document.getElementById(\'menge_verkauf\').value.length;}; if(document.getElementById(\'all\').value >'+ max_cash_1 +'){document.getElementById(\'all\').style.backgroundColor = \'#CC0000\'; document.getElementById(\'all\').value = '+ max_cash_1 +'; document.getElementById(\'summe\').value = Math.round((document.getElementById(\'all\').value - '+ cash +')*100)/100; document.getElementById(\'menge_verkauf\').value = Math.ceil(document.getElementById(\'summe\').value / ' + my_kurs_2 + ');}else{document.getElementById(\'all\').style.backgroundColor = \'\';};"/>&nbsp;&euro;</td>';


tr[2].innerHTML = '<td><img src="http://media.pennergame.de/img/cash.png" alt="summe2"></td><td>Gew&uuml;nschter Gesamtbetrag</td><td><input id="all" type="text" size="3" name="all" value="' + (Math.round((Number(cash) + Number(my_kurs_2))*100)/100) + '" onKeyup="document.getElementById(\'menge_verkauf\').value = Math.ceil((document.getElementById(\'all\').value - '+ cash +') / ' + my_kurs_2 + '); document.getElementById(\'summe\').value = Math.round((document.getElementById(\'all\').value - '+ cash +')*100)/100; if(document.getElementById(\'all\').value.length > 6 || document.getElementById(\'summe\').value.length > 6 || document.getElementById(\'menge_verkauf\').value.length > 6){document.getElementById(\'all\').size = document.getElementById(\'all\').value.length;document.getElementById(\'summe\').size = document.getElementById(\'summe\').value.length;document.getElementById(\'menge_verkauf\').size = document.getElementById(\'menge_verkauf\').value.length;}if(document.getElementById(\'all\').value >'+ max_cash_1 +'){document.getElementById(\'all\').style.backgroundColor = \'#CC0000\'; document.getElementById(\'all\').value = '+ max_cash_1 +';document.getElementById(\'summe\').value = Math.round((document.getElementById(\'all\').value - '+ cash +')*100)/100; document.getElementById(\'menge_verkauf\').value = Math.ceil(document.getElementById(\'summe\').value / ' + my_kurs_2 + ');}else{document.getElementById(\'all\').style.backgroundColor = \'\';};"/>&nbsp;&euro;</td>';

if(document.getElementById('all').value.length > 6){
	document.getElementById('all').size = document.getElementById('all').value.length;
}

tr[3].innerHTML = '<td colspan="3">Maximale Ausbeute bei einem bestimmten Kurs:</td>';
tr[4].innerHTML = '<td colspan="3">Beim aktuellen Kurs von '+ Math.round(my_kurs_2*100) +' Cent = '+ Math.round(maximal*my_kurs_2*100)/100 +' &euro;</td>';
if(kurs_ex != 0){
	var kurs_all = new Array;
	var index = 0;
	for(ka=1; ka<=99; ka++){
		if(GM_getValue("kurs"+ka) != null){
			kurs_all[index+1] = ka;
			index++;
		}
		if(index == kurs_ex){
			break;
		}
	}
	for(ex=1; ex<=kurs_ex; ex++){
		tr[4+ex].innerHTML = '<td colspan="3">Bei '+ kurs_all[ex] +' Cent =  '+ Math.round(maximal*kurs_all[ex])/100 +' &euro;</td>';
	}
}

tr[5+kurs_ex].innerHTML = '<td colspan="3"><b>Kursanzeige eintragen f&uuml;r <input id="kurs_eintragen" type="text" size="1" maxlength="2"/> Cent</b> <input type="button" id="kurs_speichern" value="Speichern"/> <input type="button" id="kurs_entfernen" value="Entfernen"/><br /><span id="kurs_gespeichert"><span></td>';
tr[6+kurs_ex].innerHTML = '<td colspan="3"><img src="http://media.pennergame.de/cache/bottlechart/'+ TagA +'_'+ MonatA +'_'+ Jahr +'_de_DE.png" /></td>';


document.getElementById('kurs_speichern').addEventListener('click', function kurs_speichern(){
	
	if(document.getElementById('kurs_eintragen').value.length >= 1 && document.getElementById('kurs_eintragen').value.length <= 2 && !isNaN(document.getElementById('kurs_eintragen').value)){
		if(GM_getValue("kurs"+document.getElementById('kurs_eintragen').value) == null){
			GM_setValue("kurs"+document.getElementById('kurs_eintragen').value, document.getElementById('kurs_eintragen').value);
			document.getElementById('kurs_gespeichert').setAttribute('style', "color: rgb(0, 255, 0);");
			document.getElementById('kurs_gespeichert').innerHTML = "Kurs von "+document.getElementById('kurs_eintragen').value+" Cent gespeichert!";
			var temp = GM_getValue("kurs_ex");
			GM_setValue("kurs_ex", temp+1);
		}else{
			document.getElementById('kurs_gespeichert').setAttribute('style', "color: rgb(255, 0, 0);");
			document.getElementById('kurs_gespeichert').innerHTML = "Dier Kurs von "+document.getElementById('kurs_eintragen').value+" ist schon im Speicher!!!";
		}
	}else{
		document.getElementById('kurs_gespeichert').setAttribute('style', "color: rgb(255, 0, 0);");
		document.getElementById('kurs_gespeichert').innerHTML = "Keine g&uuml;ltige Zahl eingegeben!!!";
	}

location.reload();

},false); 

document.getElementById('kurs_entfernen').addEventListener('click', function kurs_entfernen(){
	
	if(document.getElementById('kurs_eintragen').value.length >= 1 && document.getElementById('kurs_eintragen').value.length <= 2 && !isNaN(document.getElementById('kurs_eintragen').value)){
		if(GM_getValue("kurs"+document.getElementById('kurs_eintragen').value) != null){;
			GM_deleteValue("kurs"+document.getElementById('kurs_eintragen').value);
			document.getElementById('kurs_gespeichert').setAttribute('style', "color: rgb(0, 255, 0);");
			document.getElementById('kurs_gespeichert').innerHTML = "Kurs von "+document.getElementById('kurs_eintragen').value+" Cent gel&ouml;scht!";
			var temp = GM_getValue("kurs_ex");
			GM_setValue("kurs_ex", temp-1);
		}else{
			document.getElementById('kurs_gespeichert').setAttribute('style', "color: rgb(255, 0, 0);");
			document.getElementById('kurs_gespeichert').innerHTML = "Kurs von "+document.getElementById('kurs_eintragen').value+" Cent existiert nicht im Speicher!";
		}
	}else{
		document.getElementById('kurs_gespeichert').setAttribute('style', "color: rgb(255, 0, 0);");
		document.getElementById('kurs_gespeichert').innerHTML = "Keine g&uuml;ltige Zahl eingegeben!!!";
	}
location.reload();
},false);

function check() {
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://www.pennergame.de/overview/',
		onload: function(responseDetails) {
			var side = responseDetails.responseText;
			
			if (side.indexOf('Container') != -1) {
				var max_cash = 1000000;
			} 
			else if (side.indexOf('Einkaufswagen') != -1) {
				var max_cash = 10000;
			} 
			else if (side.indexOf('Beutel') != -1) {
				var max_cash = 1000;
			} 
			else if(side.indexOf('Gro�e T�te') != -1) {
				var max_cash = 100;
			} else {
				var max_cash = 10;
			}
			GM_setValue("max_cash", max_cash);
		}
	});	
}
//Copyright by NewMan im Pennergame unter NewMan01 zu finden