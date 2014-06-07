// ==UserScript==
// @name           Pfandrechner Premium
// @namespace      Pennertools.com
// @description    Einfach Pfand bei Pennergame ausrechnen lassen. Fuer V3.1
// @include        http://*pennergame.de/stock/bottle/*

// ==/UserScript==

var ue=unescape("%FC");
var oe=unescape("%F6");

var maximal = parseInt(document.getElementById("max").value);

var my_anzahl_sell = document.getElementById('menge_verkauf').value;				

var my_kurs = document.getElementById('pfandflaschen_kurs_ajax').innerHTML;

geld1 = document.getElementById('infoscreen').innerHTML.split(',');
geld2 = geld1[0].split('<li class="cash">');
geld = geld2[1].split(unescape("%u20AC"));
geld=geld[1];

geld=geld.replace('.','');

document.getElementsByTagName("table")[0].style.width = '570px';


document.getElementsByTagName("table")[0].innerHTML='<tr><td width="10" align="left"><img src="http://media.pennergame.de/img/inventar/Pfandflasche.png" alt="Pfandflaschen" title="Pfandflaschen" /></td>    <td align="left" width="250"><span>'+ maximal +' Pfandflaschen<font id="wirkung"> Preis: &euro;'+ my_kurs/100 +'  	</font></span></td><td width="190" align="right"><input id="max" type="hidden" name="max" value="'+ maximal +'">						<input id="menge_verkauf" type="text" size="8" name="sum" value="'+ my_anzahl_sell +'" OnKeyUp="document.getElementById(\'euro\').value = this.value*'+ my_kurs +'/100;document.getElementById(\'gesamt\').value = (this.value*'+ my_kurs +'/100)+'+geld+';"/>			<input type="button" value="max." onClick="max_flaschen();document.getElementById(\'euro\').value = document.getElementById(\'menge_verkauf\').value*'+ my_kurs +'/100;document.getElementById(\'gesamt\').value = '+geld+' + eval(document.getElementById(\'euro\').value);" /><input type="submit" value="Verkaufen"/></td></tr>		<tr><td> </td><td>Gew'+ue+'nschter Erl'+oe+'s:</td><td><input id="euro" type="text" size="8" value="'+ my_kurs * my_anzahl_sell / 100 +'" OnKeyUp="document.getElementById(\'menge_verkauf\').value = Math.round(this.value/'+ my_kurs +'*100);document.getElementById(\'gesamt\').value = ('+geld+'+eval(this.value)).toFixed(2);"/>&euro; <br>					 <a href="#" OnClick="document.getElementById(\'euro\').size++;document.getElementById(\'gesamt\').size++;document.getElementById(\'menge_verkauf\').size++;">Felder erweitern</a><br><br></td></tr>							<tr><td><img src="http://media.pennergame.de/img/cash.png"></td><td>Gesamtverm'+oe+'gen:</td><td><input id="gesamt" type="text" size="8" value="'+geld+'" OnKeyUp="document.getElementById(\'euro\').value =  (this.value-'+geld+').toFixed(2);document.getElementById(\'menge_verkauf\').value = Math.round((this.value-'+geld+')/'+ my_kurs +'*100);"/>&euro; </td></tr>';


//Copyright by Tobias Boelter Alias "ego victor sum" oder "eGo" Website: www.pennertools.com

// www.koelschgame.de  -  Cooles Browsergame ;-)