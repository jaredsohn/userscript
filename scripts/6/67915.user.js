// ==UserScript==
// @name           Disable HDC's Exchage Title Button
// @namespace      HDChina
// @description    Disable this button to avoid bonus lost:)
// @include        http://*.hdchina.org/mybonus.php
// @include        https://*.hdchina.org/mybonus.php
// @include        http://hdchina.org/mybonus.php
// @include        https://hdchina.org/mybonus.php
// ==/UserScript==
// auther:  lucaslee http://hi.baidu.com/lucas/profile
// version: 0.1 2010-02-03
//
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// =============================

var btns = document.getElementsByName('submit');
if (btns.length){
	btns[6].disabled=true;
};
GM_registerMenuCommand("HDC 20000", function() {
	btns[6].disabled = !btns[6].disabled;
});
