// ==UserScript==
// @name        Enable copy for cafe.daum.net
// @description Allow selecting, copying and right clicking in cafe.daum.net and blog.daum.net, which my wife uses everyday.
// @namespace   Phoenix Xie
// @include     http://cafe*.daum.net/*
// @include     http://blog.daum.net/*
// @version     1.2
// @grant       GM_setValue
// @grant       GM_getValue
// @grant       GM_log
// @grant       GM_addStyle
// ==/UserScript==

if (window.top == window.self) {
  return;
}

(function() {
  var f = window.self;
  var doc = f.document;
  var frame_body = doc.getElementsByTagName('body')[0];

  var donothing = function(event) {
  	event.stopImmediatePropagation();
  	return true;
  };
  frame_body.addEventListener('contextmenu', donothing, true);
  frame_body.addEventListener('keydown', donothing, true);
  frame_body.addEventListener('keyup', donothing, true);
  frame_body.addEventListener('mouseup', donothing, true);
  frame_body.addEventListener('mousedown', donothing, true);
  frame_body.addEventListener('dragstart', donothing, true);
  frame_body.addEventListener('selectstart', donothing, true);
  frame_body.addEventListener('copy', donothing, true);
  
  (function(css) {
    var head = doc.getElementsByTagName("head")[0];
    if (head) {
      var style = doc.createElement("style");
      style.textContent = css;
      style.type = "text/css";
      head.appendChild(style);
    }
  })('body, body * { -moz-user-focus:normal; -moz-user-select:text; -webkit-user-select:text; user-select:text; }');
})();
