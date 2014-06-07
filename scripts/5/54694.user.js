// ==UserScript==
// @name           ViewSafe
// @namespace      ViewSafe
// @description    Makes sites safe and easy to view (at work, for example). Images are faded out: hover over them to view the original. There are still quite a few bugs to be worked out; suggestions are welcome.
// ==/UserScript==

var cssNode = document.createElement('style');
cssNode.appendChild(document.createTextNode("* { color:Black !important; background-color:White !important; background-image:none !important; }"));
cssNode.appendChild(document.createTextNode("a { color:Blue !important; }"));
cssNode.appendChild(document.createTextNode("img { opacity:0.08 !important; border:solid 1px Black !important; }"));
cssNode.appendChild(document.createTextNode("img:hover { opacity:1 !important; border-color:transparent !important; }"));
document.getElementsByTagName("head")[0].appendChild(cssNode);
