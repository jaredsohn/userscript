// ==UserScript==
// @name        YlilautaBBCodeButtons
// @namespace   ylilautabbcodebuttons
// @description Lisää BBCode-painikkeet vanhaan ulkoasutyyliin
// @author      Frhoo
// @include     http://ylilauta.org/*
// @version     1.0
// ==/UserScript==

$(document).ready(function() {

$("textarea#msg").after("<div id=\"postbuttons\">\
<button type=\"button\" onclick=\"$('#msg').insertAtCaret('[b]','[/b]');\">Lihavointi</button>\
<button type=\"button\" onclick=\"$('#msg').insertAtCaret('[em]','[/em]');\">Kursivointi</button>\
<button type=\"button\" onclick=\"$('#msg').insertAtCaret('[s]','[/s]');\">Yliviivaus</button>\
<button type=\"button\" onclick=\"$('#msg').insertAtCaret('[u]','[/u]');\">Alleviivaus</button>\
<button type=\"button\" onclick=\"$('#msg').insertAtCaret('[o]','[/o]');\">Yliviivaus</button>\
<button type=\"button\" onclick=\"$('#msg').insertAtCaret('[spoiler]','[/spoiler]');\">Spoileri</button>\
<button type=\"button\" onclick=\"$('#msg').insertAtCaret('[big]','[/big]');\">Suuri</button>\
<button type=\"button\" onclick=\"$('#msg').insertAtCaret('[small]','[/small]');\">Pieni</button>\
<button type=\"button\" onclick=\"$('#msg').insertAtCaret('[shadow]','[/shadow]');\">Shadow</button>\
<button type=\"button\" onclick=\"$('#msg').insertAtCaret('[quote]','[/quote]');\">Quote</button>\
<button type=\"button\" onclick=\"$('#msg').insertAtCaret('[code]','[/code]');\">Koodi</button>\
<button type=\"button\" onclick=\"$('#msg').insertAtCaret('[sup]','[/sup]');\">Ylätunniste</button>\
<button type=\"button\" onclick=\"$('#msg').insertAtCaret('[sub]','[/sub]');\">Ylätunniste</button>\
<button type=\"button\" onclick=\"$('#colorbuttons').show(); $(this).hide();\">Värit</button>\
(<a href=\"//ylilauta.org/scripts/help.php?bbcode\" onclick=\"window.open(this.href,'bbcodehelp','width=640,height=480,scrollbars=yes'); return false;\">?</a>)\
<div id=\"colorbuttons\" style=\"display: none;\">\
<button type=\"button\" onclick=\"$('#msg').insertAtCaret('[green]','[/green]');\">Vihreä</button>\
<button type=\"button\" onclick=\"$('#msg').insertAtCaret('[blue]','[/blue]');\">Sininen</button>\
<button type=\"button\" onclick=\"$('#msg').insertAtCaret('[red]','[/red]');\">Punainen</button>\
<button type=\"button\" onclick=\"$('#msg').insertAtCaret('[pink]','[/pink]');\">Pinkki</button>\
<button type=\"button\" onclick=\"$('#msg').insertAtCaret('[yellow]','[/yellow]');\">Keltainen</button>\
<button type=\"button\" onclick=\"$('#msg').insertAtCaret('[black]','[/black]');\">Musta</button>\
<button type=\"button\" onclick=\"$('#msg').insertAtCaret('[gray]','[/gray]');\">Harmaa</button>\
<button type=\"button\" onclick=\"$('#msg').insertAtCaret('[white]','[/white]');\">Valkoinen</button>\
<button type=\"button\" onclick=\"$('#msg').insertAtCaret('[brown]','[/brown]');\">Ruskea</button>\
<button type=\"button\" onclick=\"$('#msg').insertAtCaret('[orange]','[/orange]');\">Oranssi</button>\
<button type=\"button\" onclick=\"$('#msg').insertAtCaret('[purple]','[/purple]');\">Liila</button>\
</div>")

});