// ==UserScript==
// @id             lauren.kinja.com-5f3f0740-d544-4518-8686-9a31ff6108c4@whirlpool
// @name           Redirect lauren.kinja.com pages to the first link
// @version        1.0
// @namespace      kinja
// @author         Yansky
// @description    Redirect lauren.kinja.com pages to the first link
// @include        http://lauren.kinja.com/*
// @include        https://lauren.kinja.com/*
// @run-at         document-end
// ==/UserScript==

window.location.href = document.querySelector('p.first-text a').href;