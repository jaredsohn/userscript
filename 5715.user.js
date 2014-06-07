// ==UserScript==
// @name            Myspace Bulletin Eraser
// @namespace      nothing@nowebspace.com
// @description    No More Bulletins
// @include        http://home.myspace.com/index.cfm?fuseaction=user*

// ==/UserScript==


s= '';
s+= '#home_bulletins {display:none;}';

GM_addStyle(s);