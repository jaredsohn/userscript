// ==UserScript==
// @name          Google Search - un-S-U-P-E-R-sized
// @namespace     http://chopeen.blogspot.com/
// @description   Reverts changes described in the 'Now S-U-P-E-R-sized!' post http://tinyurl.com/mmxwxb
// @include       http://www.google.*/*
// @include       http://images.google.*/*
// @version       1.0.1
// Define GM_addStyle for compatibility with opera (http://www.howtocreate.co.uk/operaStuff/userjs/aagmfunctions.js)
if (typeof GM_addStyle == "undefined") {
  function GM_addStyle(css) {
    var heads = document.getElementsByTagName("head");
    if (heads.length > 0) {
      var node = document.createElement("style");
      node.type = "text/css";
      node.appendChild(document.createTextNode(css));
      heads[0].appendChild(node); 
    }
  }
}
// ==/UserScript==

// search text field
GM_addStyle(
'.lst {' +
'  font-size:13px;' +
'  margin-bottom:0em;' +
'}'
);

// search buttons
GM_addStyle(
'.lsb {' +
'  font-size:13px;' +
'  height:22px;' +
'  margin:0em;' +
'}'
);

document.addEventListener("keydown",onKeydown,true); 

function onKeydown(e)
{
  // suggestion box
  GM_addStyle(
  '.gac_m {' +
  '  -moz-background-clip:border;' +
  '  -moz-background-inline-policy:continuous;' +
  '  -moz-background-origin:padding;' +
  '  background:white none repeat scroll 0 0;' +
  '  border:1px solid #666666;' +
  '  cursor:default;' +
  '  font-size:13px;' +
  '  line-height:17px;' +
  '  margin:0;' +
  '  position:absolute;' +
  '  z-index:99;' +
  '}'
  );

  // smaller font for the 'my past searches' suggestions (ones with the 'remove' link)
  GM_addStyle(
  '.gac_t {' +
  '  font-size:13px;' +
  '}'
  );

  // hide buttons at the bottom of the suggestions box
  GM_addStyle(
  '.gac_bt {' +
  '  display:none;' +
  '}'
  );
}