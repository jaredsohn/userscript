// ==UserScript==
// @name           TrocaHTTPporHTTPS
// @namespace      http://userscripts.org/scripts/show/77703
// @description    [PT] Troca o protocolo 'http' por 'https' (seguro).
// @include        http://*
// ==/UserScript==

(function() {
    var url = window.location.href;

    if (url.indexOf("http:")==0) {
        window.location.replace(location.href.replace(location.protocol, "https:"));
    }

    if (url.indexOf("https:")==0) {
        for (var i=0,link; (link=document.links[i]); i++) {
            if (link.href.indexOf("http:")==0) link.href = link.href.replace(location.protocol, "https:");
        }
    }

}
)();