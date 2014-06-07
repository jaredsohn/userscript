// ==UserScript==
// @name           FlashWmode
// @namespace      http://d.hatena.ne.jp/Cherenkov/
// @description    http://userscripts.org/topics/3090
// @include        http*
// ==/UserScript==

(function(){
var ems = document.getElementsByTagName('embed');
for (var i=0; i < ems.length; i++) {
  var em = ems[i];
  if ((em.getAttribute('wmode') == null) && (em.getAttribute('type') == "application/x-shockwave-flash")) {
    var ep = em.parentNode;
    if(ep.tagName.toLowerCase() == 'object') {
      var prs = ep.getElementsByTagName('param');
      for(var j=0; j < prs.length; j++) {
        if(prs[j].name == 'wmode') {
          return;
        }
      }
      em.setAttribute('wmode', 'opaque');
      ep.insertBefore(em, em.nextSibling);
    }
    else{
      em.setAttribute('wmode', 'opaque');
      ep.insertBefore(em, em.nextSibling);
    }
  }
}
})();