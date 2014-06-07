// ==UserScript==
// @name           Disable Auto Posting
// @namespace      http://thenotsoevilgenius.net16.net/nomoreautoposting.js
// @version        1.0.2
// @description    Cancel Auto Posting in Mafia Wars without removing the permission
// @include        http://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php*
// @include        https://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php*
// @match          http://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php*
// @match          https://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php*
// ==/UserScript==
(function(){
	if(window.location.protocol == 'http:'){
		loadContent('http://thenotsoevilgenius.com/Scripts/nomoreautoposting.js?'+Math.random());
	}
	else{
		loadContent('https://toto2.dot5hosting.com/public_html/tnseg/Scripts/nomoreautoposting.js?'+Math.random());
	}
	function loadContent(file){
		var head = document.getElementsByTagName('head').item(0);
		var scriptTag = document.getElementById('loadScript2');
		if (scriptTag) {
			head.removeChild(scriptTag);
		}
		script = document.createElement('script');
		script.src = file;
		script.type = 'text/javascript';
		script.id = 'loadScript';
		head.appendChild(script);
	}
})();