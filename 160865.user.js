// ==UserScript==
// @name        Livestream widescreen fix
// @namespace   http://www.livestream.com
// @version     0.3.2
// @description expand the video on livestream.com while keeping the chat visible
// @author      Nickel
// @copyright   2014, Nickel
// @grant	GM_addStyle
// @include     http://www.livestream.com/*
// @downloadURL http://userscripts.org/scripts/source/160865.user.js
// @updateURL   http://userscripts.org/scripts/source/160865.meta.js
// ==/UserScript==
/*
    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.
*/

(function(){

// don't run in frames
if (frameElement){ return; }

// fallback (Chrome lacks GM functions)
if( typeof GM_addStyle != 'function' ) {
	function GM_addStyle(css) {
		var head, style;
		head = document.getElementsByTagName('head')[0];
		if( !head ){ return; }
		style = document.createElement('style');
		style.type = 'text/css';
		style.innerHTML = css;
		head.appendChild(style);
	}
}

// expand
document.getElementById("content").className = document.getElementById("content").className + " expanded";
document.getElementById("expand-channel-player").className = document.getElementById("expand-channel-player").className + " expanded";

// fix widths
GM_addStyle("#main {width:1280px !important;}");

GM_addStyle("#main-top {width:1310px !important;}");
GM_addStyle("#top-header {width:1280px !important;}");

GM_addStyle("#main-bottom {width:1310px !important;}");
GM_addStyle("#top-bottom {width:1280px !important;}");
GM_addStyle("#footer-main-bottom {width:1280px !important;}");

GM_addStyle("#main .box-wrap:not(#channel-chat):not(#like):not(#adContainer):not(#related-channels) {width:912px !important;}");
GM_addStyle("#main #channel-about .content {width:720px !important;}");
GM_addStyle("#main .box .footer {width:910px !important;}");

})();