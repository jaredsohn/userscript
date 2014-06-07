// ==UserScript==
// @name           GMail fwd image fixer
// @namespace      gelbraensoftware.com
// @description    Fixes the GMail "no image when FWDing" problem
// @include        http*://mail.google.com/*
// ==/UserScript==

body = document.getElementsByTagName("body")[0];
if( body.className.indexOf("editable") != -1 )
{	body.innerHTML = body.innerHTML.replace(/http:\/\/\//g, "");
}
