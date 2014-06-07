// ==UserScript==
// @name          Highlight certain links
// @namespace     http://websandbox.net/
// @description	  Highlight links containing certain words
// @include       *
// ==/UserScript==
// Author: jonnyq (jon@websandbox.net)

(function() {  

var words = new Array();
var bgColors = new Array();
var fgColors = new Array();

/* Add your own "words" to this "list", in the same format.  The next word would be 
 * words[2] = "some word or phrase" 
 * add more colors, too
 * if there is no color corresponding to the word (no bgColors[4] for words[4]) the first (bgColors[0]) will be used
 * The words are should be written in all caps, but the word matching is not case sensitive */
 
 
words[0] = "JONNYQ"; 
bgColors[0] = "green";
fgColors[0] = "white";


words[1] = "HAPPY";
bgColors[1] = "yellow";
fgColors[1] = "red";



 for(var i = 0; i < words.length; i++) { 
  var xpath = "//a[contains(translate(.,'abcdefghijklmnopqrstuvwxyz', 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'),'"+words[i]+"')]";
  var results = document.evaluate(xpath, document, null, XPathResult.UNORDERED_SNAPSHOT_TYPE, null);
  var items = new Array();
  var thisItem = results.iterateNext();
  while(thisItem) { items.push(thisItem); thisItem = results.iterateNext(); }

  for(var ii = 0; ii < items.length; ii++) {  
   items[ii].style.backgroundColor = bgColors[i]?bgColors[i]:bgColors[0];
   items[ii].style.color = fgColors[i]?fgColors[i]:fgColors[0];
  }  
 }

})()