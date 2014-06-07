// ==UserScript==
// @name           allow fullscreen the youtubes embeds in vgames
// @namespace      http://shmulik.zekar.co.cc/vgames-youtube
// @include        http://www.vgames.co.il/article/*
// @author         shmulik - sking.me@gmail.com
// @license        Creative Commons Attribution-NonCommercial-NoDerivs
// @description    allow you fullscreen the youtube's video in vgames articles
// ==/UserScript==



var embeds = document.evaluate("//embed[starts-with(@src,'http://www.youtube.com')]",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for (var i = 0; i < embeds.snapshotLength; i++) {
  embeds.snapshotItem(i).setAttribute("allowfullscreen","true");
  embeds.snapshotItem(i).parentNode.innerHTML+="";
}