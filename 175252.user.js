// ==UserScript==
// @name           direct links for web.de mails
// @namespace      *web.de*
// @description    no redirection for links in mails on web.de
// @include        *web.de*
// @grant          GM_getValue
// @grant          GM_setValue
// ==/UserScript==

var counter = GM_getValue('counter', 0);
console.log('This script has been run ' + counter + ' times.');
GM_setValue('counter', ++counter);

for(var i=0; i < document.links.length; i++)
{
  //redirectUrl= ist der Identifier für den Link
  link=document.links[i].getAttribute('href').split("redirectUrl=");
  //weitere Parameter entfernen
  var aBetterLink = link[1].split("&")[0];
  //Doppelpunkt wieder herstellen
  aBetterLink = aBetterLink.replace(/%3A/g, ":");
  //Slash wieder herstellen
  aBetterLink = aBetterLink.replace(/%2F/g, "/");
  document.links[i].setAttribute('href',aBetterLink);   
}