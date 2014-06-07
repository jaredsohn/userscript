// ==UserScript==
// @name          Bibliotik Background Colors
// @namespace     0x029A
// @description   Change background colors for input fields and buttons
// @include       /^https?://(?:www\.)?bibliotik\.org/.*$/
// @version       2
// @grant
// ==/UserScript==

GM_addStyle("textarea, select, input[type=text], input[type=password] { color:#888 !important; background-color:#333; border:1px solid #666; padding-left:2px; margin-right:1px; }");
GM_addStyle("input[type=text], input[type=password] { height:21px; }");
GM_addStyle("select { cursor:pointer; }");
GM_addStyle("input[type=submit], input[type=button], input[type=file] { color:#222; background-color:#aaa; border:1px solid #666; padding:2px 6px; cursor:pointer; margin-left:-3px; }");
GM_addStyle("input[type=submit], input[type=button] { -webkit-transition:background-color 300ms; -moz-transition:background-color 300ms; -o-transition:background-color 300ms; -ms-transition:background-color 300ms; transition:background-color 300ms;}");
GM_addStyle("input[type=file] { margin:0; padding:0; }");
GM_addStyle("input[type=submit]:hover, input[type=button]:hover { color:#e98400; background-color:#333; }");
GM_addStyle("input[type=submit]:active, input[type=button]:active { color:#333; background-color:#e98400; }");