// ==UserScript==
// @name        golem.de remove Adblock warning box
// @include		http://www.golem.de/*
// @version     1.0
// @run-at		document-end
// ==/UserScript==

/*
 Since not all elements are available at document-end I had to introduce a short delay.
 So you see the box for a short time ...
 Additionally the script is somehow called twice ...
*/

window.setTimeout(GM_removeAdblockHint, 50);

function GM_removeAdblockHint() {
    var _screen = document.getElementById("screen");
    if (_screen != null) {
        for (var i = 0; i < _screen.childNodes.length; i++) {
            var obj = _screen.childNodes[i];
            for (var j = 0; j < obj.childNodes.length; j++) {
                var obj2 = obj.childNodes[j];
                if (obj2.innerHTML != null && obj2.innerHTML.indexOf("Du benutzt einen Adblocker, weil") != -1) {
                    obj.parentNode.removeChild(obj);
                    return;
                }
            }
        }
    }
}