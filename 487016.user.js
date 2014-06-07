// ==UserScript==
// @name        uso8080
// @namespace   trespassersW
// @description    redirects userscripts.org to userscripts.org:8080
// @include *
// @exclude http*://www.google.com/reader/*
// @version 1
// @created 2014-05-13
// @updated 2014-05-13
// @run-at document-start
// @grant @GM_none
// ==/UserScript==

(function () { "use strict";
var W = (typeof unsafeWindow === "undefined" && 0) || window;
function _log(s){
 //console.log(s);
}
function toObj(s) {
	var r = {}, c = s.split('&'), t;
	for(var i = 0; i < c.length; i++) {
		t = c[i].split('=');
		r[decodeURIComponent(t[0])] = decodeURIComponent(t[1]);
	}
	return r;
}
function anchorMatch(a) {
  for(var k=0; a && k< 5; k++,a=a.parentNode) if(a.localName == 'a') return a;
  return null;
}
var re= /\buserscripts\.org\//;
function onDown(e) {
  var h, a = anchorMatch(e.target);
  if(a && a.localName == "a"){
    h=a.getAttribute("href");
    if(location.host.indexOf("google")>-1){
      var m=a.getAttribute("onmousedown");
      if(m && m.indexOf("return") == 0) { //
        a.removeAttribute("onmousedown");
      }
      if(h) {
         if(h.indexOf("http://") == 0) h = h.substr(h.indexOf("/", 7));
         else if(h.indexOf("https://") == 0)   h = h.substr(h.indexOf("/", 8));
         if(h.indexOf("/url?") == 0) {
           _log('spoil '+h);
           h = toObj(h.substr(5));
           a.setAttribute('href', decodeURIComponent(h.url || h.q));
         }
      }   
    }
  
    h=a.getAttribute("href");
//    _log('h:'+ h);
    if(!( h && re.test(h) )) return;
       h = h.replace(re,"userscripts.org:8080/").replace(/^https:/,"http:");
       a.setAttribute('href', h);
//       a.setAttribute('rel', 'noreferrer');
      _log('u8080: '+a.href);
  }
}
 W.addEventListener("mousedown", onDown, true);
 _log('uso8080')
})();
