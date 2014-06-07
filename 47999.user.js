// ==UserScript==
// @name           Vkontakte video downloader 
// @namespace      http://vkontakte.ru/video*
// @description    add button to download video from vkontakte.ru ($Revision: 1.13 $)
// @include        http://vkontakte.ru/video*
// ==/UserScript==

// $Id: vkontakte_video.user.js,v 1.13 2009/05/02 14:59:38 randuev Exp $

if ((/video-(\d+)_(\d+)/.exec(window.location))||(/video(\d+)_(\d+)/.exec(window.location)))
{
     var allText = document.documentElement.innerHTML;
     var vtag=/vtag:'(.*?)',/.exec(allText);
     var vkid=/vkid:'(.*?)',/.exec(allText);
     var host=/host:'(.*?)',/.exec(allText);
GM_xmlhttpRequest({
    method: 'GET',
    url: "http://vkadre.ru/get_video?version=1&vtag="+vtag[1]+"&vkid="+vkid[1],
    headers: {
    'User-agent': 'Mozilla/5.0 (Windows; U; Windows NT 5.1; ru; rv:1.8.1.12) Gecko/20080201 Firefox/2.0.0.12',
    'Accept': 'text/xml,application/xml,application/xhtml+xml,text/html;q=0.9,text/plain;q=0.8,image/png,*/*;q=0.5',
    },
    onload: function(responseDetails) {
    var xmlobject = (new DOMParser()).parseFromString(responseDetails.responseText, "text/xml");
    var c=xmlobject.getElementsByTagName('location')[0];
     var addon=document.createElement("a");
     addon.setAttribute("href",c.firstChild.nodeValue);
     addon.innerHTML="<br>[download FLV]";
     document.getElementById("bigSummary").appendChild(addon);
     var addon=document.createElement("a");
     addon.setAttribute("href","http://vixy.net?u="+c.firstChild.nodeValue);
     addon.innerHTML="[download AVI/MOV/MP4/MP3/3GP]";
     document.getElementById("bigSummary").appendChild(addon); 
}});
}