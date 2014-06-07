// ==UserScript==
// @name          Dynamic Facebook Link Rewriter
// @author        Frankie Robertson
// @provided by   Frankie Robertson
// @description	  Modify links in Facebook to bypass redirect.
// @include       *facebook.com*
// ==/UserScript==

function clean_tree(tree) {
    var newlinks = tree.getElementsByTagName('a')
    for (var i=0;i<newlinks.length;i++) {
        if (newlinks[i].onmousedown &&
            /UntrustedLink.bootstrap/.test(newlinks[i].onmousedown.toString())) {
            newlinks[i].removeAttribute('onmousedown');
        }
    }
}
var root = document.getElementsByTagName('html')[0];
root.addEventListener('DOMSubtreeModified', function(evt) {
    if (evt.srcElement.nodeType == 1) {
        clean_tree(evt.srcElement);
    }
}, false);
clean_tree(root);
