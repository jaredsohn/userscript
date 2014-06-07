// B3ta Initial Posts
// v1 25 May 2005
// Post suggestions here: http://www.ianferguson.me.uk/greasemonkey.asp

// ==UserScript==

// @name        B3ta Initial Posts
// @namespace   http://www.ianferguson.me.uk/greasemonkey.asp
// @description Hides replies to posts on b3ta.com/board, so you can browse the initial picture posts only
// @include http://www.b3ta.com/*

// ==/UserScript==

(function() {
 var blah = window._content.document.getElementsByTagName("div");
 for (var blip = 0; blip < blah.length; blip++) {
  if (((blah[blip].className == "post1") || (blah[blip].className == "post2")) && (blah[blip].style.paddingLeft != "10px")) {
   blah[blip].style.display = "none";
  }
 }
})();