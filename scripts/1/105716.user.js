// ==UserScript==
// @name           Facepunch - Cloudfresh
// @namespace      http://www.facepunch.com/
// @include        *facepunch.com/*
// ==/UserScript==
if (typeof(google) == 'undefined') {
    ChromeKludge(unsafeWindow.jQuery);
}
else {
    // http://stackoverflow.com/questions/2303147/injecting-js-functions-into-the-page-from-a-greasemonkey-script-on-chrome
    var script = document.createElement('script');
    script.appendChild(document.createTextNode('(' + ChromeKludge + ')(jQuery);'));
    document.head.appendChild(script);
}
function ChromeKludge($) {
    window.setTimeout(function() { if (/CloudFlare/.test(document.title)) { window.location.reload() } }, 2000);
}