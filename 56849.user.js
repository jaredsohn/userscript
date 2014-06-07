// ==UserScript==
// @name           My Enemies
// @namespace      soup-io
// @include        http://soup.io/*
// @include        http://*.soup.io/*
// ==/UserScript==
document.getElementById("menu").innerHTML = document.getElementById("menu").innerHTML
	.replace(/Friends of friends/g,"Enemies of enemies")
	.replace(/My friends/g,"My Enemies")
	.replace(/Freunde/g,"Feinde");
