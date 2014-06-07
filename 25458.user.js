// ==UserScript==
// @name           Odreklamovac
// @namespace      http://dobryobchod.com
// @description    Pri tlaceni referatov odstrani reklamu zhora aj z dola z tlaceneho materialu, ako sa na slusnu webstranku patri.
// @include        http://referaty.atlas.sk/prakticke-pomocky/tahaky/*/?print=1
// ==/UserScript==

tabulky = document.getElementsByTagName('table');
tabulka = tabulky[0];
document.body.removeChild(tabulka);
kecyObal = document.getElementsByTagName('tr');
kecy = document.getElementsByTagName('td');
kecyObal[6].removeChild(kecy[6]);
kecyObal[5].removeChild(kecy[5]);
