// ==UserScript==
// @name           STOT-Link
// @description    Make link in the permalinks in Tumblr conversations created with ShareTwitterOnTumblr / ShareWassrOnTumblr
// @include        http://*.tumblr.com/*
// @exclude        http://www.tumblr.com/*
// ==/UserScript==

(function(){
  document.body.innerHTML=document.body.innerHTML.replace(
    /\[(http:\/\/twitter\.com\/[0-9A-Z_a-z]+\/status(?:es)?\/\d+)\]\s*</gm,
    "[<a href=\"$1\" target=\"_blank\">$1</a>]<"
  ).replace(
    /\[(http:\/\/wassr\.jp\/user\/[\-0-9_a-z]+\/statuses\/[0-9A-Za-z]+)\]\s*</gm,
    "[<a href=\"$1\" target=\"_blank\">$1</a>]<"
  );
})()
