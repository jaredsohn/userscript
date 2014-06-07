// ==UserScript==
// @name        Google+ Full Images
// @namespace   http://ske48.kkev.in/gpext
// @description Open full size image links on Google+ (Top left corner of the images)
// @include     https://plus.google.com/*
// @exclude     https://plus.google.com/*_*
// @version     1.3.7
// @grant       none
// @author      skevin
// @license     MIT License
// @downloadURL https://userscripts.org/scripts/source/171420.user.js
// @updateURL https://userscripts.org/scripts/source/171420.meta.js
// ==/UserScript==

// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(call) {
  var script = document.createElement("script");
  script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/2.0.2/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + call.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

// the guts of this userscript
function main() {

  var b = document.createElement('div');
  b.id = 'img_box';
  b.style.position = 'absolute';
  b.style.opacity = 0;
  b.style.zIndex = 97;
  b.onmouseover = function() {this.style.opacity = 1};
  b.onmouseout = function() {this.style.opacity = 0};

  b.innerHTML = '<a id="ntab_url" target="_blank" style="z-index:98"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAB00lEQVQ4jZWSPWhTURiGn/N70yrNHURBFG2sJrSDii6CoEFxcxccBAc7qNS6OYmDiFKR4lA6qIvi4OaiYCFmcXCKXYpOggFxEINwm5zcP4d7Caa5Fnvg43A+vvfh5T2f4F9nmSNAI3/VmaVVNCY3E1+vzvv3ji74Y2q8kff+A5CLr1Vv+NXyDD/dby5NXfGNtA2WRiGySHy1NucfKk+z0n7P2q8vaDwuTl72bWIbPBqGiELxxDQr7Sb9uE9CAgIO+pN0w4AXq886fefq3MoyEUO2c/G7dpNe7IjTiIQUIVKklFT9KVy4zvOPTzuu5+rcoSUGgdXmM9vfmnTjHutxQBAFuMSBgJgIrTTHdhwmCUNefXjZcd1eXXGetbnaTf/EzpN87/5AScWB8n5ef31DEAeE9ElEzNk9p6lM7GPclNg2tp3Krkpp9XPrgmCZdGOy948v8uDTIp42eNpiteHc3jqP3z6EiKzC7NbM/hUkwBKplBKjNFYZrDaUTAYhAu4Oz4/uQQRSZACjNdYYPGMxSmeATfdgABAYpQYuPJ05IdwCQMkcoDVWm605EDlAKYXOQVqpQoAuBABndp/CM1mAJeOhpCwEiJHObdKNXzWoGHgyrPkDdGqej7PMgTEAAAAASUVORK5CYII=" alt="Full size" style="z-index:99" /></a>';

  document.getElementsByTagName('body')[0].appendChild(b);

  $('#contentPane').delegate('img', 'mouseover', function() {
    var p = /^(.*)\.(googleusercontent\.com)\/(.*)\/(.*)\/(.*)\/(.*)\/(.*)\/(.*)$/;
    var u = $(this).attr('src');

    if (!p.test(u)) {
      return false;
    }

    var offset = $(this).offset();
    $('#img_box').offset({top: offset.top, left: offset.left});
    $('#ntab_url').attr('href', u.replace(p, '\$1.\$2/\$3/\$4/\$5/\$6/s0/\$8'));
  });
}

// load jQuery and execute the main function
addJQuery(main);