// ==UserScript==
// @name           Remove NoRightClick
// @namespace      Bio20B
// @include        http://bio.classes.ucsc.edu/bio20b/*
// ==/UserScript==

unsafeWindow.document.onmousedown = null;