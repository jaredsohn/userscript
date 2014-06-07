// ==UserScript==
// @name           IT2 - Werbung TV/7Tage
// @namespace      de
// @description    Setzt Werte beim Starten neuer Werbekampagnen auf gewünschte Werte
// @include        http://www.itycoon2.de/marketing/step2/*

// @author         patschius
// @version        0.1
// @date           10-12-2011
// ==/UserScript==

//Value auf die ID deiner Marke setzen.
//Die ID findest du wenn du die Markeninformation einer Marke öffnest in der URL:
//z.B.: http://www.itycoon2.de/label/statistics/XXX -> XXX
//Nach dem Ausfüllen aktivieren durch entfernen der //

//Marke auf XXX setzen
//document.getElementById('marketing_label_id').value = "XXX"; 

//Mßnahme auf TV setzen
document.getElementById('marketing_marketing_type_id').value = "6"; 

//Mßnahme auf 7 Tage setzen
document.getElementById('marketing_duration').value = "7";