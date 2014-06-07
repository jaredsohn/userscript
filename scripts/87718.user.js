// ==UserScript==
// @name          Facebook Link Rewriter
// @author        Dan Rasmussen (dan.rasmussen@gmail.com)
// @provided by   Dan Rasmussen
// @description	  Modify links in Facebook to bypass redirect (http://www.facebook.com/l.php?u=http%3A%2F%2Fwww.worldfoodfestival.org%2F&h=66028 becomes http://www.worldfoodfestival.org/). This speeds up page loads and shares less of your information with Facebook.
// @include       *facebook.com*
// ==/UserScript==

// Thanks to the fellows at http://userscripts.org/topics/1340 for this solution!
for(var i=0; i < document.links.length; i++){
  document.links[i].removeAttribute('onmousedown');
}



