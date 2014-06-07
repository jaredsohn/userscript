// ==UserScript==
// @name        Refresh
// @namespace   Mana
// @version     1.0.0
// @description Auto-refresh JVC Forum pages
// @include     http://www.jeuxvideo.com/forums/0-*.htm
// @include     http://www.jeuxvideo.com/forums/1-*.htm
// @copyright   2013, Luthien Sofea Elanesse
// @copyright   <jeuxvideo.nyu@gmail.com>
// @grant       none
// ==/UserScript==

(function () {
	"use strict";
	setTimeout(function () {location.reload();}, 20000);
}());



