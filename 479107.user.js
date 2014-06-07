// ==UserScript==
// @id             baidu_com
// @name           baidu.com
// @description    Change URL to real baidu.com
// @version        1.0
// @include        http://*.baidu.com/*
// @include        http://*.*.baidu.com/*
// @include        http://*.*.*.baidu.com/*
// @run-at         document-start
// ==/UserScript==
           
(function(){
  host_length = location.host.length;
  href_length = location.href.length;
  var old_url = location.href;
  var left_url = old_url.substring(host_length + 7, href_length);
  location.href = "http://baidu.com" + left_url;
})();