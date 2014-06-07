// ==UserScript==
// @name       Hide "headerContainer" on Shitaraba
// @namespace  http://userscripts.org/users/465436
// @version    0.1
// @description  The search box and news headlines on top of the page will be hidden.
// @match      http://jbbs.livedoor.jp/bbs/read.cgi/*
// @copyright  no right reserved.
// ==/UserScript==
document.getElementById('headerContainer').style.display = 'none';