// ==UserScript==
// @id             AR+4G+
// @name           Auto Refresh+ for Google plus
// @version        1.12
// @namespace      IFFY
// @author         林沐雨
// @description    Restore auto-refresh feature for Google+.
// @include        https://plus.google.com/*
// @run-at         document-end
// ==/UserScript==

autoRefresh();

function outerHTML(node){
    // if IE, Chrome take the internal method otherwise build one
  return node.outerHTML || (
      function(n){
          var div = document.createElement('div'), h;
          div.appendChild( n.cloneNode(true) );
          h = div.innerHTML;
          div = null;
          return h;
      })(node);
  }

function autoClick(){
var taglist = document.body.querySelectorAll('div[tabindex][role=button]:not([aria-haspopup])');
for (var index = 0; index < taglist.length; index++) {
	var htmlstring=outerHTML(taglist[index]);
	if(htmlstring.indexOf("新信息加载通知") >=0 || htmlstring.indexOf("載入最新訊息通知") >=0 || htmlstring.indexOf("新しい投稿のお知らせを読み込みます") >=0 || htmlstring.indexOf("Load new post notification") >=0){
	//alert(taglist[index]);
	(taglist[index]).click();
	break;
	}
}}

function autoRefresh() {
	if (window.top != window.self)
    return;
var whereIs;
whereIs= document.documentElement.scrollTop+document.body.scrollTop;
	if (whereIs  <= 200){
autoClick();}
clearTimeout(autoRefreshTrigger);
var autoRefreshTrigger = setTimeout(autoRefresh, 3000);
};