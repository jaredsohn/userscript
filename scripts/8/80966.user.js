// ==UserScript==
// @name           WordFilterByPass
// @namespace      http://userscripts.org/users/haxory
// @include        *forum.cheatengine.org/*
// ==/UserScript==

var filters = ['ENTER', 'ARRAY', 'OF', 'FILTERED', 'WORDS!'];
var postButton = document.forms.namedItem("post").elements.namedItem("post");
var postMessage = document.forms.namedItem("post").elements.namedItem("message");
function replaceBads(){
   for(x=0;x<filters.length;x++){
      doIt = filters[x];
      filteredWord = doIt.split('').join('[b][/b]');
      var re = new RegExp(doIt, 'gi');
      postMessage.value = postMessage.value.replace(re, filteredWord);
   }
}
postButton.addEventListener("click", replaceBads, true); 