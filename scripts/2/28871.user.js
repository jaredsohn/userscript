// ==UserScript==
// @name          log(reddit)
// @description   displays score of links and comments in logarithmic scale
// @version       0.1
// @date          2008-06-21
// @author        miero
// @include       http://www.reddit.com/*
// ==/UserScript==

/* 
 * This script is granted to the Public Domain
 */

function lgr_update() {
  for (var j = 0; j < 2; j++) {
    var d = document.getElementsByTagName(j ? 'div' : 'span');
    for (var i = d.length - 1; i >= 0; i--) {
      if ((d[i].className.substr(0,5) == 'score')
       && (d[i].textContent.indexOf('.') == -1)
       && ((s = parseInt(d[i].textContent)) > -100000))
          d[i].textContent = (s >= 0 ? Math.log(s + 1).toFixed(1) : -Math.log(1 - s).toFixed(1))
                           + (d[i].textContent.match('point') ? ' rdt' : '');
    }
  } 
}

var lgr_mod;
function lgr_mod_fun(a,b,c) { lgr_mod(a,b,c); lgr_update(); }

if (window.opera) {
  lgr_mod = mod;
  mod = lgr_mod_fun;
}
else {
  lgr_mod = unsafeWindow.mod;
  unsafeWindow.mod = lgr_mod_fun;
}

lgr_update();
