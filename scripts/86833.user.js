// ==UserScript==
// @name           LyricWiki Aktualisieren
// @namespace      LWChris
// @description    Aktualisieren-Funktion für den Bearbeiten-Button
// @include        http://lyrics.wikia.com/*
// @require        http://userscripts.org/scripts/source/86768.user.js
// ==/UserScript==

wgPageName = location.href.replace(/^.*lyrics\.wikia\.com\/(index\.php\?title=)?|[&?#]+.*$/g,"");

var ul=Class("wikia-menu-button");
if(ul){
  ul=STag(ul,"ul");
  var li=document.createElement("li");
  ul.appendChild(li);
  var a=document.createElement("a");
  li.appendChild(a);
  a.setAttribute("data-id","purge");
  a.setAttribute("accesskey","a");
  a.setAttribute("href","/index.php?title="+wgPageName+"&action=purge");
  a.innerHTML="Aktualisieren";
};