// ==UserScript==
// @name           YouTube Cards
// @description    Enable YouTube Channel cards feature
// @author         Solomon Watts
// @include        *.youtube.*/*
// @version        1.0
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
	document.cookie="VISITOR_INFO1_LIVE=0xJL6SMMUyE; path=/; domain=.youtube.com"
}