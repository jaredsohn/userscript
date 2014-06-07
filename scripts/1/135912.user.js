// ==UserScript==
// @name        AutoDeploy
// @namespace   de.mobile.greasemonkey.autodeploy
// @include     http://autodeploy.corp.mobile.de/autodeploy/*
// @version     4
// @grant       none
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// ==/UserScript==

/* Fix for Greasemonkey 1.0 bug, see http://www.greasespot.net/2012/08/greasemonkey-10-jquery-broken-with.html */
this.$ = this.jQuery = jQuery.noConflict(true);

var queuesToDisplay = [
    "Integra203", "Integra205", "Integra209", "Production", "Staging", "VPS"
];

$(document).ready(function() {
    
    addFavicon("https://lh3.googleusercontent.com/-IV9w6hPVobU/T3v1VevXd_I/AAAAAAAAAZ8/kPZKTnMZsCQ/s32/custom-favicon_autodeploy.ico");
    
    /* hide all items from the queues menu except for those specified above */
    $(".queueContainer ul").children("li").each(function() {
        if ($(this).children("h2, strong").length > 0) return;
        var label = $(this).text().trim();
        if (jQuery.inArray(label, queuesToDisplay) < 0) $(this).remove();
    });
});


function addCss(css) {
    console.log("Greasemonkey script for AutoDeploy is adding CSS: " + css);
    var newCss = document.createElement("style");
    newCss.type = "text/css";
    newCss.innerHTML = css;
    $("head")[0].appendChild(newCss);
}

function addFavicon(url) {
    console.log("Greasemonkey script for AutoDeploy is adding Favicon: " + url);
    
    var link = document.createElement("link");
    link.type = "image/x-icon";
    link.rel = "shortcut icon";
    link.href = url;
    $("head")[0].appendChild(link);
}

