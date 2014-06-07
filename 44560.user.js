// ==UserScript==
// @name           Britania ads remover
// @namespace      britania_ads@patheticcockroach.com
// @description    Removes ads in Britania.ws
// @include        http://*britania.ws*
// ==/UserScript==

a=document.getElementsByTagName('table');
for(n=0;n<a.length;n++)
{
   i=a[n];
   if(i.style.backgroundColor=="rgb(238, 230, 133)")
   {
      i.style.display='none';
      break;
   }
}