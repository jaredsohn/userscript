// ==UserScript==
// @name           faz boersenspiel nettogewinn
// @namespace      faz.net
// @description    zeigt nettogewinn in depotübersicht an
// @version        0.2
// @include        http://boersenspiel.faz.net/a/depot.cgi
// ==/UserScript==

var $ = unsafeWindow.jQuery.noConflict(true);

function round(x, n)
{
  var a = Math.pow(10, n);
  return (Math.round(x * a) / a);
}

function replaceDotWithComma(floatNumber)
{
    return floatNumber.toString().replace(".", ",");
}

var t = $("#depotuebersicht .BS_ValueTbl");

$("<th align='right'>Netto<br/>in &euro;</th>").insertBefore(t.find("tr:first th:last"));

t.find("tr[valign]").each(function(){
	var tablerow 			= $(this);
	if(tablerow.find(">td").size() <= 2) return
	var anzahl 				= parseInt(tablerow.find(">td:first").html());
	var kaufwert 			= parseFloat(tablerow.find(">td").eq(3).html().replace(",", ".")); 
	var kaufgebuehren 		= 10.23 + ( anzahl * kaufwert * 0.004 );
	var verkaufwert 		= parseFloat(tablerow.find(">td").eq(4).html().replace(",", "."));
	var verkaufgebuehren 	= 10.23 + ( anzahl * verkaufwert * 0.004 ); 
	var gebuehren 			= round(kaufgebuehren + verkaufgebuehren, 2);
	var bruttogewinn 		= round((anzahl * verkaufwert) - (anzahl * kaufwert), 2);
	var nettogewinn 		= round(bruttogewinn - gebuehren, 2);
	var clazz = nettogewinn < 0 ? "chartnegativ" : "chartpositiv";
	var funktionenFeld = tablerow.find(".schwarz-bold-9");
	var nettoGewinnFeld = $("<td class='"+clazz+"' align='right' title='Brutto: "+replaceDotWithComma(bruttogewinn)+"&euro;; Geb&uuml;hren: "+replaceDotWithComma(gebuehren)+"&euro;'>"+replaceDotWithComma(nettogewinn)+"</td>");
	nettoGewinnFeld.insertBefore(funktionenFeld);
});

//verbreitere die gepunkteten linien zwischen den zeilen
var dottedLines = t.find('.DottedLineClear').parent();
dottedLines.attr('colspan', dottedLines.attr('colspan')+1);

//rücke bargeld und gesamtwert um 1 nach links sodass sie unter den einzel werten stehen
//ich denke das ist hübscher
var gesamtWertRow = t.find('tr:last');
var bargeldRow = gesamtWertRow.prev().prev();

var bottomRows = new Array();
bottomRows[0] = gesamtWertRow;
bottomRows[1] = bargeldRow;
for(key in bottomRows){
    var placeholder = bottomRows[key].find('>:first');
    placeholder.attr('colspan', placeholder.attr('colspan')-1);
}

