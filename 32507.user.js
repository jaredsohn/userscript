// ==UserScript==
// @name           Reparandor de cajas en Vagos
// @description    Repara el problema entre Firefox y las cajas de links en Vagos
// @version        1.0
// @author         s0b
// @include        http://vagos.wamba.com/*
// ==/UserScript==

var todosa, estea, todospre, estepre, estepre2;

todosa = document.evaluate(
    "//a[@ondblclick]",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

todospre = document.evaluate(
    "//pre[@class='alt2']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
    
for (var i = 0; i < todosa.snapshotLength; i++) {
    estea = todosa.snapshotItem(i);
    estepre = todospre.snapshotItem(i);
  
  	estepre2 = document.createElement("div");
	estepre2.appendChild(estepre);
    estea.parentNode.insertBefore(estepre2, estea);

    estea.parentNode.removeChild(estea);
}