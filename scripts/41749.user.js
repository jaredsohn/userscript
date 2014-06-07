// ==UserScript==
// @name           Picasa Web Albums Direct Links
// @namespace      http://greasemonkey.anmarmansur.com/
// @description    Rewrite links on Picasa Web Albums to point directly to images.
// @include        http://picasaweb.google.tld/*
// ==/UserScript==

function directLinks()
{
  var links = document.evaluate("//a[@class='goog-icon-list-icon-link']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  
  for (var i = 0; i < links.snapshotLength; i++) {
    links.snapshotItem(i).href = links.snapshotItem(i).firstChild.src.replace(/\/s\d{2,3}\//, "/");
    links.snapshotItem(i).target = "_blank";
  }
}

var directLinksButton = document.evaluate("//div[@class='lhcl_toolbar' and position()=2]", document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
directLinksButton = directLinksButton.appendChild(document.createElement("div"));
directLinksButton.setAttribute("class", "goog-inline-block goog-toolbar-button");
var directLinksButtonMain = directLinksButton;
directLinksButton = directLinksButton.appendChild(document.createElement("div"));
directLinksButton.setAttribute("class", "goog-inline-block goog-toolbar-button-outer-box");
directLinksButton = directLinksButton.appendChild(document.createElement("div"));
directLinksButton.setAttribute("class", "goog-inline-block goog-toolbar-button-inner-box");
directLinksButton = directLinksButton.appendChild(document.createElement("div"));
directLinksButton.setAttribute("class", "goog-toolbar-button");
directLinksButton = directLinksButton.appendChild(document.createElement("div"));
directLinksButton.setAttribute("class", "goog-inline-block lhcl_toolbar_text");
directLinksButton.appendChild(document.createTextNode("Direct Links"));
directLinksButtonMain.addEventListener("mouseover", function() { directLinksButtonMain.setAttribute("class", "goog-inline-block goog-toolbar-button goog-toolbar-button-hover"); }, false);
directLinksButtonMain.addEventListener("mousedown", function() { directLinksButtonMain.setAttribute("class", "goog-inline-block goog-toolbar-button goog-toolbar-button-hover goog-toolbar-button-active"); }, false);
directLinksButtonMain.addEventListener("mouseup", function() { directLinksButtonMain.setAttribute("class", "goog-inline-block goog-toolbar-button goog-toolbar-button-hover"); }, false);
directLinksButtonMain.addEventListener("mouseout", function() { directLinksButtonMain.setAttribute("class", "goog-inline-block goog-toolbar-button"); }, false);
directLinksButtonMain.addEventListener("click", directLinks, false);

