// ==UserScript==
// @name           HootSuite mini columns
// @namespace      CRD
// @description    Resizes the columns in the web interface of HootSuite to a smaller 280px size.
// @include        http://hootsuite.com/*
// ==/UserScript==

// Override column widths
var styleOverride = "._box.stream { width: 280px !important; }";
GM_addStyle(styleOverride);