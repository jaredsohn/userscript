// ==UserScript==
// @name           from iTunes app store to web store
// @namespace      http://efcl.info/
// @description    Redirect iTunes app store to web store
// @include        http://itunes.apple.com/WebObjects/*
// ==/UserScript==
(function(){
	var URL = location.href;
	var urls_def = /itms%253A%252F%252Fitunes\.apple\.com.*?id%253D(\d+)/i;
	var m = (URL.match(urls_def)||[])[1];
	if(m){
		location.href = "http://app-store.appspot.com/?url=viewSoftware?id=" + m;
	}else{
	  return
	}
})();

