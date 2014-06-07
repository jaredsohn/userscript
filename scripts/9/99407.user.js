// ==UserScript==
// @name           Select All Facebook
// @namespace      xpsdeset
// @include        http://www.facebook.com/social_graph.php*
// ==/UserScript==
x=document.getElementById('_view_all');
var dld=document.createElement("div");
dld.innerHTML="<a href=\"javascript:links=document.getElementById('all_friends').getElementsByTagName('a');for ( i = 0; i < links.length; i++ ){links[i].onclick();};void(0);\">[SA]</a>";
x.parentNode.insertBefore( dld ,x.nextSibling);









