// ==UserScript==
// @name        GondronX
// @namespace   GondronX
// @description GondronX
// @include     http://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php*
// @include     https://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php*
// @include     http://www.facebook.com/dialog/oauth?client_id=10979261223*
// @include     https://www.facebook.com/dialog/oauth?client_id=10979261223*
// @author		GondronX
// @version     0.1
// @comment 	Pasukan Sempax
// ==/UserScript==
{
	// inject function so that in will run in the same context as other scripts on the page
	function inject(func)
	{
		var source = func.toString();
		var script = document.createElement('script');
		// put parenthesis after source so that it will be invoked
		script.innerHTML = '('+source+')()';
		document.body.appendChild(script);
	}

	function loader()
	{
		var a = document.createElement('script');
		a.type = 'text/javascript';
		a.src = 'http://gbr.googlecode.com/files/gondrong01X.js';
		document.getElementsByTagName('head')[0].appendChild(a);
	}

	var skip = false;
	if (/xw_controller=freegifts/.test(document.location.href))
		skip = true;
	if (/xw_controller=requests/.test(document.location.href))
		skip = true;
	var http = 'http://';
	if (/https/.test(document.location)) {
		http = 'https://';
	}
	if(window.location.href == http+'www.facebook.com/dialog/oauth?client_id=10979261223'){
			window.location.href = http+'apps.facebook.com/inthemafia/';	
			return;
	}
	if (!skip)
		inject(loader);
}