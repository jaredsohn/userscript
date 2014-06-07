// ==UserScript==
// @name           PutSock Cinema
// @namespace      http://userscripts.org
// @description    Autoscrolls Cinema Video for Putlocker and Sockshare
// @include        http://*.putlocker.*/*
// @include        http://*.sockshare.*/*
// @include        http://putlocker.*/*
// @include        http://sockshare.*/*
// ==/UserScript==
var player=$("player");

function fitToWindow() {
	player.style.marginLeft = (window.innerWidth >= 960 ? (985 - window.innerWidth) / 2 : "0") + "px";
	player.style.width = (window.innerWidth-30) + "px";
	player.style.height = (window.innerHeight-50) + "px";
	window.setTimeout(fitToWindow, 500);
}

function $(A) {
	return document.getElementById(A);
}
			
fitToWindow();
GM_addStyle(".watch-wide-mode, #player, #player {padding-left:3px!important}");