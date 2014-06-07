 // ==UserScript==
 // @name    disable 51yes
 // @description    disable 51yes alert window from web
 // @namespace   
 // @include            *
 // ==/UserScript==
 links=document.getElementsByTagName("script")       
 for(i in links){
   link=links[i];

   if(link && link.src && (link.src.indexOf('51yes.com')>0))
   {
        link.parentNode.removeChild(link);
        break;
   }
 }
 