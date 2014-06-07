// ==UserScript==
// @name       I Want My Old YouTube Back !
// @version    0.2
// @description  Replace the new by the old YouTube page ;)
// @include    *.youtube.*/*
// @copyright  2012+, PanDoreS
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
if(lit_cook("VISITOR_INFO1_LIVE")!="qDpUsBNO0FY"){
document.write("I Want My Old YouTube Back has detected the new version of YouTube !<br>Injecting cookie ...<br>");
document.cookie="VISITOR_INFO1_LIVE=qDpUsBNO0FY; expires=Thu, 2 Aug 2020 20:47:11 UTC;domain=.youtube.com;path=/"
document.cookie="VISITOR_INFO1_LIVE=qDpUsBNO0FY; expires=Thu, 2 Aug 2020 20:47:11 UTC;domain=www.youtube.com;path=/"
document.write("Now reloading :D");
location.reload() ;
}