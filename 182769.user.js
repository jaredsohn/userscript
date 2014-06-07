// ==UserScript==
// @name        Remove Symbaloo Tooltips
// @namespace   http://userscripts.org/users/537209
// @description Remove annoying yellow tooltips on mouse over articles
// @include     http://www.symbaloo.com/
// @version     1
// @grant       none
// ==/UserScript==
var divs = document.getElementsByTagName("div");
for(i in divs) {
    if((divs[i].className).indexOf("smark") > -1) {
        divs[i].removeAttribute("title");
    }
}