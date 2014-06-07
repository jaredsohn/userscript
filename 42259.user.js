// ==UserScript==
// @author         Andreas Jung (sd-daken.deviantart.com)
// @name           Backlink for pixiv
// @namespace      http://www.w3.org/1999/xhtml
// @description    This userscript adds a link back to the overview page from the full view page of an image
// @include        http://www.pixiv.net/member_illust.php?mode=big&*
// ==/UserScript==

// This file is licensed under Creative Commons Attribution License
//
// http://creativecommons.org/licenses/by/3.0/
//
// Initial Developer:
// Andreas Jung (sd-daken.deviantart.com)
//
// Contributor(s):
//

doc = document.location.href;
img = (doc.indexOf("manga") != -1) ? document.getElementsByTagName("img")[2] : document.getElementsByTagName("img")[0];
parent = (img.parentNode.tagName.toLowerCase() == "a") ? img.parentNode : img;
pParent = parent.parentNode;

newhref = doc.replace(/mode=big/, "mode=medium");

link = pParent.insertBefore(document.createElement("a"), parent);
link.appendChild(document.createTextNode("back"));
link.setAttribute("href", newhref);
link.setAttribute("style", "font-size: 200%; font-family: 'Trebuchet MS', arial, sans-serif; font-weight:bold; line-height: 120%;");

pParent.insertBefore(document.createElement("br"), parent);