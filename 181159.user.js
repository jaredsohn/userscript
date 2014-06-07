// ==UserScript==
// @name       transformURL
// @match      *://*/*
// ==/UserScript==

document.addEventListener('DOMContentLoaded', function () {
    String.prototype.generateTagA = function () {
        var pattern = /\b(([a-zA-Z0-9]+:\/\/)|magnet:\?)\S+/g,
            ret = this;
        ret = ret.replace(pattern, '<a href="$&" target="_blank">$&</a>');
        return ret;
    };
    function transformURL(element) {
        var i, span;
        if (element.nodeName.toLowerCase() === 'script' || element.nodeName.toLowerCase() === 'style' || element.nodeName.toLowerCase() === 'noscript' || element.nodeName.toLowerCase() === 'a') {
            return;
        }
        if (element.childNodes.length != 0) {
            for (i = 0; i < element.childNodes.length; i++) {
                transformURL(element.childNodes[i]);
            }
        } else {
            switch (element.nodeType) {
                case 3:
                    span = document.createElement('span');
                    if (element.nodeValue.generateTagA() != element.nodeValue) {
                        span.innerHTML = element.nodeValue.generateTagA();
                        element.parentNode.replaceChild(span, element);
                    }
                    break;
            }
        }
    }
    var i;
    for (i = 0; i < document.children[0].children.length; i++) {
        if (document.children[0].children[i].nodeName.toLowerCase() === 'body') {
            transformURL(document.children[0].children[i]);
        }
    }
}, false);
