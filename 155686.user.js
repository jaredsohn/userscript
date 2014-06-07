// ==UserScript==
// @name       forth NEW YouTube!
// @version    0.1
// @description  forth NEW new YT interface switcher
// @include    *.youtube.*/*
// @copyright  2012+, hronir
// ==/UserScript==
function lit_cook(nom) {
      var deb,fin
      deb = document.cookie.indexOf(nom + "=")
      if (deb >= 0) {
         deb += nom.length + 1
         fin = document.cookie.indexOf(";",deb)
         if (fin < 0) fin = document.cookie.length
         return unescape(document.cookie.substring(deb,fin))
         }
      return ""
   }
if(lit_cook("VISITOR_INFO1_LIVE")!="nH7tBenIlCs"){
document.write("YouTube UI switcher has detected the old version of YouTube !<br/>Injecting cookie to switch FORTH NEW UI...<br/>");
document.cookie="VISITOR_INFO1_LIVE=nH7tBenIlCs; expires=Thu, 2 Aug 2020 20:47:11 UTC;domain=.youtube.com;path=/"
//document.cookie="VISITOR_INFO1_LIVE=nH7tBenIlCs; expires=Thu, 2 Aug 2020 20:47:11 UTC;domain=www.youtube.com;path=/"
document.write("Now reloading :D");
location.reload() ;
}