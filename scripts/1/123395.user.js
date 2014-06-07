// ==UserScript==
// @name        Apple Developer Login Paste Password
// @description Allow to paste password in Apple's login forms
// @author      Marco Seguri <marco dot seguri at gmail dot com>
// @include     http*://daw.apple.com/*
// @include     http*://itunesconnect.apple.com/*
// @include     http*://appleid.apple.com/*
// ==/UserScript==

document.getElementById("accountpassword").setAttribute("onpaste", "return true ;");