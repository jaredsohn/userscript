// ==UserScript==
// @name           Remove Wikipedia site notices
// @namespace      IWontDonateAnyways
// @include        http://*.wikipedia.org*
// @include        https://*.wikipedia.org*
// ==/UserScript==

// Extremely easy script, no need to take credit for it.


function exec(fn) {
    var script = document.createElement('script');
    script.setAttribute("type", "application/javascript");
    script.textContent = '(' + fn + ')();';
    document.body.appendChild(script);
    document.body.removeChild(script);
}

window.addEventListener("load", function() {
    // script injection
    exec(function() {
        hideBanner();
    });
}, false);


