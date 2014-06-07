// ==UserScript==
// @name       GooglePlus - Fixed Menu Bar and Side Bars
// @namespace  http://cakyus.wordpress.com/
// @version    0.2
// @description  GooglePlus - Fixed Menu Bar and Side Bars
// @include    https://plus.google.com/*
// @copyright  2011+, You
// ==/UserScript==

GM_addStyle( ''
    +'body {margin-top: 30px; !important}'
    +'#gb {position: fixed; width: 100%; top: 0px;}'
    +'.a-b-sb-T, .a-b-jC-T {position: fixed;}'
);
