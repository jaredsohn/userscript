// ==UserScript==
// @name           quiet WebQQ
// @namespace      http://lilydjwg.is-programmer.com/
// @description    来消息时不要滚动标题栏
// @include        http://web.qq.com/main.shtml?*
// ==/UserScript==

window.clicker = function(){
  var evt = document.createEvent("MouseEvents");
  evt.initMouseEvent("click", true, false, window,
    0, 0, 0, 0, 0, false, false, false, false, 0, null);

  var edits = document.getElementsByClassName('editArea');
  for(var i=0, len=edits.length; i<len; i++){
    edits[i].dispatchEvent(evt);
  }
};

//最多滚动三秒好了
setInterval(window.clicker, 3000);
