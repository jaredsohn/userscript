// ==UserScript==
// @name           Google Reader - show original in tab
// @namespace      http://www.kushaldave.com
// @description    Shows original Reader item in new tab
// @include        http://www.google.com/reader/*
// @include        http://reader.google.com/*
// ==/UserScript==

function GRT_key(event) {
  if (String.fromCharCode(event.which)=="t" && !event.ctrlKey) {

    // Fix for finding link contributed by kremvax.net and the_deuce
    var anchors = document.getElementsByTagName("A");
    var anchorsLen = anchors.length;
    for (var i = 0; i < anchorsLen; ++i) {
      if (anchors[i].className == "launch-original") {
        GM_openInTab(anchors[i].href);
	break;
       }
    }
    try {
      event.preventDefault();
    } catch (e) {
    }
    return false;
  }
  return true;
}


document.addEventListener("keypress", GRT_key, true);


