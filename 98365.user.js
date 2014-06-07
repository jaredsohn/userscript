// ==UserScript==
// @name           0-width-table Fixer for Firefox
// @include        *
// @author         congxz6688
// ==/UserScript==



var cssStyle = "";
cssStyle += ".t_table {width: 100% !important ;}";
GM_addStyle(cssStyle);

