// ==UserScript==
// @name           P&T - Eingabefelder vormarkieren
// @namespace      P&T-Tools
// @description    Markiert die Eingabefelder vor
// @include        http://www.producers-and-traders.de/index.php?section=a&section2=b*
// @include        http://www.producers-and-traders.de/index.php?section=a&section2=i*

// ==/UserScript==


    var select = document.getElementsByName("MA")[0] || document.getElementsByName("ma")[0] || document.getElementsByName("Preis")[0];
    select.select();