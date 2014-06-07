// ==UserScript==
// @name           Always open links in the same tab
// @description    changes target="_blank" to "target="_self" for all anchor tags. Doesn't affect links that use JavaScript to open new tabs.
// @author        Dave Cortright
// @namespace      kpao.org
// @version        1.01
// @date            2011-07-04
// @include        *
// ==/UserScript==

var x = document.getElementsByTagName("a");

for (i=0;i<x.length;i++) {
  if (x[i].target == "_blank") {
    x[i].target = "_self";
  }
}