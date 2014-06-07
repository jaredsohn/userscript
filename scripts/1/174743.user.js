// ==UserScript==
// @name          @InoReader: Drop Logo
// @namespace     http://userstyles.org
// @description	  Drop InoReader Logo on the left up side
// @author        raymond.hjm@gmail.com
// @version       1.0.0
// @include       http://inoreader.com/*
// @include       https://inoreader.com/*
// @include       http://*.inoreader.com/*
// @include       https://*.inoreader.com/*
// @run-at        document-end
// ==/UserScript==
(function() {
    var got = document.evaluate('//div[@id="subscriptions_nav"]//img', document, null, 5, null);
    var elem = got.iterateNext();
    elem.parentNode.removeChild(elem);
})();
