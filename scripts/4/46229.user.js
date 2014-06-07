// ==UserScript==
// @name           Pfandflaschenrechner (mit Endsumme)
// @namespace      Pennerhilfe.de
// @description    Rechnet automatisch aus, wie viel man fuer die derzeit ausgewaehlte Menge an Pfandflaschen im Moment bekommen wuerde, klappt jetzt auch beim Wirtschaftswunder...
// @include        http://*.pennergame.de/stock/bottle/*
// @include        http://pennergame.de/stock/bottle/*
// ==/UserScript==

Preis = "0." + document.getElementById("wirkung").innerHTML.slice(11, 13);
if(Preis == '0.ro'){
	Preis = "0." + document.getElementById("wirkung").getElementsByTagName('strong')[0].innerHTML.slice(3, 5);
}
Check = document.getElementById("chkval").value;
Menge = document.getElementById("menge_verkauf").value;
Max = document.getElementById("max").value;
Geld = document.getElementById("infoscreen").getElementsByTagName('li')[1].innerHTML.slice(1).replace(/\./g, "").replace(/,/, ".");
document.getElementById('content').getElementsByTagName('table')[0].innerHTML = '<tr><td width="10" align="left"><img title="Pfandflaschen" alt="Pfandflaschen" src="http://media.pennergame.de/img/inventar/Pfandflasche.png"/></td><td align="left" width="250"><span>' + Max + ' Pfandflaschen <font id="wirkung"> Preis: &euro;' + Preis + '  	</font></span></td><td width="190" align="right"><input id="chkval" type="hidden" name="chkval" value="' + Check + '" /><input id="max" type="hidden" name="max" value="' + Max + '"><input id="menge_verkauf" type="text" size="3" name="sum" value="1" onKeyup="document.getElementById(\'end\').value = document.getElementById(\'menge_verkauf\').value * ' + Preis + ';document.getElementById(\'end2\').value = document.getElementById(\'menge_verkauf\').value * ' + Preis + ' + Math.abs('+Geld+');"/><input type="button" value="max." onClick="max_flaschen();document.getElementById(\'end\').value = document.getElementById(\'menge_verkauf\').value * ' + Preis + ';document.getElementById(\'end2\').value = document.getElementById(\'menge_verkauf\').value * ' + Preis + ' + Math.abs('+Geld+');"  /><input type="submit" value="Verkaufen"/></td></tr><tr><td><img src="http://media.pennergame.de/img/cash.png" alt="Erl&ouml;&szlig;"></td><td>Erl&ouml;&szlig;: &nbsp; <input id="end" type="text" size="3" name="end" value="' + Preis + '" onKeyup="document.getElementById(\'menge_verkauf\').value = Math.ceil(document.getElementById(\'end\').value / ' + Preis + ');document.getElementById(\'end2\').value = Math.abs(document.getElementById(\'end\').value) + Math.abs(' + Geld + ');"/> &euro;</td><td><img src="http://media.pennergame.de/img/cash.png" alt="Total"/> &nbsp; Endsumme: &nbsp; <input type="text" id="end2" size="3" name="end2" value="'+Geld+'" onkeyup="document.getElementById(\'menge_verkauf\').value = Math.ceil((document.getElementById(\'end2\').value - ' + Geld + ') / ' + Preis + ');document.getElementById(\'end\').value = Math.abs(document.getElementById(\'end2\').value) - Math.abs(' + Geld + ');"/> &euro;</td></tr>';