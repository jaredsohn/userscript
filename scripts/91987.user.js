// ==UserScript==
// @name          XTube - Instant Subscribe
// @namespace     http://www.xtube.com/
// @description	  Changes "Subscribe" links to subscribe immediately, rather than requiring a second click on the Subscriptions screen
// @include       http*://*.xtube.com/*
// @version       0.3
// ==/UserScript==

(function() {
var links = document.getElementsByTagName("a");
for (var i = 0; i < links.length; ++i) {
    var href = links[i].href;
    if (href.indexOf("xtube.com/subscription.php") > 0 &&
        href.indexOf("field_subscribe_user_id=") > 0 &&
        href.indexOf("act=") < 0) {

        links[i].href += "&act=Subscribe";
    }
}
})();
