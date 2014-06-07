// ==UserScript==
// @name          Make StudioStyles.info use Envy Code R
// @author        DamienG
// @description   Make StudioStyles.info use Envy Code R
// @include       http://studiostyles.info/*
// @version       1.0
// ==/UserScript==

GM_addStyle("pre.snippet, .item { font-family: \"Envy Code R\" !important; font-size: 10pt !important;}");
GM_addStyle("pre.snippet { width: auto !important; }");
