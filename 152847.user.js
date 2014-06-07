// ==UserScript==
// @name           AllQuests: automatically redirect to source page
// @version        1.0
// @include        http://www.allquests.com/question/*
// @include        http://allquests.com/question/*
// ==/UserScript==

var sourcerdr = document.evaluate('//a[@class="smenutop" and contains(@href, "http") and @target="_blank"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
window.location.replace(sourcerdr.href);