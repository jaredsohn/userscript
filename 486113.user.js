// ==UserScript==
// @name       green links
// @namespace  http://www.symbianize.com/
// @version    0.1
// @description  changes all hyperlink to blue in /showthread.php
// @match      http://www.symbianize.com/showthread.php*
// @copyright  2014 | hehe13
// @grant      GM_addStyle
// ==/UserScript==

GM_addStyle ( "	         \
   .postlist a:link {	 \
color: #006921;	         \
   }	                 \
" );