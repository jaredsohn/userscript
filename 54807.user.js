// ==UserScript==
// @name           OnlineStreamRecorder: Frühestmögliche Startzeit als Standardzeit setzen
// @namespace      http://www.n-regen.bplaced.de
// @description    Stellt bei "Aufzeichnung starten am" die Zeit ein, die unter "Frühester Beginn" angegeben ist.
// @include        http://www.onlinetvrecorder.com/index.php?aktion=addstreams*
// ==/UserScript==

var ausdruck = /Frühstere Beginn: (\d{2})\.(\d{2})\.(\d{4}) (\d{2}):(\d{2}):(\d{2})/;
ausdruck.exec(document.forms[0].innerHTML);

document.forms[0].elements[2].value = RegExp.$1;
document.forms[0].elements[3].value = RegExp.$2;
document.forms[0].elements[4].value = RegExp.$3;
document.forms[0].elements[5].value = RegExp.$4;
document.forms[0].elements[6].value = RegExp.$5;
