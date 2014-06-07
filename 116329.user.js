// ==UserScript==
// @name           Facebook DeRedirect
// @version        1.0
// @description    Removes the redirects from Facebook
// @include        http://www.facebook.com/*
// @include        https://www.facebook.com/*
// @license Creative Commons CC BY-NC-SA 3.0
// ==/UserScript==

function addStyle(css) {
    var n = document.createElement("style");
    n.type = "text/css";
    n.textContent = css;
    document.head.appendChild(n);
}

function processLinks(links) {
    var lk, l = links.length;
    for (var i = 0; lk = links[i], i < l; i++) {
        if ((lk.outerHTML.indexOf("UntrustedLink.bootstrap")) != -1) {
            lk.removeAttribute("onmousedown");
            lk.className = "DeRedirectedLink";
        }
    }
};

addStyle("a.DeRedirectedLink:link {color: #7733FF;} a.DeRedirectedLink:visited {color: #776688;} a.DeRedirectedLink:hover {color: #FF3377;}");
processLinks(document.links);
document.addEventListener('DOMNodeInserted',
function(e) {
    var src = e.srcElement;
    if (src.nodeType == 1) processLinks(src.getElementsByTagName("a"));
    return true;
},
false);