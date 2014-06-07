// ==UserScript==
// @name           Tahoma Google
// @description    Shift default font-family to the Tahoma (font)
// @author         snjflame
// @include        http://www.google.*
// @include        https://www.google.*
// @include        http://*.google.*
// @include        https://*.google.*
// @exclude        https://mail.google.*/mail/*
// @exclude        http://mail.google.*/mail/*
// @exclude        http://picasaweb.google.*

// @version        1.0
// ==/UserScript==

GM_addStyle(" * {font-size: 9pt !important; font-family:\"Tahoma\",\"Verdana\",\"Arial\" !important; text-decoration: none !important;}");
