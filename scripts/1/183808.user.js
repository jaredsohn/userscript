// ==UserScript==
// @name           Rutor.Org Highlighter
// @include        *rutor.org/*
// @run-at         window-load
// ==/UserScript==

allElements = document.evaluate('.//a', document.body, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = 0; i < allElements.snapshotLength; i++) {
 thisElement = allElements.snapshotItem(i);
 if(thisElement.innerHTML.search(/2011/i)>0) {
   with(thisElement.style){
     color="#4682B4"; //SteelBlue
     fontWeight="bold";
   }
 }
 if(thisElement.innerHTML.search(/2012/i)>0) {
   with(thisElement.style){
     color="#191970"; //MidnightBlue
     fontWeight="bold";
   }
 }
 if(thisElement.innerHTML.search(/2013/i)>0) {
   with(thisElement.style){
     color="#8B0000"; //DarkRed
     fontWeight="bolder";
   }
 }
 if(thisElement.innerHTML.search(/2014/i)>0) {
   with(thisElement.style){
     color="#D90000"; //PureRed
     fontWeight="bolder";
   }
 }
}

// ==/UserScript==