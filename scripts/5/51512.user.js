// ==UserScript==
// @name           mangaupdates
// @namespace      mangaupdates
// @include        http://www.mangaupdates.com/*
// @exclude        http://www.mangaupdates.com/
// @exclude        http://www.mangaupdates.com/index.html
// ==/UserScript==

//for mangaupdates.com (does not modify home page ("News" link) so you can login, view poll results, etc)

//only tested with firefox (and only like to work with)

// shorten the <title> tag so it only displays useful stuff (remove name of site when useful)
document.title = document.title.substring(21);

//maximize the document...
var x = document.styleSheets[0];
x.insertRule('#centered {width: 99%}',x.cssRules.length);

try {
var x = document.styleSheets[1];
x.insertRule('.frow {width: 99%}',x.cssRules.length);
} catch(e) {}

var z = document.getElementById("list_table");
if (z) { z.setAttribute("width","100%"); }

var x = document.getElementsByClassName('left_content')[0];
var y = document.getElementsByClassName('left_content')[1];
x.parentNode.removeChild(x);
x = document.getElementById('banner');
x = x.parentNode;
x.parentNode.removeChild(x);
x = document.getElementById('login');
x = x.parentNode;
x = x.parentNode;
x.parentNode.removeChild(x);
x = document.getElementById('center_row1');
x.parentNode.removeChild(x);
x = y.parentNode;
x = x.parentNode;
x = x.parentNode;
x = x.parentNode;
x.parentNode.removeChild(x);
var z = document.getElementById('main_content');
z=z.childNodes[7];
z=z.childNodes[1];
z.setAttribute("style", "width: 100%;"); 

var x = document.getElementsByClassName('alt');
for (var y in x) {
x[y].childNodes[1].setAttribute("style", "width: 100%;");
}