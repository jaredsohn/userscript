// ==UserScript==
// @name           Sprzedawca Premium 3.2
// @namespace      menelgame.pl
// @include        http://*menelgame.pl/stock/bottle/*
// @exclude
// ==/UserScript==

function formatZahl(zahl, k, fix) {
    if(!k) k = 0;
    var neu = '';
    var f = Math.pow(10, k);
    zahl = '' + parseInt( zahl * f + (.5 * (zahl > 0 ? 1 : -1)) ) / f ;
    var idx = zahl.indexOf('.');
   if(fix) {
         zahl += (idx == -1 ? '.' : '' )
         + f.toString().substring(1);
   }
    idx = zahl.indexOf('.');
    if( idx == -1) idx = zahl.length;
    else neu = ',' + zahl.substr(idx + 1, k);
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
var euro2 = geld.split(',')[0];
var euro = euro2.split('ł')[1];
var len = euro.length;
var tausend = euro.substring(len-4,len-3);
if (tausend == ''){
	var cash = parseInt(euro+cent);
} else {
	var klein = euro.split('.')[1];
	var groß = euro.split('.')[0];
	var cash = parseInt(groß+klein+cent);
 }
var cash2 = cash/100;
document.getElementsByTagName("table")[0].style.width = '500px';
document.getElementsByTagName("table")[0].innerHTML='<tr>	<td width="10" align="left">		<img src="http://media.menelgame.pl/img/crap.png" alt="Pfandflaschen" title="Pfandflaschen" />	</td>    	<td align="left" width="250">		<span>Posiadasz '+ maximal +' puszek<font id="wirkung"> po: '+ my_kurs +' gr 	</font></span>	</td>	<td width="190" align="right">		<input id="chkval" name="chkval" value="'+my_kurs+'" type="hidden"><input id="max" type="hidden" name="max" value="'+ maximal +'">								<input id="menge_verkauf" type="text" size="12" name="sum" value="0" OnKeyUp="document.getElementById(\'euro\').value = this.value*'+ my_kurs +'/100;document.getElementById(\'gesamt\').value = ((this.value*'+ my_kurs +'/100)+'+cash2+');"/>					<input type="button" value="max." onClick="max_flaschen();document.getElementById(\'euro\').value = document.getElementById(\'menge_verkauf\').value*'+ my_kurs +'/100;document.getElementById(\'gesamt\').value = '+cash2+' + eval(document.getElementById(\'euro\').value);" />		<input type="submit" value="Sprzedaj"/>	</td></tr>		<tr>	<td><img src="http://media.menelgame.pl/img/cash.png"></td><td><font color="#CC9900">Brakuje ci / zarobisz:</font></td>	<td>		<input id="euro" type="text" size="12" value="0" OnKeyUp="document.getElementById(\'menge_verkauf\').value = Math.round(this.value/'+ my_kurs +'*100);document.getElementById(\'gesamt\').value = ('+cash2+'+eval(this.value)).toFixed(2);"/> zl </td></tr><tr>	<td>		<img src="http://media.menelgame.pl/img/cash.png"></td><td><font color="green">Razem:</font></td><td>		<input id="gesamt" type="text" size="12" value="'+cash2+'"  OnKeyUp="document.getElementById(\'euro\').value =  (this.value-'+cash2+').toFixed(2);document.getElementById(\'menge_verkauf\').value = Math.round((this.value-'+cash2+')/'+ my_kurs +'*100)+1;"/> zl</td></tr>';
var target = 590000; 
var missingcash = target*100-cash; 
var bottles = Math.ceil(missingcash/my_kurs); 
var content = document.getElementsByTagName('html')[0].innerHTML;
var flaschen2 = document.getElementsByTagName('table')[1];
flaschen2.style.width="600px";
var flaschen1 = flaschen2.getElementsByTagName('td')[1].textContent;
var flaschen = parseInt(flaschen1);
var rest = bottles-flaschen;
flaschen2.getElementsByTagName('tr')[0].innerHTML += '<td width="200"><br />Beim aktuellen Preis brauchst du noch <b>'+formatZahl(rest)+'</b> Pfandflaschen zum Schloss!</td>';