// ==UserScript==
// @name       Back to Blue
// @namespace  http://www.symbianize.com/
// @version    3
// @description  changes all hyperlink to blue in /showthread.php
// @match      http://www.symbianize.com/* 
// @copyright  2014 | hehe13
// @grant      GM_addStyle
// ==/UserScript==

GM_addStyle ( "	         \
   .postlist a:link {	 \
color: blue;	         \
   }	                 \
   .author a:link {	 \
color: blue;	         \
   }	                 \
.threadtitle a:hover, a:link, a:visited {	 \
color: green;	         \
   }	                 \
" );