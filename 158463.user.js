// ==UserScript==
// @name           Kijiji make thumbnails larger.
// @description    Make Kijiji thumbnails large while browsing category pages and results.
// @include        *.kijiji.ca/*
// @copyright      Warren Dunlop
// @version        1.1.1
// @license        LGPL http://www.gnu.org/licenses/lgpl.html
// ==/UserScript==

// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

// Guts of this userscript
function doShit(){
  jQuery('img.thumbnail').each(function(){
    var big = jQuery(this).attr('src').split('_14')[0] + "_35" + jQuery(this).attr('src').split('_14')[1];
    jQuery(this).attr('src',big);
  });
}

// load jQuery and execute the main function
addJQuery(doShit);