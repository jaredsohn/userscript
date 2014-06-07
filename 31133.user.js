// ==UserScript==
// @name           BBC A-Z Search
// @namespace      http://www.bbc.co.uk/programmes
// @description    Search BBC programmes at www.bbc.co.uk/programmes/a-z
// @include        http://www.bbc.co.uk/*programmes/a-z*
// ==/UserScript==

(function() {
    var node, s, i;

    node = document.getElementById("blq-mast");
    node = node.getElementsByTagName("form")[0];
    s = window.location.pathname;
    i = s.indexOf("/by");
    if (i != -1) {
        s = s.substr(0, i);
    }
    node.setAttribute('action', s);
})();