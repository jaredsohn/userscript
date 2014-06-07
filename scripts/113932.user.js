// ==UserScript==
// @name           Fix giant block on eltiempo.es
// @namespace      eltiempo.es
// @description    Fix the giant block on eltiempo.es
// @include        http://www.eltiempo.es/madrid.html
// ==/UserScript==

// only needed when javascript is disabled...
var tds = document.getElementsByTagName("td");
for (var i = 0, j = tds.length; i < j; i++) {
    var td = tds[i];
    if (td.className === "weather current") {
        var childDiv = document.getElementById("current-conditions");
        td.removeChild(childDiv);
        break;
    }
}

