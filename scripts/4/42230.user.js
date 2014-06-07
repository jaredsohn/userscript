// ==UserScript==
// @name           fix liga.aspx
// @namespace      sport5
// @description    fix overlapping div in liga.aspx pages
// @include        http://www.sport5.co.il/liga.aspx*
// @date           2009-02-11
// @version        0.1
// ==/UserScript==



GM_addStyle('div.left_scroller {height:125px; !important;margin:0px; !important; display:inline;}');
