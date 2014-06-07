// ==UserScript==
// @name           StreamMV Include (Essential)
// @namespace      StreamMV Include (Essential)
// @description    StreamMV Include is an essential userscript that MUST be installed if you want StreamMV.Net to work for you.
// @include        http://www.streammv.net/*
// @include        http://streammv.net/*
// ==/UserScript==
var ajaxQueue = [];
var processAjaxQueue = function(){
  if (ajaxQueue.length > 0) {
    for (ajax in ajaxQueue) {
      var obj = ajaxQueue[ajax];
      // http://diveintogreasemonkey.org/api/gm_xmlhttprequest.html
      GM_xmlhttpRequest(obj);
    }
    ajaxQueue = [];
  }
}
setInterval(function(){
  processAjaxQueue();
}, 100);

function gmAjax(obj){
  ajaxQueue.push(obj);
}
unsafeWindow.streammv = gmAjax;