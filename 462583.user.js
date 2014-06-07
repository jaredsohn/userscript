// ==UserScript==
// @name          power for lqigong
// @namespace     http://www.userscripts.org/coco
// @grant                GM_getValue
// @grant                GM_setValue
// @grant                GM_addStyle
// @grant                GM_registerMenuCommand
// @grant                GM_deleteValue
// @grant                GM_xmlhttpRequest
// @grant                GM_openInTab
// @grant                GM_getResourceText

// @include       http://lqigong.pixnet.net/blog*
// @exclude       http://board.*.ikariam.gameforge.com*
// @exclude       http://*.ikariam.gameforge.*/board

// @require              http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @require              http://snchun.net/jsextends/jquery.cookie.js

// @description   power for lqigong
// @version       0.1
// ==/UserScript==

function click_captureSmuglersBtn() {

    window.location.reload();
}


var delay = 28000;
var int1 = setTimeout(click_captureSmuglersBtn, delay);