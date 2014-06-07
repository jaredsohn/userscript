// ==UserScript==
// @name           baidu_ad_killer
// @namespace      http://hi.baidu.com/skyperson
// @description    del Baidu's Ad and set size:780
// @include        http://*.baidu.com/*
// ==/UserScript==

(function(){
	var allDivs, thisDiv; 
allDivs = document.evaluate(
     "//table[@align='right']",
          document,
          null,
          XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
          null);
for (var i = 0; i < allDivs.snapshotLength; i++) {
     thisDiv = allDivs.snapshotItem(i);
         thisDiv.innerHTML="";
          }
})();

(function(){
	var allDivs, thisDiv; 
allDivs = document.evaluate(
     "//td[@class='f' or @class='r']",
          document,
          null,
          XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
          null);
for (var i = 0; i < allDivs.snapshotLength; i++) {
     thisDiv = allDivs.snapshotItem(i);
         thisDiv.style.width="1024px";
          }
})();