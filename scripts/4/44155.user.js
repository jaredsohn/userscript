// ==UserScript==
// @name           Segoe UI (FontFamily) - Google
// @description    Change the default font-family of the Google.com
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

GM_addStyle(" * {font-family:\"Segoe UI\",\"Segoe UI\" !important;}");
