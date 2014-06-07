// ==UserScript==
// @name Test Intergration
// @namespace Test Intergration
// @description Adds Somthing to the page
// @include http://*.astroempires.com/*
// @include http://astroempires.com/*

// ==/UserScript==


var chatDiv = document.createElement('div');
	chatDiv.innerHTML = '<div style = "padding-bottom: 15px"><div style="width:555px"><style>.mcrmeebo { display: block; background:url("http://widget.meebo.com/r.gif") no-repeat top right; } .mcrmeebo:hover { background:url("http://widget.meebo.com/ro.gif") no-repeat top right; } </style><object id="Meebo1" width="555" height="321"><param name="movie" value="http://widget.meebo.com/mcr.swf?id=jNNlYinXDE"></param><embed id="meebo" src="http://widget.meebo.com/mcr.swf?id=jNNlYinXDE" type="application/x-shockwave-flash" width="555" height="321" /></object></div></div>';
chatDiv.id = 'embedChat';

document.body.insertBefore(chatDiv, document.body.firstChild);