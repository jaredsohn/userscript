// ==UserScript==
// @name          Google Search - un-S-U-P-E-R-sized
// @namespace     http://chopeen.blogspot.com/
// @description   Reverts changes described in the 'Now S-U-P-E-R-sized!' post http://tinyurl.com/mmxwxb
// @include       http://www.google.*/*
// @include       http://images.google.*/*
// @version       1.0.7
// ==/UserScript==

// to make the script compatible with Opera <http://userscripts.org/topics/35023>
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

// iGoogle - removing the "style" element of the "nhdrwrapsizer" div
// WARNING! this works only for the text field (the buttons remain big) and for
//          the moment I don't know how to fix this
var nhdrwrapsizerDiv = document.getElementById("nhdrwrapsizer");
if (nhdrwrapsizerDiv != null) {
  var nhdrwrapsizerStyles = nhdrwrapsizerDiv.getElementsByTagName("style");
  for (var i = 0; i < nhdrwrapsizerStyles.length; i++) {
    if (nhdrwrapsizerStyles[i].innerHTML.indexOf(".lst") > -1) {
      nhdrwrapsizerDiv.removeChild(nhdrwrapsizerStyles[i]);
      break;
    }
  }
}

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

// suggestion box styles are not loaded until the box is visible,
//   so they have to be loaded this way
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

  // height of each row in the suggestion box <http://userscripts.org/topics/35000>
  GM_addStyle(
  '.gac_m td {' +
  '  line-height:16px;' +
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