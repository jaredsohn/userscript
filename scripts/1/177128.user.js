// ==UserScript==
// @name        Dragcave Easter eggs
// @namespace   http://localhost
// @description Lazy Easter FTW!
// @include     http://dragcave.net/
// @version     1
// @grant	none
// ==/UserScript==

var anchors = document.getElementsByTagName("a");
var length = anchors.length;
for (var j = 0; j < length; j++) {
    var anchor = anchors[j];
    if (ContainsString(anchor.href, "http://dragcave.net/easterget")) {
            open_in_new_tab(anchor.href);
    }
}

setTimeout(function () { window.location.href = window.location.href }, 10000);

function ContainsString(text, containsString) {
    if (text.indexOf(containsString) != -1) {
        return true;
    }
    else {
        return false;
    }
}

function open_in_new_tab(url )
{
  var win=window.open(url, '_blank');
  win.focus();
}