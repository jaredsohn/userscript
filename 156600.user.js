// ==UserScript==
// @name                Bypass adf.ly
// @description	        Stop waiting for adf.ly to load
// @include		http://adf.ly/*
// ==/UserScript==
unsafeWindow.document.getElementsByTagName("iframe")[0].src='';
unsafeWindow.document.getElementsByTagName("iframe")[0].style.backgroundColor='#0a3459';
unsafeWindow.countdown = 0;
GM_log(unsafeWindow.countdown);
document.getElementById("please_wait").style.display = 'none';
document.getElementById("skip_button").style.display = '';
unsafeWindow.counter();