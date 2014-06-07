// ==UserScript==
// @name           IMDb enlarge actor pictures on hover
// @namespace      http://henrik.nyh.se
// @description    Enlarges actor pictures in IMDb cast lists when you hover over that table row. Compatible with Greasemonkey and GreaseKit.
// @include        http://*.imdb.com/title/*
// @include        http://imdb.com/title/*
// ==/UserScript==

function jQueryIsReady($) {
  
  GM_addStyle(
    // Since we replace thumbs with medium images and removed width/height, keep them small this way
    "img.GM_actorPicture { height:32px; width:22px; }" +
    // Enlarge on hover
    "tr:hover a img.GM_actorPicture { height:auto; width:100px; position:absolute; margin-left:-77px; margin-top:-51px; }"
  );
  
  $("a[onclick*=tinyhead] img").each(function() {
    $(this).addClass('GM_actorPicture');
    this.src = this.src.replace(/_SY\d+_SX\d+_/, "_SX100_SY150_");  // Replace thumbs with larger images
    this.height = this.width = null;
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
  jQueryIsReady(unsafeWindow.jQuery);
}, false);
document.getElementsByTagName('head')[0].appendChild(script);
