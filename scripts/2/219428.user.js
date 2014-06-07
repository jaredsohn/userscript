// ==UserScript==
// @name       Youtube fix
// @namespace  http://www.youtube.com
// @version    0.1
// @description  Remove shits from youtube.com
// @include        http://*youtube.com*
// @include        https://*youtube.com*
// @copyright  2013+, Kursion
// @require http://code.jquery.com/jquery-latest.js
// ==/UserScript==
var hideUIX = function (){
	$(".yt-uix-close").click();
};

setTimeout(hideUIX, 1000);