// installCount
// by psyched 07
// ==UserScript==
// @name           installCount
// @namespace      http://userscripts.org/users/33515;scripts
// @description    Tells you how many installs you have altogether
// @include        http://userscripts.org/users/*/scripts
// ==/UserScript==


var count = 0;
var td = document.getElementsByTagName("td");
for (var i=0; i<td.length; i++) {
  if (td[i].className == "script-meat") {
    var installs = Number(td[i].parentNode.childNodes[7].innerHTML);
    count += installs
  }
}

document.getElementsByTagName("p")[0].appendChild(document.createTextNode(" - total installs: "+count));