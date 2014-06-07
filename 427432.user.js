// ==UserScript==
// @name         Instapaper BackHome Button
// @description  Add a backhome button at the top bar
// @author       wenLiangcan
// @version      0.1
// @namespace    https://github.com/wenLiangcan
// @homepage     https://github.com/wenLiangcan/Userscripts
// @license      GPL version 3 (http://www.gnu.org/licenses/gpl.txt)
// @copyright    Copyright © 2014 wenLiangcan
// @updateURL    http://userscripts.org/scripts/source/427432.user.js
// @downloadURL  http://userscripts.org/scripts/source/427432.user.js
// @include      http://www.instapaper.com/read/*
// @include      https://www.instapaper.com/read/*
// @run-at       document-end
// @grant        GM_addStyle
// ==/UserScript==

GM_addStyle("#controlbar_container a .icon-home { top: 1px;}");
var left = document.getElementsByClassName('buttons')[0];
var bk = left.firstElementChild.cloneNode(true);
bk.title = 'Back Home';
bk.href = 'http://www.instapaper.com/';
bk.firstElementChild.className = 'icon icon-home';
left.insertBefore(bk, left.firstChild);
