// ==UserScript==
// @name           Ubuntu.com: Skip the awful begging for money page
// @version        1.0
// @include        http://www.ubuntu.com/download/*
// ==/UserScript==

var beg = document.evaluate('//a[@class="skip"]', document, null, 9, null).singleNodeValue;
window.location.replace(beg.href);