// ==UserScript==
// @name           CinemaTube Fullscreen Clean-up
// @namespace      Douwe Ikkuh
// @description    Clean-up the CinemaTube Fullscreen-page
// @include        http://www.cinematube.net/video_fullcode*.php?*
// @include        http://cinematube.net/video_fullcode*.php?*
// ==/UserScript==

var tds = document.getElementsByTagName('td');
    for(var i=0; i<tds.length; i++) {
      if (tds[i].getAttribute("width")=="5%" && tds[i].getAttribute("valign")=="top") {
        tds[i].parentNode.removeChild(tds[i]);
      }
      if (tds[i].getAttribute("width")=="90%" && tds[i].getAttribute("height")=="90%") {
        tds[i].setAttribute("width","100%");
      }
      if (tds[i].getAttribute("width")=="100%" && tds[i].getAttribute("height")=="10%") {
        tds[i].setAttribute("height","5");
      }
    }
