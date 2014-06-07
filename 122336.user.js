// By kurabiyecanavari
// ==UserScript==
// @id             rainymood
// @name           Rainymood Cleanifier
// @namespace      http://www.rainymood.com/
// @version        0.1
// @description    Clears out everything but the video on Rainymood.com
// @include        http://www.rainymood.com/
// ==/UserScript==

var addStyle = document.createElement('style');
addStyle.type = 'text/css';
addStyle.innerHTML = 'body div { display: none !important } h1 { display: none !important } body p { display: none !important } #volumeDiv { display: block !important } #video { display: block !important }';
document.head.appendChild(addStyle);