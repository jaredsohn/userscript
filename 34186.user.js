// ==UserScript==
// @name	AutoProxy - Monster Proxy - Demonoid
// DESENVOLVIDO POR ESPECTRAL
// @namespace
// @include	http*://www.demonoid.com/*
// @include	http://monsterproxy.net/index.php
// @description	Usa o MONSTER PROXY pra conectar no demonoid
// ==/UserScript==


if (controle="on") {
	window.location.href="http://monsterproxy.net/browse.php?u=%3A%2F%2Fwww.demonoid.com&b=28";
	var controle="off";
}
if (controle=null) {
	var controle="on";
	window.location.href="http://monsterproxy.net/";
}
