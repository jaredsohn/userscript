// ==UserScript==
// @name        Patrick's Little Helper
// @namespace   de.mobile.greasemonkey.jenkins.patrick
// @description Anpassungen für Patricks lokalen Jenkins
// @include     http://localhost:8081/*
// @version     3
// @grant       none
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// ==/UserScript==

/* ===============
 * Version History
 * ===============
 *
 * v3, 2013-01-02 - changed URLs of links on custom icons to trigger builds instead of displaying build info;
 *                  changed watermark background to "Pimp My Ride" logo
 *                  removed console log statements
 * v4, 2013-02-22 - click on custom icon triggers build by Ajax request, this was made neccessary by new Jenkins version
 */

/* Fix for Greasemonkey 1.0 bug, see http://www.greasespot.net/2012/08/greasemonkey-10-jquery-broken-with.html */
this.$ = this.jQuery = jQuery.noConflict(true);

$(document).ready(function() {
    document.title = "Patrick's Little Helper";
    addFavicon("https://lh4.googleusercontent.com/-EFrLfxRfVbg/T4gGR8d3QJI/AAAAAAAAAj4/O0aR8yt_pxg/s32/favicons-patricks-little-helper.ico")
    addCss("#top-panel img { opacity: 0; }");
    addCss("#top-panel td:first-child { background: url(https://lh6.googleusercontent.com/-_ZwIswUIOdU/T4gHU8h7bJI/AAAAAAAAAkY/eWihs0-tNXc/s139/title.png) no-repeat; }");
    addCss("#main-table { height: 580px; background: url(https://lh4.googleusercontent.com/-kJ2SIOb4cc8/UORshlKSXRI/AAAAAAAABNA/4owD4_oRpMo/s300/Pimp-My-Ride-Logo-Jenkins.png) bottom left no-repeat !important; }");
    addCss("body { background-color: #e1ebf5; }");
    addCss("th, .bigtable th, #viewList td.active { background-color: #ffa92f; }");
    addCss("td.pane-header { background-color: #6b9ed4; }");
    
    // change URLs of links on custom icons to trigger builds instead of displaying build info
    $("#projectstatus td a img").each(function() {
    	// do nothing if this is not a custom icon
    	if ($(this).attr("src").indexOf("customIcon") == -1) return;
        var anchor = $(this).parent();
    	anchor.on('click', function () {
    	    $.ajax({
    	        url: $(this).data('action')
    	    });
    	});
        anchor.data('action', anchor.attr('href') + 'build?delay=0sec');
    	anchor.attr('href', '#');
    });
});


function addCss(css) {
    var newCss = document.createElement("style");
    newCss.type = "text/css";
    newCss.innerHTML = css;
    $("head")[0].appendChild(newCss);
}

function addFavicon(url) {
    var link = document.createElement("link");
    link.type = "image/x-icon";
    link.rel = "shortcut icon";
    link.href = url;
    $("head")[0].appendChild(link);
}

