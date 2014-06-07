// ==UserScript==
// @name           Pfandrechner Premium 3.1
// @namespace      Pennertools.com
// @description    Einfach Pfand bei Pennergame ausrechnen lassen. Fuer V3.1
// @include        http://*pennergame.de/stock/bottle/*
// @exclude
// ==/UserScript==


//modified by enter for pennergame 3.1
//Copyright by Tobias Boelter Alias "ego victor sum" oder "eGo" Website: www.pennertools.com
//also modified by DerMitDenZahlenTanzt (Wirtschaftswunder-Anpassung)

// usage: formatzahl( number [, number]  [, bool]  ) //zu formatierende Zahl, Nachkommastellen (default 0), feste Nachkommastellen (f�llt auf).
function formatZahl(zahl, k, fix) {

    if(!k) k = 0;

    var neu = '';

    // Runden

    var f = Math.pow(10, k);

    zahl = '' + parseInt( zahl * f + (.5 * (zahl > 0 ? 1 : -1)) ) / f ;

    // Komma ermittlen

    var idx = zahl.indexOf('.');

    // fehlende Nullen einf?gen

    if(fix) {

         zahl += (idx == -1 ? '.' : '' )

         + f.toString().substring(1);

    }

    // Nachkommastellen ermittlen

    idx = zahl.indexOf('.');

    if( idx == -1) idx = zahl.length;

    else neu = ',' + zahl.substr(idx + 1, k);

 

    // Tausendertrennzeichen

    while(idx > 0)    {

        if(idx - 3 > 0)

        neu = '.' + zahl.substring( idx - 3, idx) + neu;

        else

        neu = zahl.substring(0, idx) + neu;

        idx -= 3;

    }

    return neu;

}



var ue=unescape("%FC");
var oe=unescape("%F6");

var maximal = parseInt(document.getElementById("max").value);
var my_anzahl_sell = document.getElementById('menge_verkauf').value;				
var my_kurs = document.getElementById('pfandflaschen_kurs_ajax').innerHTML;
var geld1 = document.getElementsByTagName('li')[1].textContent;
var geld = geld1.substring(1);

var cent = geld.split(',')[1];
var euro = geld.split(',')[0];

var len = euro.length;
var tausend = euro.substring(len-4,len-3);
if (tausend == ''){
	var cash = parseInt(euro+cent);
} else {
	var klein = euro.split('.')[1];
	var groß = euro.split('.')[0];
	var cash = parseInt(groß+klein+cent);
}


if(document.getElementsByTagName('html')[0].innerHTML.indexOf('Wirtschaftswunder') >0) {
	var my_kurs = 20;
}

var cash2 = cash/100;

//angepasst an 3.1
document.getElementsByTagName("table")[0].style.width = '600px';
document.getElementsByTagName("table")[0].innerHTML='<tr>	<td width="10" align="left">		<img src="http://media.pennergame.de/img/inventar/Pfandflasche.png" alt="Pfandflaschen" title="Pfandflaschen" />	</td>    	<td align="left" width="250">		<span>'+ maximal +' Pfandflaschen<font id="wirkung"> Preis: &euro;'+ my_kurs/100 +'  	</font></span>	</td>	<td width="190" align="right">		<input id="chkval" name="chkval" value="'+my_kurs+'" type="hidden"><input id="max" type="hidden" name="max" value="'+ maximal +'">								<input id="menge_verkauf" type="text" size="8" name="sum" value="'+ my_anzahl_sell +'" OnKeyUp="document.getElementById(\'euro\').value = this.value*'+ my_kurs +'/100;document.getElementById(\'gesamt\').value = (this.value*'+ my_kurs +'/100)+'+cash2+';"/>					<input type="button" value="max." onClick="max_flaschen();document.getElementById(\'euro\').value = document.getElementById(\'menge_verkauf\').value*'+ my_kurs +'/100;document.getElementById(\'gesamt\').value = '+cash2+' + eval(document.getElementById(\'euro\').value);" />		<input type="submit" value="Verkaufen"/>	</td></tr>		<tr>	<td> </td>	<td>		Gew'+ue+'nschter Erl'+oe+'s:	</td>	<td>		<input id="euro" type="text" size="8" value="'+ (my_kurs * my_anzahl_sell / 100) +'" OnKeyUp="document.getElementById(\'menge_verkauf\').value = Math.round(this.value/'+ my_kurs +'*100);document.getElementById(\'gesamt\').value = ('+cash2+'+eval(this.value)).toFixed(2);"/>&euro; <br>					 		<a href="#" OnClick="document.getElementById(\'euro\').size++;document.getElementById(\'gesamt\').size++;document.getElementById(\'menge_verkauf\').size++;">Felder erweitern</a>		<br><br>	</td></tr>							<tr>	<td>		<img src="http://media.pennergame.de/img/cash.png">	</td>	<td>Gesamtverm'+oe+'gen:</td>	<td>		<input id="gesamt" type="text" size="8" value="'+cash2+'"  OnKeyUp="document.getElementById(\'euro\').value =  (this.value-'+cash2+').toFixed(2);document.getElementById(\'menge_verkauf\').value = Math.round((this.value-'+cash2+')/'+ my_kurs +'*100);"/>&euro; 	</td></tr>';

var target = 590000; //Ziel Schloss Geld
var missingcash = target*100-cash; //das Geld fehlt
var bottles = Math.ceil(missingcash/my_kurs); //fehlende Falschen
var content = document.getElementsByTagName('html')[0].innerHTML; //html element holen? Original bei 
var flaschen2 = document.getElementsByTagName('table')[1];
flaschen2.style.width="600px";
var flaschen1 = flaschen2.getElementsByTagName('td')[1].textContent;
var flaschen = parseInt(flaschen1);
var rest = bottles-flaschen;

flaschen2.getElementsByTagName('tr')[0].innerHTML += '<td width="200"><br />Beim aktuellen Preis brauchst du noch <b>'+formatZahl(rest)+'</b> Pfandflaschen zum Schloss!</td>';



