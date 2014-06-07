// ==UserScript==
// @name        OneManga rotate 
// @namespace   http://blog.leirahua.com/
// @description Rotate manga image 270 degree
// @creator     Leira Hua |leirahua<at>gmail<dot>com|
// @source      http://userscripts.org/scripts/show/80006
// @identifier  http://userscripts.org/scripts/source/80006.user.js
// @include     http://*.onemanga.com/*/*/*
// @version     0.1
// @date        2010-6-25
// ==/UserScript==

// Changelog
// ==========
// 0.1 - First release

(function() {
	GM_addStyle("img.manga-page { -webkit-transform: rotate(-270deg); }");
})();

