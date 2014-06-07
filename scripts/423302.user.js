// ==UserScript==
// @name          YouTube (No AutoPlay)
// @author        Vulcano
// @version       1.0.0.0
// @icon	  http://Data.Vulcanion.com/Scripts/Userscripts/YouTube (No AutoPlay)/icon.png
// @description   Prevents autoplay Videos on YouTube
// @namespace     http://localhost
// @include       http://*youtube.com*
// @include       https://*youtube.com*
// @exclude       http://*youtube.com/
// @grant         none
// ==/UserScript==

function noAutoPlay() {
  if(document.embeds.length!=0)
    document.body.removeEventListener("DOMNodeInserted",noAutoPlay,false);
  for(i in document.embeds) {
    var source = document.getElementById(document.embeds[i].getAttribute("id")).parentNode;
    var attr = source.innerHTML;
    attr = attr.replace(/(ad_module|ad._module|autoplay|ad_[a-z_]+)=[^&]+?/gi,"");
    attr = attr.replace(/(flashvars=\"[^\"]+)/g,"$1&amp;autoplay=0");
    attr = attr.replace(/(&amp;){2,}/gi,"&amp;");
    source.innerHTML = attr;
  }
};

if(document.embeds.length==0) {
  document.body.addEventListener("DOMNodeInserted",noAutoPlay,false);
} else {
    noAutoPlay();
  return
};