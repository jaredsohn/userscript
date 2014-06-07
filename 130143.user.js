// Better Facepuch Logo
// By Hazard
//
// ==UserScript==
// @name          realistic facepunch logo
// @namespace     http://facepunch.com
// @description   Replace Facepunch's current shit logo with a better one.
// @version       0.3
// @include       http://facepunch.com/*
// ==/UserScript==

if (document.getElementById('header')) {
	var addStyle = document.createElement('style');
	addStyle.type = 'text/css';
	addStyle.innerHTML = '.above_body { margin-top: -91px } #logo { width: 244px; height: 100px } #cooLogo { margin-left: 17px }';
	document.head.appendChild(addStyle);

	var logo = document.createElement('div');
	logo.id = 'cooLogo';
	logo.innerHTML = '<a href="index.php"><img src="http://dl.dropbox.com/u/68548848/the%20gug.png" alt="Cool Facepunch Logo" width="244" height="100" /></a>';
	document.body.insertBefore(logo, document.body.firstChild);

	document.getElementById('logo').innerHTML = '';
}