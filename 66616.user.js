// ==UserScript==
// @name          Youtube (No Autoplay)
// @namespace     http://localhost
// @description   Prevents autoplay.
// @include       http://*youtube.com*
// @include       https://*youtube.com*
// @exclude       http://*youtube.com/
// @version       6
// ==/UserScript==

function noAutoplay() {
  if(document.embeds.length!=0)
    document.body.removeEventListener("DOMNodeInserted",noAutoplay,false);
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
  document.body.addEventListener("DOMNodeInserted",noAutoplay,false);
} else {
  noAutoplay();
}
return;