// ==UserScript==
// @name           Web.de Linkcleaner
// @namespace      *web.de*
// @description    Removes redirecting-link in mails on web.de. For faster and anynomous browsing
// @include        *web.de*
// ==/UserScript==

for(var i=0; i < document.links.length; i++){
  link=document.links[i].getAttribute('href').split("=");
  if(link[0]=="/jump.htm?goto"){
    link[1]=unescape(link[1]);
    document.links[i].setAttribute('href',link[1]);
  }
  
}