// ==UserScript==
// @name            AutoPokeBack
// @namespace       http://www.facebook.com/pokes
// @version         1.0.1
// @author          Atsushi Nagase
// @description     Poke back automatically
// @match           http://www.facebook.com/*
// @match           https://www.facebook.com/*
// @updateVersion   2
// ==/UserScript==

window.top != window.self || window.autoPokeBack || function(links, a, ref, e){
  setInterval(function(){
    links = document.querySelectorAll("a"); 
    for(var i=0;i<links.length;i++) {
      a=links[i];
      ref=a.getAttribute("ajaxify");
      if(/^\/ajax\/pokes\/poke_inline\.php\?uid=\d+&pokeback=1/.test(ref)) {
        e = document.createEvent('MouseEvents');
        e.initEvent('click',true,true);
        a.dispatchEvent(e);
        console.log("[AutoPokeBack] sent:" + ref);
      }
    }
  }, 500);
  console.info("[AutoPokeBack] started in " + document.location.pathname);
  window.autoPokeBack = true;
}();