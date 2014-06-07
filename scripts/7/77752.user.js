// ==UserScript==
// @name          VkOpt
// @namespace     http://vkopt.net.ru/
// @description   Vkontakte Optimizer ScriptLoader 1.7.3 (OT 24.06.10) for MOZILLA FIREFOX
// @include       *vkontakte.ru*
// @include       *vk.com*
// ==/UserScript==
(function() {
var rev=5;
var vkopt_url="http://vkopt.net.ru/script/vkopt/";

function vkisetCookie(cookieName,cookieValue,nDays,domain){var today=new Date();var expire=new Date();if(nDays==null||nDays==0)nDays=365;expire.setTime(today.getTime()+3600000*24*nDays);document.cookie=cookieName+"="+escape(cookieValue)+";expires="+expire.toGMTString()+((domain)?";domain="+domain:";domain="+location.host);}
function vkigetCookie(name,temp){if(name=='remixmid'){if(temp)return false;else{tmp=remixmid();return tmp;}}var dc=document.cookie;var prefix=name+"=";var begin=dc.indexOf("; "+prefix);if(begin==-1){begin=dc.indexOf(prefix);if(begin!=0)return null;}else{begin+=2;}var end=document.cookie.indexOf(";",begin);if(end==-1){end=dc.length;}return unescape(dc.substring(begin+prefix.length,end));}

function Js2Doc(jsrc){
  var r=(vkigetCookie('vkbuild'))?vkigetCookie('vkbuild'):rev;
  for (var i=0;i<arguments.length;i++){  
    var js = document.createElement('script');
    js.type = 'text/javascript';
    js.src = vkopt_url+arguments[i]+"?"+r;//chrome.extension.getURL(arguments[i]);
    document.getElementsByTagName('head')[0].appendChild(js);
  }
}

function VkLoadScripts(){
     Js2Doc(
       "vk_ajinj.js",
       "vk_altprofile.js",
       "vk_apps.js",
       "vk_audio.js",
       "vk_closed.js",
       "vk_clubs.js",
       "vk_fave.js",
       "vk_friends.js",
       "vk_lang.js",
       "vk_mail.js",
       "vk_main.js",
       "vk_news.js",
       "vk_photos.js",
       "vk_profile.js",
       "vk_res.js",
       "vk_settings.js",
       "vk_txtformat.js",
       "vk_users.js",
       "vk_video.js",
       "vkopt.js"       
       );//*/
}
VkLoadScripts();
})();