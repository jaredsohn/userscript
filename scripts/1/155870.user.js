// ==UserScript==
// @name       Fix sohu focus first page link Userscript
// @namespace  http://jollychang.com/
// @version    0.1
// @description  first_page_link
// @match      http://home.focus.cn/msgview/607/*.html
// @copyright  2012+, William Zhang
// ==/UserScript==
var first_page_link = document.querySelector("a[title*=首页]");
var fix_link = first_page_link.href.replace("msgview/607","msgview/607/1");
first_page_link.setAttribute('href', fix_link)