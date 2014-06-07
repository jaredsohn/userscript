// ==UserScript==
// @name           ExpandSpiegel
// @description    Removes right column on Spiegel.de and expands left one

// @include        http://www.spiegel.de/politik/*
// @include        http://www.spiegel.de/wirtschaft/*
// @include        http://www.spiegel.de/panorama/*
// @include        http://www.spiegel.de/sport/*
// @include        http://www.spiegel.de/kultur/*
// @include        http://www.spiegel.de/netzwelt/*
// @include        http://www.spiegel.de/wissenschaft/*
// @include        http://www.spiegel.de/unispiegel/*
// @include        http://www.spiegel.de/reise/*
// @include        http://www.spiegel.de/auto/*

// ==/UserScript==

var mustPerish = document.evaluate("//table[@width='344']",
                  document,
                  null,
                  XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
                  null);
                  
var mustGrow = document.evaluate("//table[@width='420']",
                  document,
                  null,
                  XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
                  null);                  
                 
var myVar;

if (mustPerish) {
  for (var i = 0; i < mustPerish.snapshotLength; i++) {
    myVar = mustPerish.snapshotItem(i);    
    myVar.parentNode.removeChild(myVar);
  }
} 

if (mustGrow) {
  for (var i = 0; i < mustGrow.snapshotLength; i++) {
    myVar = mustGrow.snapshotItem(i);    
    myVar.setAttribute('width','800');
  }
} 