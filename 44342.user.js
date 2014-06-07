// ==UserScript==
// @name           iCalibri
// @description    Shift default font-family to the Calibri (font)
// @author         snjflame
// @include        http://www.google.*
// @include        https://www.google.*
// @include        http://www.google.*/search
// @include        https://www.google.*/search
// @exclude        https://mail.google.*/mail/*
// @exclude        http://mail.google.*/mail/*
// @exclude        http://picasaweb.google.*
// @version        1.0
// ==/UserScript==

GM_addStyle(" * {font-size: 10.5pt !important; font-family:\"Calibri\",\"Segoe UI\" !important; text-decoration: none !important;}");