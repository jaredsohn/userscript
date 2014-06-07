// ==UserScript==
// @name        edelvrouw
// @namespace   Edelvrouw
// @description Gemaakt door jeffrey
// @include     *.tribalwars.nl/*
// @version     1
// ==/UserScript==

textNodes = document.evaluate(
  "//text()",
  document,
  null,
  XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
  null);
var searchRE = new RegExp('Om meer edelmannen op te kunnen leiden, moet je  goudmunten slaan. Hoe meer goudmunten je hebt, hoe meer dorpen je kunt overnemen.','gi');
var replace = 'Hoe meer je er heb, hoe meer sexy edelvrouwen. Iedereen weet vrouwen houden van moneyz';
for (var i=0;i<textNodes.snapshotLength;i++) {
  var node = textNodes.snapshotItem(i);
  node.data = node.data.replace(searchRE, replace);
  }
  
  
textNodes = document.evaluate(
  "//text()",
  document,
  null,
  XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
  null);
var searchRE = new RegExp('edelmannen','gi');
var replace = 'sexy edelvrouwen';
for (var i=0;i<textNodes.snapshotLength;i++) {
  var node = textNodes.snapshotItem(i);
  node.data = node.data.replace(searchRE, replace);
  }
  
textNodes = document.evaluate(
  "//text()",
  document,
  null,
  XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
  null);
var searchRE = new RegExp('edelman','gi');
var replace = 'sexy edelvrouw';
for (var i=0;i<textNodes.snapshotLength;i++) {
  var node = textNodes.snapshotItem(i);
  node.data = node.data.replace(searchRE, replace);
  }
  
  