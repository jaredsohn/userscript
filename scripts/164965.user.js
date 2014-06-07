// ==UserScript==
// @name zmieniacz_sprzedawcow
// @description Zmienia wykropkowane nazwy na wlasciwe
// @include http://*
// @include https://*
// @exclude http://tradewatch.pl/*
// @copyright inco
// @version 0,1
// @license brak
// @require brak
// ==/UserScript==

var textnodes, node, s;
   
textnodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i = 0; i < textnodes.snapshotLength; i++) {
   node = textnodes.snapshotItem(i);
   s = node.data;
   s = s.replace('C**********a', 'Czysta_Plyta');
   node.data = s;
}