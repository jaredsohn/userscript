// ==UserScript==
// @name           Baidu Space Tipbox Remover
// @author         shinewave
// @namespace      cx48031@gmail.com
// @description    Remove Tipbox of Baidu Space
// @include        http://hi.baidu.com/*

// @version        0.1
// @license        GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @run-at         document-start
// ==/UserScript==
function removeTipbox() {
	tipbox = document.getElementsByClassName("x-tip-content-box")[0];
	tipTop = tipbox.parentNode.parentNode;
	tipTop.parentNode.removeChild(tipTop);
}

removeTipbox();