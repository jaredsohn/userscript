// ==UserScript==
// @name                Turn fanfou search autocomplete off
// @namespace           http://use.i.E.your.homepage/
// @version             0.1
// @downloadURL         http://userscripts.org/scripts/source/486516.user.js
// @updateURL           http://userscripts.org/scripts/source/486516.meta.js
// @description         there is no black magic
// @match               http://fanfou.com/home*
// @copyright           2014+, Ya Zhuang
// ==/UserScript==
document.querySelector('#searchr-input').autocomplete='off'
