// ==UserScript==
// @name   BBiCentral MasterScriptsX
// @namespace      http://bbicentral.blogspot.com
// @version 01.01.2012
// @description Version 01.01.2012
// @author  .paradise
// @include http://*
// @include https://*
// @exclude http://acid3.acidtests.org/*
// @exclude https://acid3.acidtests.org/*
// @updateURL https://userscripts.org/scripts/source/115055.meta.js
// ==/UserScript==
AUTO=-1;OFF=0;ON=1;user='//userscripts.org/scripts/source/';

(function(){if(location.href.match(/(:\/\/)(acid3\.acidtests\.org)(\/)/)){;
}if((!location.href.match(/(:\/\/)(\w*\.?twitter\.com\/)$/))&&(!location.href.match(/(:\/\/)(\w*\.?twitter\.com\/)(|#!\/)(activity\/?)$/))&&(location.href.match(/(:\/\/)(\w*\.?twitter\.com\/)/))){
  if(ON){s=document.createElement('script');s.src=user+'112768.user.js';document.body.appendChild(s);}
}if(location.href.match(/(:\/\/)(\w*\.?twitter\.com\/|twipple\.jp\/|standard\.cotweet\.com\/|hootsuite\.com\/|www\.crowy\.net\/)/)){
  if(ON){s=document.createElement('script');s.src=user+'106779.user.js';document.body.appendChild(s);}
}if(location.href.match(/(:\/\/)(\w*\.?twitter\.com\/|\w*\.?facebook\.com\/|www\.myspace\.com\/|www\.crowy\.net\/|www\.mbok\.jp\/|www\.bidders\.co\.jp\/|\w+\.moshimo\.com\/|utauga\.jp\/karaoke\/|utauga\.jp\/utablog\/|utauga\.jp\/?$)/)){
  if(ON){s=document.createElement('script');s.src=user+'111550.user.js';document.body.appendChild(s);}
}if(location.href.match(/(:\/\/)(\w*\.?twitter\.com\/)/)){
  if(ON){s=document.createElement('script');s.src=user+'118850.user.js';document.body.appendChild(s);}
  if(ON){s=document.createElement('script');s.src=user+'114063.user.js';document.body.appendChild(s);}
  if(ON){s=document.createElement('script');s.src=user+'109876.user.js';document.body.appendChild(s);}
  if(ON){s=document.createElement('script');s.src=user+'99236.user.js';document.body.appendChild(s);}
  if(ON){s=document.createElement('script');s.src=user+'99309.user.js';document.body.appendChild(s);}
}if(location.href.match(/(:\/\/)(\w*\.?youtube\.com\/)(watch\/?[\?\#]!?v=|watch\/?[\?\#]!?videos=|)/)){
  if(ON){s=document.createElement('script');s.src=user+'78184.user.js';document.body.appendChild(s);}
}if((!location.href.match(/(:\/\/)(\w*\.?youtube\.com\/)(my_|embed\/)/))&&(location.href.match(/(:\/\/)(\w*\.?youtube\.com\/)/))){
  if(ON){s=document.createElement('script');s.src=user+'39167.user.js';document.body.appendChild(s);}
}if(!location.href.match(/(:\/\/)(\w*\.?twitter\.com\/|\w*\.?facebook\.com\/|i-mobile\.co\.jp\/|[\w\-]*\.?nicovi|[\w\-]*\.?google\.[\w\-\.]+\/|translate|ad)/)){
  if(ON){s=document.createElement('script');s.src=user+'103167.user.js';document.body.appendChild(s);}
  if(ON){s=document.createElement('script');s.src=user+'110178.user.js';document.body.appendChild(s);}
}if(location.href.match(/(:\/\/)(\w*\.?youtube\.com\/)(watch\/?\?|all_comments\/?\?)/)){
  if(OFF){s=document.createElement('script');s.src=user+'90424.user.js';document.body.appendChild(s);}
}if((location.href.match(/(:\/\/)(\w*\.?youtube\.com\/)(watch\/?\?)/))||(location.href.match(/(:\/\/)(api\.facebook\.com\/)/))||(location.href.match(/(:\/\/)(urls\.api\.twitter\.com\/)/))){
  if(OFF){s=document.createElement('script');s.src=user+'98516.user.js';document.body.appendChild(s);}
}if(location.href.match(/(:\/\/)(\w*\.?youtube\.com\/)(watch\/?[\?\#]!?v=|watch\/?[\?\#]!?videos=|)/)){
  if(OFF){s=document.createElement('script');s.src=user+'113936.user.js';document.body.appendChild(s);}
}})();