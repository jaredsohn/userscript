// ==UserScript==
// @name           Redmine: change commit links to diff links
// @namespace      http://henrik.nyh.se
// @description    Link directly to diffs instead of the often useless commit page. Adds a "rev" link after pointing to the commit.
// @include        http://redmine.*
// @include        https://redmine.*
// ==/UserScript==

function jQueryIsReady($) {

  $('a[href^=/repositories/revision/]').each(function() {
    var diff_url = this.href.replace(/\/revision\/(.+?)\/(.+)/, "/diff/$1?rev=$2");
    $(this).after(' (<a href="'+this.href+'">rev</a>)')
    this.href = diff_url;
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
