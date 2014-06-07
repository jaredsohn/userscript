// ==UserScript==
// @name          Missing images
// @namespace     http://jeffpalm.com/missingimages
// @description	  Marks missing images on google image searches
// @include       http://*images.google.com/*
// ==/UserScript==

/*
 * Copyright 2006 Jeffrey Palm.
 */

var VERSION = 0.1;

// --------------------------------------------------
// misc
// --------------------------------------------------

function $n(tag,on) {
	var e = document.createElement(tag);
	if (on) on.appendChild(e);
	return e;
}

function $t(text,on) {
	var e = document.createTextNode(text);
	if (on) on.appendChild(e);
	return e;
}

// --------------------------------------------------
// Stuff
// --------------------------------------------------

/**
 * Node[a] String[href] -> (Details -> Void)
 * Returns a new closure for the Ajax call.
 */
function newFunction(_a,_href) {
  var a = _a;
  var href = _href;
  return function(details) {
    if (details.status == 404) {
      div = $n("div",a);
      div.style.color = "#770000";
      div.innerHTML = "MISSING";
    }
  };
}

// --------------------------------------------------
// main
// --------------------------------------------------

function main() {
  as = document.getElementsByTagName("a");
  for (i in as) {
    a = as[i];
    if (!a.href) continue;
    //http://images.google.com/imgres?imgurl=http://www.3d-screensaver-downloads.com/images/free-cat-screensaver/big2.jpg&
    if (res = a.href.match(/images\.google\.com\/imgres\?imgurl=([^&]+)&/)) {
      href = res[1];
      if (!href) continue;
      GM_xmlhttpRequest({
        method:"GET",
            url:href,
            headers:{"User-Agent":"monkeyagent","Accept":"*/*",},
            onload: newFunction(a,href),
            });
    }
  }
}

try {main();} catch (e) {alert(e);}

