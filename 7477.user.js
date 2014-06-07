// ==UserScript==
// @name           romhustler instant leecher
// @namespace      http://www.kbstyle.net/program/greasemonkey/index.html
// @description    This userscript leeches any rom without the need to wait on romhustler.net
// @include        http://romhustler.net/rom/*
// @include        http://romhustler.net/download/*
// ==/UserScript==

(function(){
	//we are on a download gate page
	if (document.location.href.indexOf('http://romhustler.net/rom/') == 0) {
		var allUrls, thisUrl;
		allUrls = document.getElementsByTagName('a');
		for (var i = 0; i < allUrls.length; i++) {
			thisUrl = allUrls[i];
			if (thisUrl.text == "Download this rom") {
				document.location.href=thisUrl.href;

			}
		}		
	}
	//we are on a direct download page
	else {
		document.location.href=document.body.innerHTML.slice(document.body.innerHTML.indexOf('link = \'')+8,document.body.innerHTML.indexOf('\';'));
	}

})();