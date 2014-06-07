// ==UserScript==
// @name           Cinestar Reservierungs Bypass
// @namespace      http://example.org/cinestar
// @description    Erlaubt Reservierungen auch wenn diese normalerweise nicht möglich wären
// @include        http://*-ticket.global-ticketing.com/gt/selectseats?*
// @include        http://*-ticket.global-ticketing.com/gt/placement?*
// ==/UserScript==
var form = document.getElementsByTagName('form')[0];
var div = form.getElementsByTagName('div')[21];
if (div.innerHTML.indexOf('keine') != -1) {
div.innerHTML = '<font color="#ff0000" style="font-size:10px;font-weight:bold;">BYPASSED</font><br><font face="Arial" color="#9a302e" size="-1" style="font-size: 10px;">Ich möchte nur reservieren und hole die Karten spätestens 30 Minuten vor Beginn ab.<br></font><input type="submit" value="Reservieren" style="" name="ReserveTickets" class="sbt">';
}