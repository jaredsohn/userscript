// ==UserScript==
// @name       L33T userbar legion replacement
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  enter something useful
// @match      http://*www.hackforums.net*
// @copyright  2012+, You
// ==/UserScript==

var ilist = document.images;
for(var i = 0; i < ilist.length; i++) {
    if(ilist[i].src == "http://cdn2.hackforums.net/images/blackreign/logo.jpg") {
         ilist[i].src = "";
    }
}