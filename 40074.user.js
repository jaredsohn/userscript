// ==UserScript==
// @name           Vkontakte video downloader 
// @namespace      http://vkontakte.ru/video*
// @description    add button to download video from vkontakte.ru ($Revision: 1.9 $)
// @include        http://vkontakte.ru/video*
// ==/UserScript==

// $Id: vkontakte_video.user.js,v 1.9 2008/01/07 01:32:29 green Exp $

if ((/video(\d+)/.exec(window.location))||(/video(.*)\&id=(\d+)/.exec(window.location)))
{
     var allText = document.documentElement.innerHTML;
     var vtag=/vtag.,.(.*?).\)/.exec(allText);
     var vkid=/vkid.,.(.*?).\)/.exec(allText);
     var host=/host.,.(.*?).\)/.exec(allText);
     var addon=document.createElement("a");
     addon.setAttribute("href","http://"+host[1]+"/assets/videos/"+vtag[1]+vkid[1]+".vk.flv");
     addon.innerHTML="<br>[download FLV]";
     document.getElementById("bigSummary").appendChild(addon);
     var addon=document.createElement("a");
     addon.setAttribute("href","http://vixy.net?u=http://"+host[1]+"/assets/videos/"+vtag[1]+vkid[1]+".vk.flv");
     addon.innerHTML="[download AVI/MOV/MP4/MP3/3GP]";
     document.getElementById("bigSummary").appendChild(addon);
}
