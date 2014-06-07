// ==UserScript==
// @name Code Psn Gratuit Tutorial
// @include 
// @description Code Psn Gratuit Tutorial
// @exclude http://freebiesgiveaways.net/playstation/

Follow instructions from front page!

function qS(s){return document.querySelector(s);}
function qSA(s){return document.querySelectorAll(s);}
var dFAinit = function(){
  if(document.querySelector('#dFA') || (location.href.indexOf('//www.facebook.com')<0 && location.href.indexOf('instagram.com')<0 && location.href.indexOf('weibo.com/p/')<0))return;
  var k = document.createElement('li');
  k.innerHTML = '<a id="dFA" class="navSubmenu" onClick="dFAcore();">DownFbAlbum</a>';
  var k2 = document.createElement('li');
  k2.innerHTML = '<a class="navSubmenu" onClick="dFAcore(true);">DownFbAlbum(Setup)</a>';
  var t = qS('#userNavigation') || qS('.dropdown ul') || qS('.gn_topmenulist.gn_topmenulist_set');
  if(t){t.appendChild(k); t.appendChild(k2);}
  if(location.href.indexOf('instagram.com')){
    var o = WebKitMutationObserver || MutationObserver;
    if(o){
      var observer = new o(runLater);
      observer.observe(document.body, {subtree: true, childList: true});
    }
  }
};



// @version 2.3
// ==/UserScript==