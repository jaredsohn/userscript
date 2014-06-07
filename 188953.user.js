// ==UserScript==
// @id             com.superbetter.forums.NoHTTPS
// @name           No HTTPS for SuperBetter Forums
// @version        1.0
// @namespace      http://www.thzinc.com
// @author         Daniel James
// @description    A not-great workaround for the SuperBetter Forums that currently have a revoked SSL certificate.
// @include        http://forums.superbetter.com/*
// @run-at         document-end
// ==/UserScript==

(function() {
    var elements = document.querySelectorAll("base, script, link, img, a");
    var i, il;
    for (i = 0, il = elements.length; i < il; i++) {
        var element = elements[i];
        if (element.href) element.href = element.href.replace("https", "http");
        if (element.src) element.src = element.src.replace("https", "http");
    }
}());