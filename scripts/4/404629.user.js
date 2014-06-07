// ==UserScript==
// @name        WADs clicker & blocker
// @namespace   http://wmmail.ru/wall_Janco
// @version     1.03
// @date        2014-01-13
// @author      Akkadites
// @icon       http://wad.ojooo.com/favicon.ico
// @include    http://wad.ojooo.com/ads.php
// @include    http://wad.ojooo.com/cks.php?k=*
// @include    http://wad.ojooo.com/errors.php?err=*
// ==/UserScript==

(function(w){
 
   function _obsidere_iframe(){
   if (w.parent.location.href.indexOf("cks.php?k=")>0) { 
   document.getElementById("pgl").src="about:blank";
   w.setInterval(function(){if(document.getElementById("lastLoadedCmds")) w.parent.close(); return;},3913);
   }
   else if (w.parent.location.href.indexOf("ads.php")>6) {var _t=document.createElement('script');
     _t.setAttribute("type","text/javascript"); _t.text="\nvar advs=document.getElementsByTagName(\"a\"); m=0; _ci=null; _advs=[];\n";
     _t.text+="for (m=0; m<advs.length;++m) { if((advs[m].href.search(/cks\\.php\\?k=[A-Fa-f0-9]+&/)!==-1))  {_ci=advs[m].href.match(/k=[A-Fa-f0-9]+/); _ci=_ci[0].substring(2,10);} else continue; if(advs[m].parentNode.parentNode.parentNode.currentStyle.display==\"none\") continue; if((advs[m].parentNode.parentNode.previousElementSibling.className.indexOf(\"disabled\")==-1)&&(advs[m].parentNode.parentNode.parentNode.id.indexOf(\"adspremium\")==-1)&&(advs[m].href.search(/1DAC263|3340EF87|17FE6B|124862|4DF339|AE8F8|C946A|2C95C46|1BCCC360|FDF2908B|D10B4DE|B34A18E68/)==-1)&&(!sessionStorage.getItem(_ci))) {_advs.push(advs[m]); break;}} _ci=null;  advs=_advs;  _advs=null;";
     _t.text+="function _oaccensor(){var _c; if(!(advs.length)){ window.setTimeout(function(){window.location.reload(true);},180000); return;} _c=advs.shift(); if(_ci) window.clearTimeout(_ci); if (advs.length+1) _ci=window.setTimeout(function(){var tmp=_c.href.match(/k=[A-Fa-f0-9]+/); tmp=tmp[0].substring(2,10);sessionStorage.setItem(tmp,'11'); _c.click(); _c=_c.parentNode.parentNode.parentNode.getElementsByClassName(\"counter\")[0].textContent.match(/\\d+/);  _c=(parseInt(_c[0],10)+4)*1000; window.setTimeout(function(){window.location.reload(true);},_c);},1200); return;} \n _oaccensor();";
     document.getElementsByTagName("head")[0].appendChild(_t);
     return;
   }
   if(w.location.href.indexOf("errors.php")>6) {w.close(); w.parent.opener._oaccensor();}
   } 
  if(document.addEventListener)
    document.addEventListener('DOMContentLoaded', _obsidere_iframe, false);  
  else
    w.addEventListener('load', _obsidere_iframe, false);
})(window);
