// ==UserScript==
// @name       紫荆top栏fixed
// @namespace  http://userscripts.org/users/hsinchu
// @version    0.1
// @description  
// @match      http://zijingbt.njuftp.org/*
// @copyright  2012+, Hsinchu
// ==/UserScript==

var styleEl = document.createElement('style');
styleEl.type = 'text/css';
styleEl.innerHTML = 'div.top_tool_left,div.top_menu_left,div.top_menu_left_fixed,div.top_tool_right {    position: fixed;    top: 30px;}table.top_bar {    border-bottom-width: 2px;    border-color: purple;    border-radius: 0px;    border-style: solid;    margin-left: -8px;    margin-top: -34px;    position: fixed;}table.top_header {    margin-top: 34px;}';
document.documentElement.appendChild(styleEl);