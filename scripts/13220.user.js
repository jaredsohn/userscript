// ==UserScript==
// @name           CiteULike note privateiser
// @namespace      citeulike
// @description    ticks the "private note" box by default
// @include        http://www.citeulike.org/*
// ==/UserScript==

if (document.getElementById("private_note")) document.getElementById("private_note").checked = true;