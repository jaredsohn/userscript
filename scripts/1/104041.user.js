// ==UserScript==
// @name           csfd ikonky komu pisu budou jeho
// @description    csfd ikonky komu pisu budou jeho
// @include        http://www.csfd.cz/posta/*
// ==/UserScript==
var uzivatel_img=document.querySelectorAll("ul.ui-posts-action-list li.sent a img.avatar");
var uzivatel_dst=document.querySelectorAll("ul.ui-posts-action-list li.sent div.post span.nick strong a");
for(i=0;i<uzivatel_dst.length;i++){
 // najdi id
 var uzivatel_dst_url= uzivatel_dst[i].href;
 uzivatel_id=uzivatel_dst_url.match(/[^0-9]+([0-9]+)/)[1];
 // pridej id
 uzivatel_img[i].src="http://img.csfd.cz/images/users/foto"+uzivatel_id+".jpg";
}         