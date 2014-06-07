// ==UserScript==
// @name        SPIEGEL ONLINE remove Adblock warning box
// @include	http://www.spiegel.de/*
// @version     1.1
// @run-at	document-end
// ==/UserScript==

/*
 Since not all elements are available at document-end I had to introduce a short delay.
 So you see the box for a short time ...
 Additionally the script is somehow called twice ...
*/

window.setTimeout(GM_removeAdblockHint, 50);

function GM_removeAdblockHint() {
    var spWrapper = document.getElementById("spWrapper");
    if (spWrapper != null) {
        for (var i = 0; i < spWrapper.childNodes.length; i++) {
            var obj = spWrapper.childNodes[i];
            if (obj.innerHTML != null && obj.innerHTML.indexOf("deshalb, auf Adblocker zu") != -1) {
                obj.parentNode.removeChild(obj);
                break;
            }
        }
    }
}