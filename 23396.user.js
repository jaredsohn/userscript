// ==UserScript==
// @name           Wikia ads remover
// @namespace      wikia_ads@patheticcockroach.com
// @description    Removes ads in Wikia
// @include        http://*wikia.com*
// ==/UserScript==

a=document.getElementsByTagName('div');
for(n=0;n<a.length;n++)
{
   i=a[n];
   if(i.id.indexOf('column-google')!=-1)
   {
      i.style.display='none';
   }
}

document.getElementById('content').style.marginRight="2px";