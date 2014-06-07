// ==UserScript==
// @name           megaXHR
// @namespace      reuppergm
// @description    Allows reUpper to access Megaupload directly from within your browser.
// @include        https://reupper.com/*
// @include        http://reupper.com/*
// @include        https://www.reupper.com/*
// @include        http://www.reupper.com/*
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
}, 80);

function gmAjax(obj){
  ajaxQueue.push(obj);
}

// yay, UNSAFE >:D
unsafeWindow.megaXHR = gmAjax;
unsafeWindow.megaXHRVer = 2;