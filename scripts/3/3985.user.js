// Chowhound Browse
// version .9
// 2006-5-01
// Copyright (c) 2006, Paul Trapani
//
// 2006-05-01 Changed 
//
// ---------------------------------------
//
// ==UserScript==
// @name	Chowhound Browse
// @description	Simplify chowhound viewing	
// @include 	http://www.chowhound.com/boards/*
// @include		http://www.chowhound.com/*/boards/*
// @exclude		http://www.chowhound.com/boards/*/messages/*
// @exclude		http://www.chowhound.com/*/boards/*/messages/*
// @exclude     http://www.chowhound.com/boards/boards.html
//==/UserScript==

//dummy listener so that page finishes loading first
window.addEventListener( 
   'load',
    function() {  },
    true);

//remove all subthreads (all child ul's)
var allNodes, thisNode;
allNodes = document.evaluate(
    '//UL//ul',
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allNodes.snapshotLength; i++) {
    thisNode = allNodes.snapshotItem(i);
    thisNode.parentNode.removeChild(thisNode);
    }
 
  

