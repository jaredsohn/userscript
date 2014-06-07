// ==UserScript==
// @name           durl AutoProceed
// @namespace      http://jihoonc.pe.kr/gm/durl_autoproceed
// @description    Bypass durl.kr's snapshot page and proceed to site automatically
// @include        http://durl.kr/*
// @include        http://durl.me/*
// @exclude        http://durl.kr
// @exclude        http://durl.me
// ==/UserScript==

durl_autoproceed = {
    init: function() {
        var sitelink = document.getElementById("thumbArea");

        window.location.href = sitelink.href;
    }
}

durl_autoproceed.init();
