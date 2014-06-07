// ==UserScript==
// @name		Script skeleton
// @namespace		http://userscripts.org/users/471458
// @author		pegasusph
// @description		The bare minimum to start a JQuery-powered script.
// @include		http://*
// @include		https://*
// @version		1
// ==/UserScript==

function addJQuery(callback)
{
	// Inject JQuery into body
	var script = document.createElement('script');
	script.setAttribute('src', 'http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js');

	// Wait for load event, inject callback function into document so it will exist
	script.addEventListener('load', function() {
		var script = document.createElement('script');
		script.textContent = '(' + callback.toString() + ')();';
		document.body.appendChild(script);
	}, false);

	document.body.appendChild(script);
}

function main()
{
	
}

addJQuery(main);