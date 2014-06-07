// ==UserScript==
// @name        sueddeutsche.de remove Adblock warning box
// @include		http://www.sueddeutsche.de/*
// @version     1.0
// @run-at		document-end
// ==/UserScript==

/*
 Since not all elements are available at document-end I had to introduce a short delay.
 So you may see the box for a short time ...
 Additionally the script is somehow called twice ...
*/

window.setTimeout(GM_removeAdblockHint, 0);

function GM_removeAdblockHint() {
    for (var i = 0; i < document.body.childNodes.length; i++) {
        var obj = document.body.childNodes[i];
        if (obj.tagName.toLowerCase() == "div") {
            for (var j = 0; j < obj.childNodes.length; j++) {
                var obj2 = obj.childNodes[j];
                if (obj2.innerHTML != null && obj2.innerHTML.indexOf("Leider benutzen Sie einen Adblocker,")) {
                    obj.parentNode.removeChild(obj);
                    return;
                }
            }
        }
    }
}