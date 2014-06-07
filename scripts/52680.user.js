// ==UserScript==
// @name           Facebook "Common Error" auto go-back
// @namespace      http://userscripts.org/users/23652
// @include        http://www.facebook.com/common/error.html
// ==/UserScript==

window.setTimeout('history.go(-1); ',1000);