// ==UserScript==
// @name          addThisRemover
// @namespace     addthis
// @description   Removes the annoying AddThis bookmark div
// @include       *
// ==/UserScript==

var anchors = document.getElementsByTagName('a');
for (var i = 0; i <= anchors.length; i++) {
    var anchor = anchors[i];
    if (anchor != null && anchor != undefined) {
        if (anchor.href.indexOf("addthis") != -1) {
            var parent = anchor.parentNode;
            parent.parentNode.removeChild(parent);
        }
    }
}