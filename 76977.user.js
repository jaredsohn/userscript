// ==UserScript==
// @name           google wider
// @namespace      jerkface.net
// @description    remove the new left/right columns from google search results
// @include        http://www.google.com/search*
// @include        http://www.google.com/images*
// ==/UserScript==

var center_col = document.getElementById('center_col');
var res = document.getElementById('res');
if (res && center_col) {
  center_col.parentNode.replaceChild(res, center_col);
}

var divs = document.getElementsByTagName('div');
for (var i=0; i<divs.length; ++i) {
  if (divs[i].getAttribute('class') == 's') {
    divs[i].setAttribute('class', '');
  }
}
