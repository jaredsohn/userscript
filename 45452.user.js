// ==UserScript==
// @name           Junk calculator
// @namespace      Pennerhilfe.de
// @description    Calculates the proceeds of the number of pieces of junk typed into the sell field or the needed number of bottles to get a specified number of pounds.
// @include        *dossergame.co.uk/stock/bottle/*
// ==/UserScript==


Preis = "0." + document.getElementById("wirkung").innerHTML.slice(10, 12);
if(Preis == '0.ro'){
	Preis = "0." + document.getElementById("wirkung").getElementsByTagName('strong')[0].innerHTML.slice(3, 5);
}
Check = document.getElementById("chkval").value;
Menge = document.getElementById("menge_verkauf").value;
Max = document.getElementById("max").value;
Geld = document.getElementById("infoscreen").getElementsByTagName('li')[1].innerHTML.slice(1).replace(/\./g, "").replace(/,/, ".");
document.getElementById('content').getElementsByTagName('table')[0].innerHTML = '<tr><td width="10" align="left"><img title="Junk" alt="Junk" src="http://media.dossergame.co.uk/img/inventar/Pfandflasche.png"/></td><td align="left" width="250"><span>' + Max + ' Junk <font id="wirkung"> Price &pound;' + Preis + '  	</font></span></td><td width="190" align="right"><input id="chkval" type="hidden" name="chkval" value="' + Check + '" /><input id="max" type="hidden" name="max" value="' + Max + '"><input id="menge_verkauf" type="text" size="3" name="sum" value="1" onKeyup="document.getElementById(\'end\').value = document.getElementById(\'menge_verkauf\').value * ' + Preis + ';document.getElementById(\'end2\').value = document.getElementById(\'menge_verkauf\').value * ' + Preis + ' + Math.abs('+Geld+');"/><input type="button" value="max." onClick="max_flaschen();document.getElementById(\'end\').value = document.getElementById(\'menge_verkauf\').value * ' + Preis + ';document.getElementById(\'end2\').value = document.getElementById(\'menge_verkauf\').value * ' + Preis + ' + Math.abs('+Geld+');"  /><input type="submit" value="Sell"/></td></tr><tr><td><img src="http://media.dossergame.co.uk/img/cash.png" alt="Proceeds"></td><td>Proceeds &nbsp; <input id="end" type="text" size="3" name="end" value="' + Preis + '" onKeyup="document.getElementById(\'menge_verkauf\').value = Math.ceil(document.getElementById(\'end\').value / ' + Preis + ');document.getElementById(\'end2\').value = Math.abs(document.getElementById(\'end\').value) + Math.abs(' + Geld + ');"/> &pound;</td><td><img src="http://media.dossergame.co.uk/img/cash.png" alt="Total"/> &nbsp; Total &nbsp; <input type="text" id="end2" size="3" name="end2" value="'+Geld+'" onkeyup="document.getElementById(\'menge_verkauf\').value = Math.ceil((document.getElementById(\'end2\').value - ' + Geld + ') / ' + Preis + ');document.getElementById(\'end\').value = Math.abs(document.getElementById(\'end2\').value) - Math.abs(' + Geld + ');"/> £</td></tr>';