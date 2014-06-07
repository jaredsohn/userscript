// greasemonkey script to add webslices to demonoid registration
//
//
// ==UserScript==
// @name          webchunking demonoid
// @description   Adding webslice knowledge to demonoid
// @include       http://www.demonoid.com/*
// ==/UserScript==


var webslices = document.evaluate('//class="guest_box"]',
                                    document.documentElement,
                                    null,
                                    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

if (webslices && webslices.snapshotLength)
{
  var slice = webslices.snapshotItem(0);
  slice.className += " hslice";
  slice.id = "webchunkCnnTopHeadline";

  var child = slice.firstChild;
  while (child)
  {
    if (child.nodeType == Node.ELEMENT_NODE)
      child.className += " entry-content";
    child = child.nextSibling;
  }

  var title = document.createElement("div");
  title.setAttribute("style", "display: none;");
  title.setAttribute("class", "entry-title");
  var titleText = document.createTextNode("CNN Headline");
  title.appendChild(titleText);
  slice.appendChild(title);
}