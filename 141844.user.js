// ==UserScript==
// @name        Functional notice sound for SKOUT
// @description Replaces the default chat notification sound with an ogg for it to play without plugins in firefox. The audio file is in my own hosting until I find an audio host that accepts ogg or something like that
// @namespace   ein
// @include     http://www.skout.com/*
// @include     https://www.skout.com/*
// @version     1.5.1
// ==/UserScript==

unsafeWindow.playSound = function () {
	try {
		if("true" == unsafeWindow.getCookie("Freya.global.disableSound")){
			return false;
		}
		document.getElementById("__notice").innerHTML= "<audio autoplay='autoplay'><source src='http://loop-sistemas.com.ar/notice.ogg' type='audio/ogg' /><\/audio>";
    } catch (err) {}
	return true;
 }