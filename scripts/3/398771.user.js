// ==UserScript==
// @name   webkit.user.js
// @include http://*.2ch.net/*
// @include http://unkar.org/*
// @include http://jbbs.shitaraba.net/*
// @include http://*.bbspi*.com/*
// @exclude */get_domain.php*
// @exclude */bbs/writebox.cgi/*
// @exclude */p2.2ch.io/getf.cgi?*
// @author  LicenseFreeSoftware (CC BY-SA 3.0)
// @licence http://creativecommons.org/licenses/by-sa/3.0/deed.ja
// ==/UserScript==

(function(){if(''!=document.title){
  if((navigator.userAgent.match(/(Safari|Opera|Firefox\/[1-2][0-9]\.)/))){
    if(d=document.getElementsByTagName('a')){
      for(i=0;d.length>i;i++){if(!d[i].innerHTML.match(/([<>])/)){
        d[i].innerHTML=d[i].innerHTML.replace(/([\/\?\&\%\=])/img,'<wbr/>$1');
}}}}}})();
