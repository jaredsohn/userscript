// ==UserScript==
// @name           [PG]Plunder Gesamtvermoegen gefixt pennergame 4.0 by basti1012
// @namespace      enter
// @description    Zeigt das Gesamtvermoegen an
// @include        http://*pennergame.de/stock/plunder/
// @exclude        http://newboard.pennergame.de/*
// ==/UserScript==

var table = document.getElementById("plunderlist"); 
var table_tr = table.getElementsByTagName("tr");
var pl_cash_compl = 0;
var pl_menge_compl = 0;

//Tabelle erweitern
for(i = 0; i < table_tr.length; i++)
{
	if(i == 0)
	{
		//Header
		table_tr[i].innerHTML += '<td style="vertical-align: middle; text-align: center; -moz-border-radius-topright: 4px; -moz-border-radius-topleft: 4px;" bgcolor="#272727" width="56" >&nbsp;<strong>Verm&ouml;gen</strong></td>';
	}
	else if((i+1) == table_tr.length)
	{
		//Footer
		table_tr[i].innerHTML += '<td style="vertical-align: middle; text-align: right; font-size: 12px;" bgcolor="#272727" height="20"><strong>'+formatZahl(pl_cash_compl,2,2)+' &euro;</strong></td>';
		table_tr[i].getElementsByTagName("td")[0].innerHTML = '<strong>'+(i+1)+' Plundertypen, '+pl_menge_compl+'x gefundener Plunder</strong>';
	}
	else
	{
		//Content
		var menge = table_tr[i].getElementsByClassName("col3")[0].innerHTML.split(" St")[0];
		var preis = table_tr[i].getElementsByTagName("a")[1].innerHTML.split("f"+unescape("%FC")+"r")[1].substr(2).replace([','],'.');
		var pl_teil = menge * preis;
		pl_cash_compl += pl_teil;
		pl_menge_compl += menge * 1;
		//Vermoegen pro Plunder
		table_tr[i].innerHTML += '<td style="border-right: 1px solid rgb(39, 39, 39); border-bottom: 1px solid rgb(39, 39, 39); vertical-align: middle; text-align: right; font-size: 12px;" width="116"><span style="vertical-align: middle; font-size: 12px;"><strong>'+formatZahl(pl_teil,2,2)+' &euro;</strong></span></td>';
	}
}


function formatZahl(zahl, k, fix) {

    if(!k) k = 0;

    var neu = '';

    // Runden

    var f = Math.pow(10, k);

    zahl = '' + parseInt( zahl * f + (.5 * (zahl > 0 ? 1 : -1)) ) / f ;

    // Komma ermittlen

    var idx = zahl.indexOf('.');

    // fehlende Nullen einfuegen

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