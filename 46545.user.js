// ==UserScript==
// @name           XVIDEOS Downloader
// @namespace      http://www.xvideos.com/
// @description    Replace "Add this video to your XV favorites" by a direct URL
// @include        http://www.xvideos.com/*
// ==/UserScript==
function get_flv_url()
{
 var line = document.getElementById('player').innerHTML;
 var url = line.substring(line.indexOf("flv_url=")+8, line.indexOf("&amp;url_bigthumb"));
 return url;
}


function replace_url()
{
 var hrefNodes = document.getElementsByTagName('a');
 for(var a = 0; a < hrefNodes.length; a++)
 {
   if(hrefNodes[a].getAttribute('href').indexOf("add_favorite") != -1)
   {
     hrefNodes[a].setAttribute('href', get_flv_url());
     a = hrefNodes.length;
   }
 }
}

replace_url();