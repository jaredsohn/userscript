// ==UserScript==
// @name           4Chan Mute
// @description    mutes the annoying embeds on 4chan
// @include        http://boards.4chan.org/*
// ==/UserScript==

while (document.getElementsByTagName("EMBED").length) {
      var b=document.createElement("DIV");
      b.style.width=(document.getElementsByTagName("EMBED")[0].width)?document.getElementsByTagName("EMBED")[0].width:"";
      b.style.height=(document.getElementsByTagName("EMBED")[0].height)?document.getElementsByTagName("EMBED")[0].height:"";
      document.getElementsByTagName("EMBED")[0].parentNode.replaceChild(b,document.getElementsByTagName("EMBED")[0]);
   }
while (document.getElementsByTagName("IFRAME").length) {
      var b=document.createElement("DIV");
      b.style.width=(document.getElementsByTagName("IFRAME")[0].width)?document.getElementsByTagName("IFRAME")[0].width:"";
      b.style.height=(document.getElementsByTagName("IFRAME")[0].height)?document.getElementsByTagName("IFRAME")[0].height:"";
      document.getElementsByTagName("IFRAME")[0].parentNode.replaceChild(b,document.getElementsByTagName("IFRAME")[0]);
   }