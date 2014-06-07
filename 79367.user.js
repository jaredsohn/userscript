// ==UserScript==
// @name           I LIKE PONIES
// @namespace      FaiD
// @description    PONIES!!!
// @include        http://www.facebook.com/*
// @match          http://www.facebook.com/*
// @version		   0.3
//
// @history        0.3 Works on AJAX updates now too
// @history        0.2 No longer makes baby jesus cry
// @history        0.1 Initial version
//
// ==/UserScript==

function enponyify(node)
{
  for (var i = node.firstChild; i; i = i.nextSibling)
  {
    if (i.nodeType == i.TEXT_NODE)
      i.nodeValue = i.nodeValue.replace(/likes?/ig, "PONIES");
    else if (i.nodeType == i.ELEMENT_NODE)
      enponyify(i);
  }
}
enponyify(document.body);

document.addEventListener("DOMSubtreeModified", function(){enponyify(document.body);});