// ==UserScript==
// @run-at        document-start
// @name          Hide Tactical Info
// @namespace     hti
// @description	  Скрывает информацию о тактическом отступлении в боевых докладах
// @version       2.0.1
// @updateURL     http://userscripts.org/scripts/source/130056.meta.js
// @installURL    http://userscripts.org/scripts/source/130056.user.js
// @downloadURL   http://userscripts.org/scripts/source/130056.user.js
// @author        Demien
// @include       http://uni*.ogame.*/game/index.php?page=messages*
// @grant         none

// ==/UserScript==

var _hide_tactical_ = document.createElement("style");
_hide_tactical_.setAttribute("type", "text/css");
_hide_tactical_.textContent = "#shortreport #retreatText span, #shortreport .retreatText span { display: none !important; }";
_hide_tactical_.textContent += "#shortreport .retreatText { height: 0; !important; }";
_hide_tactical_.textContent += "#shortreport div.winner { margin-bottom: 0; }";
document.head.appendChild(_hide_tactical_);