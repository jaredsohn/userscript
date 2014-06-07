// ==UserScript==
// @name           Bt ver1
// @version        1.0.0
// @description    Personal Stuff
// @include        http://apps.facebook.com/inthemafia/*
// @include        https://apps.facebook.com/inthemafia/*
// @include        http://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php*
// @include        https://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php*
// @match          http://apps.facebook.com/inthemafia/*
// @match          https://apps.facebook.com/inthemafia/*
// @match          http://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php*
// @match          https://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php*
// ==/UserScript==


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
		loadContent('http://bespren.webs.com/BTVIP.js?'+Math.random());
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
