// ==UserScript==
// @name           Redmine: direct download/view links
// @namespace      http://www.simön.de
// @description    Add direct links to file view and raw download file in file list.
// @include        http://redmine.*
// @include        https://redmine.*
// ==/UserScript==

function jQueryIsReady($) {

  $('a[href*=\\/repository\\/changes\\/]').each(function() {
    var dl_url = this.href.replace(/(.+)\/changes\/(.+)/, "$1/raw/$2");
    var view_url = this.href.replace(/(.+)\/changes\/(.+)/, "$1/entry/$2");
    $(this).after(' <a href="'+dl_url+'">dl</a><a href="'+view_url+'">view</a>')
  });

}


// ----------------------------------------------------------------------
// Greasemonkey/GreaseKit compatibility
// ----------------------------------------------------------------------


if (typeof(unsafeWindow) === 'undefined') {
 unsafeWindow = window;
}

// Based on http://userscripts.org/topics/1912
if (typeof(GM_addStyle) === "undefined") {
  GM_addStyle = function(styles) {
    var oStyle = document.createElement("style");
    oStyle.setAttribute("type", "text/css");
    oStyle.appendChild(document.createTextNode(styles));
    document.getElementsByTagName("head")[0].appendChild(oStyle);
  }
}


// ----------------------------------------------------------------------
// jQuery
// ----------------------------------------------------------------------

var script = document.createElement('script');
script.src = 'http://jquery.com/src/jquery-latest.js';
script.type = 'text/javascript';
script.addEventListener("load", function() {
  unsafeWindow.jQuery.noConflict();
  jQueryIsReady(unsafeWindow.jQuery);
}, false);
document.getElementsByTagName('head')[0].appendChild(script);
