// ==UserScript==
// @name           Spockholm Mafia Toolbar
// @namespace      http://www.spockholm.com/toolbar
// @version        1.0.1
// @description    Bookmarklet loader for the Spockholm Mafia Tools
// @include        http://apps.facebook.com/inthemafia/*
// @include        https://apps.facebook.com/inthemafia/*
// @include        http://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php*
// @include        https://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php*
// @match          http://apps.facebook.com/inthemafia/*
// @match          https://apps.facebook.com/inthemafia/*
// @match          http://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php*
// @match          https://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php*
// ==/UserScript==
// $Id: spockholm_toolbar_lite.user.js,v 1.8 2012-10-10 09:29:05 martin Exp $

(function(){
	if (/html_server/.test(document.location.href)) {
		var div = document.createElement("div");
		div.id = 'spockholm_toolbar';
		var game = document.getElementById('final_wrapper');
		game.insertBefore(div,game.firstChild);
		if (typeof $ == 'undefined') {
			$ = unsafeWindow.$;
		}
		window.smtool_loader = unsafeWindow.smtool_loader = 1;
		//loadContent('http://cdn.spocklet.com/spockholm_toolbar.js?'+Math.random());
		loadContent('https://spocklet-spockholmmafiato.netdna-ssl.com/spockholm_toolbar.js?'+parseInt(new Date().getTime().toString().substring(0, 6)));
	}
	else {
		document.getElementsByClassName('fixedAux')[0].parentNode.removeChild(document.getElementsByClassName('fixedAux')[0])
	}

	function ping_server(server) {
		if (server == 'primary') {
			server = 'spocklet.com';
		}
		if (server == 'secondary') {
			server = 'backup.spocklet.com';
		}
		var img = new Image();
		img.onload = function() {
			return true;
		}
		img.src = 'http://'+server+'/ping.gif';
	}
	
	function loadContent(file){
		var head = document.getElementsByTagName('head').item(0);
		var scriptTag = document.getElementById('loadScript');
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
