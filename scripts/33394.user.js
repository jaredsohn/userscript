// ==UserScript==
// @name          Fav Icons
// @namespace     http://jeffpalm.com/favicons
// @description   Shows favicons on reddit (and maybe more)
// @include       http://*.reddit.com/*
// ==/UserScript==

/*
 * Copyright 2008 Jeffrey Palm.
 */

var TESTING = false;

function main() {
  var divs = document.getElementsByTagName("span");
  for (var i=0; i<divs.length; i++) {
    var div = divs[i];
    if (div.className && div.className == "domain") {
      var domain = div.innerHTML.substring(1,div.innerHTML.length-1);
      var el;
      el = document.createElement("span");
      el.innerHTML = "&nbsp;";
      div.appendChild(el);
      el = document.createElement("img");
      el.src = "http://" + domain + "/favicon.ico";
      div.appendChild(el);
    }
  }
}

try {main();} catch (e) {if (TESTING) alert(e);}
