// ==UserScript==
// @name          Wedos vypis domen
// @namespace     wedos.local
// @description   Odstrani pevnou vysku a sirku vypisu domen
// @include       https://client.wedos.com/domain/*
// @version       0.0.2
// @run-at        document-end
// ==/UserScript==

// <div class="list_data" style="width: 850px; height: 400px;">
var elemDataResize = document.evaluate('//div[@class="list_data"]',
    document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
if (elemDataResize) {
    elemDataResize.style.width='';
    elemDataResize.style.height='';
}
