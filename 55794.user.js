// ==UserScript==
// @name           focalprice.com sorting fixed
// @namespace      focalprice
// @description    Fixes sorting reseting when moving to next page at FocalPrice.com
// @include        http://www.focalprice.com/goods.aspx?*
// ==/UserScript==

var links = document.getElementsByTagName('a');

for (i = 0; i < links.length; i++) {
  if (/goods.aspx\?/.test(links[i].href)) {
    links[i].href = links[i].href.replace('Action=', 'sortby=');
  }
}


unsafeWindow.gono = function (startnum) {
  var matches = /classid=([0-9]+)/.exec(window.location.search);
  var classid = (matches && matches[1]) || 0;
  
  matches = /((sortby)|(Action))=([^&?]+)/i.exec(window.location.search);
  var sortby = (matches && matches[4]) || '';
  
  matches = /ActionShow=([^&?]+)/i.exec(window.location.search);
  var actionshow = (matches && matches[1]) || '';
  
  var href = 'goods.aspx?startnum='+startnum+'&classid='+classid+'&sortby='+sortby+'&ActionShow='+actionshow;
  window.location.href = href;
}