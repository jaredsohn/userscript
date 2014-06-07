// ==UserScript==
// @name        Download audio from http://vkontakte.ru/
// @version     1.05
// @date        2010-07-20
// @author      Mike Samokhvalov <mikivanch@gmail.com>
// @download    http://www.puzzleclub.ru/files/vkontakte_ru_audio.js
// @include     http://vkontakte.ru/*
// @include     http://*.vkontakte.ru/*
// @include     http://vk.com/*
// @include     http://*.vk.com/*
// ==/UserScript==

(function(){function f(){for(var e=document.getElementsByTagName("img"),d=0;d<e.length;d++)if(e[d].className&&e[d].className=="playimg"){var b=e[d].getAttribute("onclick",false);if(b&&b.search(/(operate|operatewall)/i)>=0){var c="",a=b.match(/(?:operate|operatewall)\s*\x28\s*\d+\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*[\x22\x27](\w+)[\x22\x27]/i);if(a&&a.length>3)c="http://cs"+a[1]+"."+h+"/u"+a[2]+"/audio/"+a[3]+".mp3";else if((a=b.match(/(?:operate|operatewall)\s*\x28\s*\d+\s*,\s*[\x22\x27](http:\/\/[\w\_]+\.(?:vkontakte\.ru|vk\.com)\/u\d+\/audio\/\w+\.mp3)[\x22\x27]/i))&&
a.length>1)c=a[1];if(c){b=document.createElement("a");b.href=c;b.innerHTML="\u0421\u043a\u0430\u0447\u0430\u0442\u044c \u00bb";b.setAttribute("target","_blank",false);b.setAttribute("style","display: block !important; float: none !important; clear: both; font-weight: bold !important; margin: 15px 0 0 0 !important; padding: 0 !important; text-align: left !important;",false);c=e[d].parentNode;a:{a=c;do if(a=a.nextSibling){if(a.nodeType==1){a=a;break a}if(a.nodeType==9)break}while(a);a=null}a?a.appendChild(b):
c.appendChild(b)}}}}function g(){f()}var h=location.hostname.replace(/^(?:[\w\-]+\.)*(\w+\.[a-z]{2,6})$/i,"$1");window.ujs_vkontakte_ru_audio_cdl=f;window.opera.defineMagicFunction("updateBanners",function(){setTimeout(function(){ujs_vkontakte_ru_audio_cdl();if(window.ujs_vkontakte_ru_video_cdl)ujs_vkontakte_ru_video_cdl()},1E3)});(typeof window.opera.version=="function"&&window.opera.version()>=9?true:false)?document.addEventListener("DOMContentLoaded",g,false):document.addEventListener("load",g,false)})();