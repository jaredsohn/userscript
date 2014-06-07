// ==UserScript==
// @name       Breadcrumb!
// @namespace  http://forum.html.it/
// @version    0.2
// @description  breadcrumb o muerte (e forse anche la selectbox)
// @match      http://forum.html.it/*
// @copyright  2012+, Vortex
// ==/UserScript==

//#pre_content > h1
//#content > table > tbody > tr > td > form

breadcrumb = document.getElementById("pre_content").childNodes.item(1).cloneNode(true);

var style=document.createAttribute("style");
style.nodeValue="font-size:0.8em;";
breadcrumb.attributes.setNamedItem(style);

for (i=0;i<breadcrumb.childNodes.length;i++) {
    n = breadcrumb.childNodes.item(i);
    if (n.nodeName == "SPAN") n.appendChild(document.createTextNode(" > "));
}

node = document.getElementById("search_footer_content").parentNode;
do {
    node = node.previousSibling;
} while (node.nodeName != "TABLE");
node.insertBefore(breadcrumb);