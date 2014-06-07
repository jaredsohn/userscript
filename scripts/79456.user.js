// ==UserScript==
// @name           renren auto-disconn
// @namespace      foxwoods.cn@gmail.com,2010-06-16:WJY
// @description    disconnect the renren webIM at first time
// @include        http://www.renren.com/*
// @include        http://www.xiaonei.com/*
// ==/UserScript==

(function(){

var w = (typeof unsafeWindow === 'undefined') ? window : unsafeWindow;
var xwm = w.XN.webpager.mgr;

function disConn() {
  var i=0, h;
  h = setInterval(function(){
    if(i++>=300) {
      clearInterval(h);
      xwm.delEvent('mgr_connecting', disConn);
    }
    xwm.disConnect();
  }, 100);
}

xwm.addEvent('mgr_connecting', disConn);

})()
