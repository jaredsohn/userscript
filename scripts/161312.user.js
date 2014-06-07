// ==UserScript==
// @name       Restoring Old Youtube Subscription
// @namespace  http://userscripts.org/users/nikamura
// @version    1.4
// @description  Restoring youtube subscription to the old version.
// @include    http*://*youtube.com/*
// @copyright  2012+, Nikamura
// ==/UserScript==

function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "window.jQ=jQuery.noConflict(true);(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}
function main() {
  // Note, jQ replaces $ to avoid conflicts
  jQ("a[href='/feed/subscriptions']").attr('href', '/my_subscriptions')
}

addJQuery(main)