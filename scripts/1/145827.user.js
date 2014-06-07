// ==UserScript==
// @id             www.r-bloggers.com-710f92cb-f870-4fa0-afde-74fa79c5ae86@scriptish
// @name           R-bloggers redirecter
// @version        1.0
// @namespace      
// @author         Aleksandar Blagoti
// @description    Redirects to original blog post address
// @include        *.r-bloggers.com/*
// @run-at         document-end
// ==/UserScript==

var adr = window.location.href;
var re = /^https?:\/\/www\.r-bloggers.\com\/?$/i;
var link = document.querySelectorAll('div.entry strong:first-child > a');

if (!re.test(adr) && link.length) {
    window.location = link[0].href;
}