// ==UserScript==
// @author         Andreas Jung
// @name           Update old links on e-shuushuu
// @description    This userscript updates old links on e-shuushuu.net
// @namespace      http://www.w3.org/1999/xhtml 
// @include        http://e-shuushuu.net/*
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

possible_links = document.getElementsByTagName("a");
for (i=0; i<possible_links.length; i++) {
   if (possible_links[i].getAttribute("href").search(/http:\/\/e-shuushuu\.net\/image\.php\?mode=view&image_id=/)!= -1) {
      possible_links[i].textContent = "http://e-shuushuu.net/image/" + possible_links[i].getAttribute("href").slice(51);
      possible_links[i].setAttribute("href", "http://e-shuushuu.net/image/" + possible_links[i].getAttribute("href").slice(51));
   }
}