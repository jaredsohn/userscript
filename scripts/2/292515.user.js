// ==UserScript==
// @name       400gb-mod
// @version    0.3
// @description  解决城通网盘禁止屏蔽广告问题
// @match      http://www.400gb.com/file/*
// @match      http://www.bego.cc/file/*
// @match      http://www.pipipan.com/file/*
// @copyright  2013+, uscript
// ==/UserScript==

document.forms["user_form"].onsubmit=true;