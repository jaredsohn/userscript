// ==UserScript==
// @name            grayWeb
// @description     让网页变灰保护眼睛
// @author          LQiang
// @include        http://*.google.*
// @include        http://google.*
// @include        https://*.google.*
// @include        https://google.*
// @include        https://accounts.google.*
// @include        http://www.baidu.com
// @include        http://*.baidu.*
// ==/UserScript==

var style = 
 
"*{ background:#eeeeee!important; }"
    
GM_addStyle(style);