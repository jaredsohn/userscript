// ==UserScript==
// @name           IMDb enlarge actor pictures on hover- Updated for New IMDb
// @namespace      http://henrik.nyh.se
// @description    Enlarges actor pictures in IMDb cast lists when you hover over that table row. Compatible with Greasemonkey and GreaseKit. Now works with new IMDb
// @include        http://*.imdb.com/title/*
// @include        http://imdb.com/title/*
// ==/UserScript==

function jQueryIsReady($) {
  
  GM_addStyle(
    // Since we replace thumbs with medium images and removed width/height, keep them small this way
    ".primary_photo img { height:44px; width:32px;} .cast_list tr { height:48px; } tr:hover a .GM_actorPicture  { height:auto; width:96px; position:absolute; margin-left:-30px; margin-top:-66px; }"
  );
  
  $(".primary_photo img").each(function() {
    if (!/nopicture/.test(this.src))  {
    $(this).addClass('GM_actorPicture');  }
    var fstr = this.src.split("_CR");

    var crX = fstr[1].split(/\,/);

    crX[0]=crX[0]*3;
    crX[1]=crX[1]*3;
    this.src = this.src.replace(/_SX\d+_/, "_SX96_").replace(/_SY\d+_/, "_SY132_").replace(/_CR\d+\,\d+\,\d+\,\d+_.jpg/, "_CR"+crX[0]+","+crX[1]+",96,132_.jpg");  // Replace thumbs with larger images


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
