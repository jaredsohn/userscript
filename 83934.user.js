// ==UserScript==
// @name           Seesmic web - just columns
// @namespace      http://seesmic.com/web
// @description    Hide the left and shrink the top menus in Seesmic web
// @include        http://seesmic.com/web/*
// ==/UserScript==

document.getElementById('headerTopPanel').style.display = 'none';
document.getElementById('headerPanel').style.height = '20px !important';
document.getElementById('headerPanel').parentNode.height = '20px';
document.getElementById('sideBarPanel').style.display = 'none';
document.getElementById('tabs').style.display = 'none';