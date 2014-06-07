// ==UserScript==
// @name           STO auto redir
// @namespace      http://armeagle.nl
// @include        http://*startrekonline.com/splash?redir=*
// ==/UserScript==

location.href = location.href.replace('splash?redir=', '');