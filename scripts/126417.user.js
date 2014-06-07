// ==UserScript==
// @name           9GAG Proper Anti NSFW Filter
// @namespace      http://9gag.com/
// @description    Bypass the NFSW filter without logging in.
// @include        http://9gag.com/*
// ==/UserScript==

entries = document.getElementsByTagName("img");

for (i = 0 ; i < entries.length ; i++)
{
 if (entries[i].alt == "NSFW")
 {
  url = entries[i].parentNode.href;
  url = url.substring(url.lastIndexOf("/") + 1);
  entries[i].src = "http://d24w6bsrhbeh9d.cloudfront.net/photo/" + url + "_700b.jpg";
  entries[i].setAttribute("style", "max-width:460px;");
  entries[i].setAttribute("onError", "document.getElementById('entry-list-ul').removeChild(this.parentNode.parentNode.parentNode)"); 
 }
}