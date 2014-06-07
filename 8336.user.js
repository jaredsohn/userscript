// ==UserScript==
// @name           User script template
// @namespace      http://www.dlugosz.com
// @description    Allow column widths on Scientific American
// @include        http://www.sciam.com/*
// ==/UserScript==

var nodes= document.getElementsByTagName("td");
for (var i=0;  i<nodes.length;  ++i) {
   var node= nodes[i];
   var oldwidth= node.getAttribute("width");
   if (oldwidth && oldwidth >= 470)  {
      node.removeAttribute ("width");
      }
   }

nodes= document.getElementsByTagName ("table");
for (i=0;  i<nodes.length;  ++i) {
   node= nodes[i];
   if (node.hasAttribute("width"))  node.removeAttribute("width");
   }