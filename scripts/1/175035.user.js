// ==UserScript==
// @name        Better AdriaticaPress
// @description Rimozione elementi inutili nella bolla AdriaticaPress
// @include     http://www.adriaticapress.it/Resa*
// @downloadURL http://userscripts.org/scripts/source/175035.user.js
// @version     0.2.2
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// ==/UserScript==

// Elimino elementi superflui
$("span[id='lblPrezzo']").css("display","none");
$("img[id='imgAggiornata']").css("display","none");
$("td[width='9%']").css("display","none");
$("img[src='/Images/editSmall.png']").css("display","none");
$("img[src='/Images/barcodeNo.png']").css("display","none");
$("span[id='lblE']").text("0").css("color","black");


// Sostituisco , con . (per la moltiplicazione)
$("span[id^=ctl00_MainContent_dlResa_ctl][id$=_lblPrezzoNetto]")
var VirgolaPunto = $("span[id^=ctl00_MainContent_dlResa_ctl][id$=_lblPrezzoNetto]");
VirgolaPunto.each(function () {
    var html = $(this).html();
    html = html.replace("," , ".");
    $(this).html(html);
});

// Elimino simbolo € e le parentesi
var trimPrezzo = $("span[id^=ctl00_MainContent_dlResa_ctl][id$=_lblPrezzoNetto]");
trimPrezzo.each(function () {
    var html = $(this).html();
    html = html.replace(/[(€ )]+/g, "");
    $(this).html(html);
});

// Inserisco colonna per lo "sviluppo"
$(".tabella tr").append("<td class='appeso'></td>");

// Inserisco intenstazione sviluppo
$(".tabellaHeader tr").append("<th>Sviluppo</th>")

$(".appeso").each(function () {
    var cellaPrezzo = $(this).siblings("td").children("span[id$=_lblPrezzoNetto]");
    var testoPrezzo = cellaPrezzo.text();
    var prezzoNetto = parseFloat(testoPrezzo);
    var cellaQuant = $(this).siblings("td").children("strong").children("span[id$=_lblDichiarato]");
    var testoQuant = cellaQuant.text();
    var numQuant = parseInt(testoQuant);
    var totale = prezzoNetto * numQuant;
    var tot = totale.toFixed(4);
    $(this).text(tot);
});

// l'inserimento del totale lo faccioamo con .insertAfter()
$('<td id="reportSviluppo"><div>certificato</div><div>totale netto <span id="certificatoNetto"></span></div><div>totale copie <span id="certificatoDichiarato"></span></div></td>').insertAfter('td[style*=262px]');

// Funzione sommaNetto
var sumNetto = 0;
$(".appeso").each(function (){
    sumNetto += parseFloat($(this).text());
});
var sommaNetto = sumNetto.toFixed(4);
$("#certificatoNetto").text(sommaNetto);

// Funzione somma dichiarati, come quella del netto
var sumDichiarato = 0;
$("span[id$=_lblDichiarato]").each(function (){
    sumDichiarato += parseInt($(this).text());
});
$("#certificatoDichiarato").text(sumDichiarato);

// Riporto le virgole, così da facilitare un'eventuale transizione verso foglio di calcolo
// colonna prezzo...
$("span[id^=ctl00_MainContent_dlResa_ctl][id$=_lblPrezzoNetto]")
var VirgolaPunto = $("span[id^=ctl00_MainContent_dlResa_ctl][id$=_lblPrezzoNetto]");
VirgolaPunto.each(function () {
    var html = $(this).html();
    html = html.replace("." , ",");
    $(this).html(html);
});

// ... e colonna sviluppo
$(".appeso").each(function () {
    var html = $(this).html();
    html = html.replace("." , ",");
    $(this).html(html);
});