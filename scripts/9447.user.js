// ==UserScript==
// @name           CProxy Demo: reload page on CProxy servers overload
// @namespace      http://tntlab.com/mozilla/greasemonkey/
// @description    CProxy Demo: reload page on CProxy servers overload
// @include        *
// ==/UserScript==

(function() {
    var timeout = 5 * 1000; // In ms
    var msg1 = "CPROXY: Sorry, our server is overloaded now. DEMO version is not available at the moment, please try again later.";
    var msg2snippet = "DEMO version is not available now.";

    var tags_title = document.getElementsByTagName('title');
    for (var i = 0 ; i < tags_title.length ; i++) {
        var title = tags_title[i];
        if (!title.text.match(/^CPROXY$/) && !title.text.match(/^CPROXY notice$/)) continue;

        if (document.body.innerHTML == msg1 || document.body.innerHTML.indexOf(msg2snippet) >= 0) {
            (unsafeWindow || window.wrappedJSObject || window).setTimeout(function() { location.reload(true) }, timeout);
        }
        break;
    }
})();
