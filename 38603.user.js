// ==UserScript==
// @name           disabled_mwake_redir
// @namespace      http://www.somethingselse.com
// @description    Disabled sucked mwake.com redirect
// @include        http://paypic.mwake.com*
// ==/UserScript==


var img = document.getElementsByTagName('img')[1];
window.location=img.src;
