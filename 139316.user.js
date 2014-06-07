// ==UserScript==
// @name        Putlocker Lights Out
// @namespace   Emmbrace
// @description Turns the lights off automatically on any putlocker stream. Should also work with Sockshare.
// @include     http://www.putlocker.com/file/*
// @include     http://www.sockshare.com/file/*
// @version     1
// ==/UserScript==

setTimeout(function(){
		document.getElementById('lightsOff').click();
		},500);