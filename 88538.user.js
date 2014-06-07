// ==UserScript==
// @name           Mincommsy to HTTPS
// @description    Always switch mincommsy to https
// @include        http://www.mincommsy.uni-hamburg.de/*
// ==/UserScript==

(
function() {
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