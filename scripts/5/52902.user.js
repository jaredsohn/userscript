// ==UserScript==
// @name           Widescreen Forum
// @namespace      http://www.kongregate.com/
// @description    Adjusts the width of the Kongregate forums
// @include        http://www.kongregate.com/forums*
// ==/UserScript==

var h = document.getElementsByTagName("head")[0],
w = screen.width-100;



h.innerHTML+="\n<style>body#forums #forum_posts, #feature, table.forums, table.topics { width: "+w+"px; }</style>";

h.innerHTML+="\n<style>body#forums table.posts tr.hentry .entry-content { width: "+(w-164)+"px; }</style>";