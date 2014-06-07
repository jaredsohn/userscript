// Google Cache Redirect Remover
// GNU General Public License

// ==UserScript==
// @name           Google Cache Redirect Remover
// @namespace      http://qixinglu.com
// @description    Removes the Google redirect in cached links
// @include        http://www.google.*/search?*
// @include        https://encrypted.google.*/search?*
// ==/UserScript==

var USE_HTTPS = true;
var REMOVE_SEARCH_LINKS = false;
var APPEND_SEARCH_LINKS = false;

var snapshotLinksNode = document.getElementsByClassName("gl");
for (var i = 0; i < snapshotLinksNode.length; i++) {
    try {
        var linkNode = snapshotLinksNode[i].childNodes[0];
        linkNode.removeAttribute("onmousedown");
        if (USE_HTTPS) {
            linkNode.href = linkNode.href.replace("http://", "https://");
        }
    } catch (e) {
        continue;
    }
}

var previewLinksNode = document.getElementsByClassName("f");
for (var i = 0; i < previewLinksNode.length; i++) {
    try {
        var linkNode = previewLinksNode[i].nextElementSibling;
        linkNode.removeAttribute("onmousedown");
        if (USE_HTTPS) {
            linkNode.href = linkNode.href.replace("http://", "https://");
        }
    } catch (e) {
        continue;
    }
}

if (REMOVE_SEARCH_LINKS) {
    var searchLinksNode = document.getElementsByClassName("l");
    for (var i = 0; i < searchLinksNode.length; i++) {
        try {
            var linkNode = searchLinksNode[i];
            linkNode.removeAttribute("onmousedown");
        } catch (e) {
            continue;
        }
    }
}

if (APPEND_SEARCH_LINKS) {
    var searchLinksNode = document.getElementsByClassName("l");
    for (var i = 0; i < searchLinksNode.length; i++) {
        try {
            var linkNode = searchLinksNode[i];
            var newLinkNode = document.createElement("a");
            newLinkNode.href = linkNode.href;
            newLinkNode.textContent = "SourceLink";
            if (document.location.href.indexOf('https') == 0) {
                var additionLinkNodes = linkNode.parentNode.parentNode.getElementsByClassName("gl");
            } else {
                var additionLinkNodes = linkNode.parentNode.parentNode.parentNode.getElementsByClassName("gl");
            }
            for (var j = 0; j < additionLinkNodes.length; j++) {
                try {
                    var snapshotLinkNode = additionLinkNodes[j].firstChild;
                    if (snapshotLinkNode.href.indexOf("webcache.googleusercontent.com") != -1) {
                        var additionLinkNode = snapshotLinkNode.parentNode;
                        additionLinkNode.appendChild(document.createTextNode(" - "));
                        additionLinkNode.appendChild(newLinkNode);
                    }
                } catch (e) {
                    continue;
                }
            }
        } catch (e) {
            continue;
        }
    }
}
