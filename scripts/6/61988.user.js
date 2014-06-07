// ==UserScript==
// @name           Hack GD
// @namespace      hackgd
// @description    Adjust Google Desktop's output to open documents locally.
// @include        http://googleapp.mb-hs.com/search*
// ==/UserScript==

var links = document.links;
for(i=0;i<links.length;i++) {
  link = links[i];
  if(link.pathname == "/redir" && link.search.indexOf("?url=") == 0) {

    alert(link.href);
  }
}