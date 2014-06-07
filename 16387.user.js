// ==UserScript==
// @name           what time? powerd by tv
// @namespace      http://d.hatena.ne.jp/authorNari/
// @description    It is a time display only in the morning and the evening and the Lunch time.
// @include        *
// ==/UserScript==

//@ ver 1.1 authorNari
//iframe not run

(function(){
  //iframe not run
  if(window != window.parent) return;
  
  var TIME_RANGE = [{ min : 5, max : 10}, { min : 16, max : 19}, { min : 12, max : 13}];
  var is_add_event_scroll = false;
  var show_X = function() { return unsafeWindow.scrollX + 40; };
  var show_Y = function() { return unsafeWindow.scrollY + 20; };
  var scroll_interval = null;
  
  function $(id) { return document.getElementById(id)  };
  
  function watch_time() {
    if(is_display_range()) display_time();
    else hide_time();
    setTimeout(arguments.callee, 10000);
  };
  
  function what_time_now(){
    var t = new Date();
    var t_str = t.getHours() < 12 ? t.getHours() : t.getHours() - 12;
    return t_str += " : " + ( t.getMinutes() < 10 ? "0" + t.getMinutes() : t.getMinutes());
  }
  
  function display_time() {
    var t = what_time_now();
    if($('__time_tv__')) {
      $('__time_tv__').textContent = t;
      return;
    } else {
      var div = document.createElement("div");
      div.style.cssText = "position: absolute; left:" + show_X() + "px ; top: " + show_Y() + "px; font-size: 60px;z-index: 100000;";
      div.id = "__time_tv__";
      div.innerHTML = t;
      unsafeWindow.document.body.insertBefore(div, document.body.firstChild);
    }
    if(!scroll_interval)  scroll_interval = setInterval(adheres_time, 10);
  }
  
  function is_display_range() {
    now_hours =(new Date()).getHours();
    for(var i=0,len=TIME_RANGE.length; i<len; i++) {
      if(TIME_RANGE[i].min <= now_hours && now_hours < TIME_RANGE[i].max) return true;
    }
  };
  
  function hide_time() {
     if($('__time_tv__')) {
       $('__time_tv__').style.display = 'none';
       clearInterval(scroll_interval);
       scroll_interval = null;
     }
  }
  
  function adheres_time(){
    if($('__time_tv__')) {
      $('__time_tv__').style.left = show_X() + "px";
      $('__time_tv__').style.top = show_Y() + "px";
    }
  };
  
  function add_event(target, type, listener) {
    if (target.addEventListener) target.addEventListener(type, listener, true);
    else target.attachEvent('on' + type, function() { listener(unsafeWindow.event); });
  };
  
  function removeListener(target, type, listener){
    if(target.removeEventListener){
      target.removeEventListener(type, listener, false);
    }else if(target.detachEvent){
      target.detachEvent("on"+type, listener);
    }
  };

  add_event(unsafeWindow, "load", watch_time);
})();
