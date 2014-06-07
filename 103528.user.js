// Running Unicorn user script
// version 1.0
// 25/05/2011
// Copyright (c) 2011, Louis Brunner
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: https://addons.mozilla.org/en-US/firefox/addon/748
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Bashfr's Notes", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name           Running Unicorn
// @namespace      http://www.hyrrmadr.net/
// @description    Always keep your Running Unicorn with you on the Internet.
// @include        *
// ==/UserScript==

// Récupération du body
var body = document.getElementsByTagName('body')[0];

	// Création de l'élément frame
	frame = document.createElement('div');
	body.appendChild(frame);
	frame.setAttribute('id', 'running-unicorn');
	if(navigator.userAgent.indexOf("Firefox") != -1)
	{
		frame.setAttribute('style', 'position:fixed; right:0; bottom:0; padding:1%; border-top: solid 3px black; border-left: solid 3px black; -moz-border-radius:25px 0px 0px 0px; background:-moz-repeating-linear-gradient(90deg, purple 4px, indigo 12px, blue 22px, green 32px, yellow 40px, orange 48px, red 58px, purple 64px); max-width:10%;');
	}
	else
	{
		frame.setAttribute('style', 'position:fixed; right:0; bottom:0; padding:1%; background: url(http://media02.hongkiat.com/colorfulwp/rainbow.jpg) white; border-top: solid 3px black; border-left: solid 3px black; -webkit-border-radius:25px 0px 0px 0px; max-width:10%;');
	}
	
	// Création de l'élément img
	img = document.createElement('img');
	frame.appendChild(img);
	img.setAttribute('id', 'running-unicorn-img');
	img.setAttribute('src', 'http://www.icone-gif.com/gif/animaux/chevaux/cheval082.gif');
	img.setAttribute('alt', 'Running Unicorn...');
	img.setAttribute('title', 'Souris !');
	img.setAttribute('style', 'max-width:100%;');
	img.setAttribute('onClick', 'javascript:alert("A gift for Morgane !");');