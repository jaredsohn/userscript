// MySpace User Style Permanent Remover user script
// Version 1.0.0
// 2007-06-05
// Copyright (c) 2007, Jarno Elovirta
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// ==UserScript==
// @name           MySpace User Style Permanent Remover
// @namespace      http://elovirta.com/greasemonkey/
// @description    Permanently removes user styles from MySpace pages. Version 1.0.0.
// @include        *myspace.com*
// ==/UserScript==

var styles = document.getElementsByTagName("style");
for (var i = 0; i < styles.length; i++) {
    styles[i].disabled = true;
}
