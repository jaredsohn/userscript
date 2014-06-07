// ==UserScript==
// @name           Kapiland-IGM-Signatur
// @author         Morgil/Jonas Böer
// @namespace      http://www.morgil.de
// @description    Automatisches Einfügen der IGM-Signatur
// @include        http://*kapiland*main.php4?page=nachricht&UIN=*
// @include        http://*kapiland*main.php4?page=nachricht3&UIN=*
// ==/UserScript==

function set() {
 GM_setValue("signatur", window.prompt("Bitte gibt hier deine Signatur ein (\\n erzeugt einen Zeilenumbruch, %firma% wird durch deinen Firmennamen ersetzt)", GM_getValue("signatur")));
}
if(GM_getValue("signatur", "leer") == "leer") {
 set();
 location.reload();
}
GM_registerMenuCommand("Kapiland: IGM-Signatur einstellen", set);
var feld = document.getElementsByTagName("textarea")[0];
var fname = document.getElementsByTagName("b")[0].innerHTML;
sig = GM_getValue("signatur");
sig = sig.replace(/\%firma\%/, fname);
sig = sig.replace(/\\n/g, "\n");
feld.value = sig;