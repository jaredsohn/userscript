// ==UserScript==
// @name        liteforex
// @namespace   forex
// @include     http://www.liteforex.ru/promo/demo-contests/*/rating/
// @version     1
// ==/UserScript==
var win = (typeof(unsafeWindow) != 'undefined' ? unsafeWindow : top.window);
$=win.$;
alert('paleshuk - '+$('table.contest-table tr:gt(0)>td:contains("paleshuk")').prev().text()+' - '+$('table.contest-table tr:gt(0)>td:contains("paleshuk")').next().next().text()+'\nvovan - '+$('table.contest-table tr:gt(0)>td:contains("vovan")').prev().text()+' - '+$('table.contest-table tr:gt(0)>td:contains("vovan")').next().next().text());