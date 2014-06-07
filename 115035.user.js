// ==UserScript==
// @name   YouTubeScriptsX
// @version 01.08.0075
// @description Version 01.08.0075
// @author  .paradise
// @include http://*
// @include https://*
// @exclude http://acid3.acidtests.org/*
// @updateURL http://userscripts.org/scripts/source/115035.meta.js
// ==/UserScript==
AUTO=-1;OFF=0;ON=1;user='//userscripts.org/scripts/source/';

(function(){if(''!=document.title){h=document.getElementsByTagName('head')[0];if(location.href.match(/(:\/\/)(acid3\.acidtests\.org\/)/)){;
}if((!location.href.match(/(:\/\/)(\w*\.?twitter\.com\/)$/))&&(!location.href.match(/(:\/\/)(\w*\.?twitter\.com\/)(|#!\/)(activity\/?)$/))&&(location.href.match(/(:\/\/)(\w*\.?twitter\.com\/)/))){
  if(OFF){s=document.createElement('script');s.src=user+'112768.user.js';h.appendChild(s);}
}if(location.href.match(/(:\/\/)(\w*\.?twitter\.com\/|twipple\.jp\/|standard\.cotweet\.com\/|hootsuite\.com\/|www\.crowy\.net\/)/)){
  if(OFF){s=document.createElement('script');s.src=user+'106779.user.js';h.appendChild(s);}
}if(location.href.match(/(:\/\/)(\w*\.?twitter\.com\/|\w*\.?nicovideo\.jp\/|\w*\.?facebook\.com\/|www\.myspace\.com\/|www\.sopcast\.com\/|www\.easetuner\.com\/|www\.crowy\.net\/|www\.mbok\.jp\/|www\.bidders\.co\.jp\/|\w+\.moshimo\.com\/|\w+\.fanky\.\w+\/|joysound\.com\/|\w+\.clubdam\.com\/app\/damtomo\/)/)){
  if(OFF){s=document.createElement('script');s.src=user+'111550.user.js';h.appendChild(s);}
}if(location.href.match(/(:\/\/)(\w*\.?twitter\.com\/)/)){
  if(OFF){s=document.createElement('script');s.src=user+'118850.user.js';h.appendChild(s);}
  if(OFF){s=document.createElement('script');s.src=user+'114063.user.js';h.appendChild(s);}
  if(OFF){s=document.createElement('script');s.src=user+'109876.user.js';h.appendChild(s);}
  if(OFF){s=document.createElement('script');s.src=user+'99236.user.js';h.appendChild(s);}
  if(OFF){s=document.createElement('script');s.src=user+'99309.user.js';h.appendChild(s);}
}if((!location.href.match(/(:\/\/)(p\d+\.\d+ch\.io\/getf\.cgi\?|\w*\.?\d+ch.net\/test\/bbs\.cgi\?guid=)/))&&(location.href.match(/(:\/\/)(\w*\.?2ch\.net\/|\w*\.?bbspink.com\/|\w*\.?unkar\.org\/|jbbs\.livedoor\.jp\/|logsoku\.com\/thread\/)/))){
  if(OFF){s=document.createElement('script');s.src=user+'150101.user.js';h.appendChild(s);}
}if(location.href.match(/(:\/\/)(\w*\.?youtube\.com\/)(watch\/?[\?\#]!?v=|watch\/?[\?\#]!?videos=|)/)){
  if(ON){s=document.createElement('script');s.src=user+'78184.user.js';h.appendChild(s);}
}if((!location.href.match(/(:\/\/)(\w*\.?youtube\.com\/)(my_|embed\/)/))&&(location.href.match(/(:\/\/)(\w*\.?youtube\.com\/)/))){
  if(ON){s=document.createElement('script');s.src=user+'39167.user.js';h.appendChild(s);}
}if(!location.href.match(/(:\/\/)(\w*\.?twitter\.com\/|\w*\.?facebook\.com\/|i-mobile\.co\.jp\/|[\w\-]*\.?nicovi|[\w\-]*\.?google\.[\w\-\.]+\/|translate|ad)/)){
  if(ON){s=document.createElement('script');s.src=user+'110178.user.js';h.appendChild(s);}
}}})();