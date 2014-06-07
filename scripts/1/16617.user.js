// ==UserScript==
// @name           stchülervz neuigkeiten und telegramm remover moded
// @description    Entfernt den Neuigkeiten Block bei studivz
// @include        http://www.studivz.net/*
// ==/UserScript==
 (function() {
var patterns = new Array(
     "//table[contains(tbody/tr/td/h2,'Telegramm')]",
     "//tr[contains(td/h2,'Neuigkeiten')]",
     "//div[starts-with(@class,'yahoo')]",
     "//div[starts-with(@id,'yahoo')]",
     "//div[starts-with(@class,'yahoo_leftnav')]",
     );

 var results;
 for (var i = 0; i < patterns.length; i++) {
   results = document.evaluate(patterns[i], document, null,
   XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for (var j = 0; j < results.snapshotLength; j++) {
    results.snapshotItem(j).style.display = "none";
    }
 }
 })();
