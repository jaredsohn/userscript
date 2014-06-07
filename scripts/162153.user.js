// ==UserScript==
// @name        Blokowanie handlu na gry-planszowe.pl
// @namespace   http://userscripts.org/users/509460
// @description Skrypt ukrywa 3 fora na stronie głównej forum gier planszowych
// @include     http://www.gry-planszowe.pl/forum/index.php
// @include     http://www.gry-planszowe.pl/forum/
// @version     1
// @grant       none
// ==/UserScript==

(function(){
var results =document.evaluate("//a[@href='./viewforum.php?f=45']", document, null,XPathResult.ANY_TYPE, null);
var resultNodes = [];
   var aResult;
   while (aResult = results.iterateNext()){resultNodes.push(aResult);} 
   for (var i in resultNodes) {
   resultNodes[i].parentNode.parentNode.parentNode.style.display = 'none';
      }
results =document.evaluate("//a[@href='./viewforum.php?f=10'] | //a[@href='./viewforum.php?f=34'] | //a[@href='./viewforum.php?f=47']", document, null,XPathResult.ANY_TYPE, null);
resultNodes = [];
   while (aResult = results.iterateNext()){resultNodes.push(aResult);} 
   for (var i in resultNodes) {
   resultNodes[i].parentNode.parentNode.style.display = 'none';
      }
})();