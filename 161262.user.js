// ==UserScript==
// @name        Miles' Path of Exile CSS Changes
// @namespace   http://www.pathofexile.com/
// @description Alters the CSS of the Path of Exile website to my wants
// @include     http://*.pathofexile.com/*
// @run-at      document-start
// @version     0.1
// ==/UserScript==

var css = "
    body {
        font-family:Arial;
        font-size: 12px;
    };
";

GM_addStyle(css);
