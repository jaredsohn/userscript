// ==UserScript==
// @name        SEMESTR II
// @namespace   k,omk,o
// @include     https://portal.wee.p.lodz.pl/?page=indeks&sc=DB17201012L2
// @version     1
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @grand none
// ==/UserScript==

//2012/13 ZIMA

$(document).ready(function(){

$("a:contains('Pobierz wykaz ocen')").remove();

//$("td:contains('Wstęp do analizy matematycznej')").parent().remove();
//$("td:contains('Prawo inżynierskie i ochrona własności intelektualnej')").parent().remove();
//$("td:contains('Komputerowa analiza układów elektrycznych')").first().parent().remove();
//$("td:contains('Fizyka 1')").parent().remove();
//$("td:contains('Algebra liniowa')").parent().remove();
$("th:contains('PRZEDMIOTY ZALEGŁE')").parent().prev().remove();
$("th:contains('PRZEDMIOTY ZALEGŁE')").parent().remove();

$("td:contains('1039')").parent().prev().remove();
$("td:contains('1039')").parent().remove();

$("td:contains('4822')").parent().prev().remove();
$("td:contains('4822')").parent().remove();

$("td:contains('1113')").parent().prev().remove();
$("td:contains('1113')").parent().remove();

$("td:contains('4825')").parent().prev().remove();
$("td:contains('4825')").parent().remove();

$("td:contains('0029')").parent().prev().remove();
$("td:contains('0029')").parent().remove();

$("td:contains('0041')").parent().remove();

$("td:contains('1112')").parent().remove();

$("th:contains('PRZEDMIOTY ZALEGŁE')").parent().next(".rule").remove();
$("th:contains('PRZEDMIOTY BIEŻĄCE')").parent().prev(".rule").remove();
$("th:contains('PRZEDMIOTY BIEŻĄCE')").parent().prev().remove();

//html body div#centering div#container div#main div#content div#contentpadding table.grid tbody tr.rule td

$(".lcell:contains('Podstawy programowania II')").next('td').next('td').html('<strong>3.0</strong>');
$(".lcell:contains('Podstawy programowania II')").next('td').next('td').next('td').next('td').html('<nobr>2013-07-03</nobr>');
//$(".lcell:contains('Podstawy programowania II')").parent('tr').next('tr').html('<td style="text-align: center;" colspan="6"><div style="display:none;border: 1px solid black; width: 95%; padding: 2px; margin: 4px auto;" id="cc6"><table cellspacing="0" cellpadding="0" style="width: 100%; margin-left: auto; margin-right: auto;" class="grid"><thead><tr><th style="text-align: center;">Forma</th><th style="text-align: center;">Godz.</th><th style="text-align: center;">Waga</th><th>Osoba wpisująca</th><th style="text-align: center;">Ocena 1</th><th style="text-align: center;">Ocena 2</th><th style="text-align: center;">Ocena 3</th><th style="text-align: center;">Zaliczenie</th><th style="text-align: center;">Status</th></tr></thead><tbody><tr class="rule"><td colspan="9">&nbsp;</td></tr><tr><td>W</td><td>30</td><td> 1.00</td><td class="left"> dr hab. Anna Fabjańska</td><td><strong>3.0</strong><br><span style="font-size: 0.8em; font-style: italic;">2013-07-03</span></td><td><strong></strong><br><span style="font-size: 0.8em; font-style: italic;"></span></td><td><strong></strong><br><span style="font-size: 0.8em; font-style: italic;"></span></td><td><strong></strong><br><span style="font-size: 0.8em; font-style: italic;"></span></td><td style="font-style: italic;">zajęcia w toku</td></tr><tr><td class="downpad" colspan="9">&nbsp;</td></tr></tbody></table></div></td>');
$(".lcell:contains('Podstawy programowania II')").parent('tr').next('tr').html('<td style="text-align: center;" colspan="6"><div style="display:none;border: 1px solid black; width: 95%; padding: 2px; margin: 4px auto;" id="cc6"><table cellspacing="0" cellpadding="0" style="width: 100%; margin-left: auto; margin-right: auto;" class="grid"><thead><tr><th style="text-align: center;">Forma</th><th style="text-align: center;">Godz.</th><th style="text-align: center;">Waga</th><th>Osoba wpisująca</th><th style="text-align: center;">Ocena 1</th><th style="text-align: center;">Ocena 2</th><th style="text-align: center;">Ocena 3</th><th style="text-align: center;">Zaliczenie</th><th style="text-align: center;">Status</th></tr></thead><tbody><tr class="rule"><td colspan="9">&nbsp;</td></tr><tr><td>W</td><td>30</td><td> 0.50</td><td class="left"> dr inż. Anna Fabijańska</td><td><strong>3.0</strong><br><span style="font-size: 0.8em; font-style: italic;">2013-07-03</span></td><td><strong></strong><br><span style="font-size: 0.8em; font-style: italic;"></span></td><td><strong></strong><br><span style="font-size: 0.8em; font-style: italic;"></span></td><td><strong></strong><br><span style="font-size: 0.8em; font-style: italic;"></span></td><td style="font-style: italic;">zajęcia w toku</td></tr><tr class="rule"><td colspan="9">&nbsp;</td></tr><tr><td>L</td><td>30</td><td> 0.50</td><td class="left"> mgr inż. Rafał Jachowicz</td><td><strong>3.0</strong><br><span style="font-size: 0.8em; font-style: italic;">2013-02-20</span></td><td><strong></strong><br><span style="font-size: 0.8em; font-style: italic;"></span></td><td><strong></strong><br><span style="font-size: 0.8em; font-style: italic;"></span></td><td><strong></strong><br><span style="font-size: 0.8em; font-style: italic;"></span></td><td style="font-style: italic;">zajęcia w toku</td></tr><tr><td class="downpad" colspan="9">&nbsp;</td></tr></tbody></table></div></td>');

$(".left:contains('Wstęp do elektroniki')").next('td').next('td').html('<strong>3.0</strong>');
$(".lcell:contains('Wstęp do elektroniki')").next('td').next('td').next('td').next('td').html('<nobr>2013-07-04</nobr>');
$(".lcell:contains('Wstęp do elektroniki')").parent('tr').next('tr').html('<td style="text-align: center;" colspan="6"><div style="display:none;border: 1px solid black; width: 95%; padding: 2px; margin: 4px auto;" id="cc8"><table cellspacing="0" cellpadding="0" style="width: 100%; margin-left: auto; margin-right: auto;" class="grid"><thead><tr><th style="text-align: center;">Forma</th><th style="text-align: center;">Godz.</th><th style="text-align: center;">Waga</th><th>Osoba wpisująca</th><th style="text-align: center;">Ocena 1</th><th style="text-align: center;">Ocena 2</th><th style="text-align: center;">Ocena 3</th><th style="text-align: center;">Zaliczenie</th><th style="text-align: center;">Status</th></tr></thead><tbody><tr class="rule"><td colspan="9">&nbsp;</td></tr><tr><td>Lgma</td><td>15</td><td> 1.00</td><td class="left"> dr inż. Ewa Raj</td><td><strong>3.0</strong><br><span style="font-size: 0.8em; font-style: italic;">2013-07-04</span></td><td><strong></strong><br><span style="font-size: 0.8em; font-style: italic;"></span></td><td><strong></strong><br><span style="font-size: 0.8em; font-style: italic;"></span></td><td><strong></strong><br><span style="font-size: 0.8em; font-style: italic;"></span></td><td style="font-style: italic;">zajęcia w toku</td></tr><tr><td class="downpad" colspan="9">&nbsp;</td></tr></tbody></table></div></td>');

$(".lcell:contains('Fizyka 2 (inżynieria materiałowa)')").next('td').next('td').html('<strong>3.0</strong>');
$(".lcell:contains('Fizyka 2 (inżynieria materiałowa)')").next('td').next('td').next('td').next('td').html('<nobr>2013-07-04</nobr>');
$(".lcell:contains('Fizyka 2 (inżynieria materiałowa)')").parent('tr').next('tr').html('<td style="text-align: center;" colspan="6"><div style="display:none;border: 1px solid black; width: 95%; padding: 2px; margin: 4px auto;" id="cc2"><table cellspacing="0" cellpadding="0" style="width: 100%; margin-left: auto; margin-right: auto;" class="grid"><thead><tr><th style="text-align: center;">Forma</th><th style="text-align: center;">Godz.</th><th style="text-align: center;">Waga</th><th>Osoba wpisująca</th><th style="text-align: center;">Ocena 1</th><th style="text-align: center;">Ocena 2</th><th style="text-align: center;">Ocena 3</th><th style="text-align: center;">Zaliczenie</th><th style="text-align: center;">Status</th></tr></thead><tbody><tr class="rule"><td colspan="9">&nbsp;</td></tr><tr><td>W</td><td>15</td><td> 1.00</td><td class="left"> dr inż. Ryszard Kawczyńsk</td><td><strong>3.0</strong><br><span style="font-size: 0.8em; font-style: italic;">2013-07-04</span></td><td><strong></strong><br><span style="font-size: 0.8em; font-style: italic;"></span></td><td><strong></strong><br><span style="font-size: 0.8em; font-style: italic;"></span></td><td><strong></strong><br><span style="font-size: 0.8em; font-style: italic;"></span></td><td style="font-style: italic;">zajęcia w toku</td></tr><tr><td class="downpad" colspan="9">&nbsp;</td></tr></tbody></table></div></td>');

$(".lcell:contains('Algorytmy i struktury danych')").next('td').next('td').html('<strong>3.0</strong>');
$(".lcell:contains('Algorytmy i struktury danych')").next('td').next('td').next('td').next('td').html('<nobr>2013-07-04</nobr>');
$(".lcell:contains('Algorytmy i struktury danych')").parent('tr').next('tr').html('<td style="text-align: center;" colspan="6"><div style="display:none;border: 1px solid black; width: 95%; padding: 2px; margin: 4px auto;" id="cc0"><table cellspacing="0" cellpadding="0" style="width: 100%; margin-left: auto; margin-right: auto;" class="grid"><thead><tr><th style="text-align: center;">Forma</th><th style="text-align: center;">Godz.</th><th style="text-align: center;">Waga</th><th>Osoba wpisująca</th><th style="text-align: center;">Ocena 1</th><th style="text-align: center;">Ocena 2</th><th style="text-align: center;">Ocena 3</th><th style="text-align: center;">Zaliczenie</th><th style="text-align: center;">Status</th></tr></thead><tbody><tr class="rule"><td colspan="9">&nbsp;</td></tr><tr><td>W</td><td>15</td><td> 1.00</td><td class="left"> dr inż. Ryszard Kawczyńsk</td><td><strong>3.0</strong><br><span style="font-size: 0.8em; font-style: italic;">2013-07-04</span></td><td><strong></strong><br><span style="font-size: 0.8em; font-style: italic;"></span></td><td><strong></strong><br><span style="font-size: 0.8em; font-style: italic;"></span></td><td><strong></strong><br><span style="font-size: 0.8em; font-style: italic;"></span></td><td style="font-style: italic;">zajęcia w toku</td></tr><tr><td class="downpad" colspan="9">&nbsp;</td></tr></tbody></table></div></td>');

$(".lcell:contains('Komputerowa analiza układów elektrycznych')").next('td').next('td').html('<strong>3.0</strong>');
$(".lcell:contains('Komputerowa analiza układów elektrycznych')").next('td').next('td').next('td').next('td').html('<nobr>2013-07-04</nobr>');
$(".lcell:contains('Komputerowa analiza układów elektrycznych')").parent('tr').next('tr').html('<td style="text-align: center;" colspan="6"><div style="display:none;border: 1px solid black; width: 95%; padding: 2px; margin: 4px auto;" id="cc3"><table cellspacing="0" cellpadding="0" style="width: 100%; margin-left: auto; margin-right: auto;" class="grid"><thead><tr><th style="text-align: center;">Forma</th><th style="text-align: center;">Godz.</th><th style="text-align: center;">Waga</th><th>Osoba wpisująca</th><th style="text-align: center;">Ocena 1</th><th style="text-align: center;">Ocena 2</th><th style="text-align: center;">Ocena 3</th><th style="text-align: center;">Zaliczenie</th><th style="text-align: center;">Status</th></tr></thead><tbody><tr class="rule"><td colspan="9">&nbsp;</td></tr><tr><td>W</td><td>15</td><td> 1.00</td><td class="left"> dr inż. Ryszard Kawczyńsk</td><td><strong>3.0</strong><br><span style="font-size: 0.8em; font-style: italic;">2013-07-04</span></td><td><strong></strong><br><span style="font-size: 0.8em; font-style: italic;"></span></td><td><strong></strong><br><span style="font-size: 0.8em; font-style: italic;"></span></td><td><strong></strong><br><span style="font-size: 0.8em; font-style: italic;"></span></td><td style="font-style: italic;">zajęcia w toku</td></tr><tr><td class="downpad" colspan="9">&nbsp;</td></tr></tbody></table></div></td>');

$(".lcell:contains('Komputerowe techniki pomiarowe')").next('td').next('td').html('<strong>3.0</strong>');
$(".lcell:contains('Komputerowe techniki pomiarowe')").next('td').next('td').next('td').next('td').html('<nobr>2013-07-04</nobr>');
$(".lcell:contains('Komputerowe techniki pomiarowe')").parent('tr').next('tr').html('<td style="text-align: center;" colspan="6"><div style="display:none;border: 1px solid black; width: 95%; padding: 2px; margin: 4px auto;" id="cc4"><table cellspacing="0" cellpadding="0" style="width: 100%; margin-left: auto; margin-right: auto;" class="grid"><thead><tr><th style="text-align: center;">Forma</th><th style="text-align: center;">Godz.</th><th style="text-align: center;">Waga</th><th>Osoba wpisująca</th><th style="text-align: center;">Ocena 1</th><th style="text-align: center;">Ocena 2</th><th style="text-align: center;">Ocena 3</th><th style="text-align: center;">Zaliczenie</th><th style="text-align: center;">Status</th></tr></thead><tbody><tr class="rule"><td colspan="9">&nbsp;</td></tr><tr><td>W</td><td>15</td><td> 1.00</td><td class="left"> dr inż. Ryszard Kawczyńsk</td><td><strong>3.0</strong><br><span style="font-size: 0.8em; font-style: italic;">2013-07-04</span></td><td><strong></strong><br><span style="font-size: 0.8em; font-style: italic;"></span></td><td><strong></strong><br><span style="font-size: 0.8em; font-style: italic;"></span></td><td><strong></strong><br><span style="font-size: 0.8em; font-style: italic;"></span></td><td style="font-style: italic;">zajęcia w toku</td></tr><tr><td class="downpad" colspan="9">&nbsp;</td></tr></tbody></table></div></td>');

$(".lcell:contains('Matematyka dyskretna')").next('td').next('td').html('<strong>4.0</strong>');
$(".lcell:contains('Matematyka dyskretna')").next('td').next('td').next('td').next('td').html('<nobr>2013-07-04</nobr>');
$(".lcell:contains('Matematyka dyskretna')").parent('tr').next('tr').html('<td style="text-align: center;" colspan="6"><div style="display:none;border: 1px solid black; width: 95%; padding: 2px; margin: 4px auto;" id="cc5"><table cellspacing="0" cellpadding="0" style="width: 100%; margin-left: auto; margin-right: auto;" class="grid"><thead><tr><th style="text-align: center;">Forma</th><th style="text-align: center;">Godz.</th><th style="text-align: center;">Waga</th><th>Osoba wpisująca</th><th style="text-align: center;">Ocena 1</th><th style="text-align: center;">Ocena 2</th><th style="text-align: center;">Ocena 3</th><th style="text-align: center;">Zaliczenie</th><th style="text-align: center;">Status</th></tr></thead><tbody><tr class="rule"><td colspan="9">&nbsp;</td></tr><tr><td>W</td><td>15</td><td> 1.00</td><td class="left"> dr inż. Ryszard Kawczyńsk</td><td><strong>4.0</strong><br><span style="font-size: 0.8em; font-style: italic;">2013-07-04</span></td><td><strong></strong><br><span style="font-size: 0.8em; font-style: italic;"></span></td><td><strong></strong><br><span style="font-size: 0.8em; font-style: italic;"></span></td><td><strong></strong><br><span style="font-size: 0.8em; font-style: italic;"></span></td><td style="font-style: italic;">zajęcia w toku</td></tr><tr><td class="downpad" colspan="9">&nbsp;</td></tr></tbody></table></div></td>');


$(".lcell:contains('Zarządzanie firmą')").next('td').next('td').html('<strong>3.5</strong>');
$(".lcell:contains('Zarządzanie firmą')").next('td').next('td').next('td').next('td').html('<nobr>2013-07-04</nobr>');
$(".lcell:contains('Zarządzanie firmą')").parent('tr').next('tr').html('<td style="text-align: center;" colspan="6"><div style="display:none;border: 1px solid black; width: 95%; padding: 2px; margin: 4px auto;" id="cc10"><table cellspacing="0" cellpadding="0" style="width: 100%; margin-left: auto; margin-right: auto;" class="grid"><thead><tr><th style="text-align: center;">Forma</th><th style="text-align: center;">Godz.</th><th style="text-align: center;">Waga</th><th>Osoba wpisująca</th><th style="text-align: center;">Ocena 1</th><th style="text-align: center;">Ocena 2</th><th style="text-align: center;">Ocena 3</th><th style="text-align: center;">Zaliczenie</th><th style="text-align: center;">Status</th></tr></thead><tbody><tr class="rule"><td colspan="9">&nbsp;</td></tr><tr><td>W</td><td>15</td><td> 1.00</td><td class="left"> dr inż. Ryszard Kawczyńsk</td><td><strong>3.5</strong><br><span style="font-size: 0.8em; font-style: italic;">2013-07-04</span></td><td><strong></strong><br><span style="font-size: 0.8em; font-style: italic;"></span></td><td><strong></strong><br><span style="font-size: 0.8em; font-style: italic;"></span></td><td><strong></strong><br><span style="font-size: 0.8em; font-style: italic;"></span></td><td style="font-style: italic;">zajęcia w toku</td></tr><tr><td class="downpad" colspan="9">&nbsp;</td></tr></tbody></table></div></td>');


});

