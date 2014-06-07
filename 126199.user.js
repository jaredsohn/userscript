// ==UserScript==
// @name           EG Gone Wide
// @namespace      http://www.eurogamer.it
// @description    EuroGamer Forum Widescreen version
// @include        http://www.eurogamer.it/forum/thread*
// @author		   megalomaniac
// ==/UserScript==


	function addGlobalStyle(css) {
		var head, style;
		head = document.getElementsByTagName('head')[0];
		if (!head) { return; }
		style = document.createElement('style');
		style.type = 'text/css';
		style.innerHTML = css;
		head.appendChild(style);
	}
	
	addGlobalStyle('#theTop {width:100% !important;} ');
	addGlobalStyle('#page {width:100% !important;} ');
	addGlobalStyle('#content.forum { width: 100% !important;}');
	addGlobalStyle('div.content { width: 90% !important;}');
	addGlobalStyle('div.post { float:left !important; width: 80% !important;}');	
	addGlobalStyle('#reply { width: 97% !important;}');
	addGlobalStyle('#reply div { width: 75% !important;}');
	addGlobalStyle('#sidebar { width: 10% !important; top: 0px !important;}');
	addGlobalStyle('li.follow { width: 80% !important;}');
	addGlobalStyle('#sidebar li.social { width: 80% !important;}');
	addGlobalStyle('li.category { width: 80% !important;}');
	addGlobalStyle('p.breadcrumb { width: 98% !important; margin-left:0px !important;}');
	addGlobalStyle('#sidebar a.tool.plain { width: 60% !important;}');
	addGlobalStyle('#browserMaster.portable { width: 100% !important;}');
	
	addGlobalStyle('div.poster.avatars { width: 180px !important;}');
	addGlobalStyle('div.poster.avatars img { width: 100px !important; height: 100px !important;}');
	addGlobalStyle('div.poster.avatars div { margin-top: 110px !important; margin-left: 12px !important;}');
	
	addGlobalStyle('iframe.youtube-player { width: 560px !important;}');