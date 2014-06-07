// ==UserScript==
// @name           Icon Buffet without ads
// @namespace      http://logankoester.com
// @description    Hides ads from the popular icon trading site iconbuffet.com
// @include        http://www.iconbuffet.com/*
// ==/UserScript==

function getElementsByClass(searchClass,node,tag) {
  // http://www.dustindiaz.com/getelementsbyclass/
  var classElements = new Array();
  if ( node == null )
    node = document;
  if ( tag == null )
    tag = '*';
  var els = node.getElementsByTagName(tag);
  var elsLen = els.length;
  var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
  for (i = 0, j = 0; i < elsLen; i++) {
    if ( pattern.test(els[i].className) ) {
      classElements[j] = els[i];
      j++;
    }
  }
  return classElements;
}

document.getElementById("thedeck").style.display = "none";

// not working
// getElementsByClass(document, 'txt-ad', 'p').style.display = "none";