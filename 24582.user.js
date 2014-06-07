// ==UserScript==
// @name           Sexyshare Link Revealer
// @description    Shows full URL instead of filename (allows selection of all links at once!)
// @include        http://sexyshare.net/*
// ==/UserScript==

 function sexyshareDo()
 {
   var linksDiv = document.getElementById("postindlink");
   var hrefNodes;

   if(linksDiv)
   {
     hrefNodes = linksDiv.getElementsByTagName("a");
     for(var a = 0; a < hrefNodes.length; a++)
     {
       if(hrefNodes[a].getAttribute('href'))
       {
         if(hrefNodes[a].getAttribute('href') == "javascript:;") hrefNodes[a].innerHTML = '';
         else hrefNodes[a].innerHTML = hrefNodes[a].getAttribute('href');
       }
     }
   }
 }

 sexyshareDo();
