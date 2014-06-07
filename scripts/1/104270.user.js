// ==UserScript==
// @name Sample
// @description Sample script
// ==/UserScript==

var fb = "facebook.com";
var top_loc = escape(window.top.location);
if(top_loc.match(fb)){
  alert("facebook! :D");
  document.body.style.backgroundImage = 'url("http://api.ning.com/files/4PXYW7u1TvWg5C18nn*Png9ny5vzfzV-hWE9qYJGGBX2*QgMeoN8j7EzD7jjGcmzjyB5WZaDlAhpOp6wdHBqZuKkSAihkhXc/star_tile.gif")';
  alert("Done");
}