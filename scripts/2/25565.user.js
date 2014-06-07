// ==UserScript==
// @name           FackLDSCounter
// @namespace      3
// @description    Удаляет счетчик с http://upload.lds.net.ua/.
// @include        http://upload.lds.net.ua/*
// ==/UserScript==


window.addEventListener(
 'load',
 function()
 {
	if (unsafeWindow.countdown)
	{
		document.getElementById("dl").innerHTML = '<a href="' + unsafeWindow.countdown.toString().match(/http:\/\/upload.lds.net.ua[^\\']+/) + '">Download</a>';
	 	unsafeWindow.countdown = function(){}
	}
 	},
 	true
);
