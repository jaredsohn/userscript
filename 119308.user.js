// ==UserScript==
// @name          hbt night theme
// @description    Sets a dark theme for all sites
// @namespace      hbt
// @include        *
// @include http://*
// @include https://*
// ==/UserScript==

var css = '* {' +
'    color: rgb(237, 237, 237);' +
'    font-size: 14px;' +
'    background-image: initial !important;' +
'    background-attachment: initial;' +
'    background-origin: initial;' +
'    background-clip: initial;' +
'    background-color: rgb(15, 15, 15) !important;' +
'    background-position: initial initial;' +
'    background-repeat: initial initial;' +
'}' +
'' +
'html > body, html > body *' +
'{' +
'    background-color: rgb(15, 15, 15) !important;' +
'    color: #EDEDED !important;' +
'    text-shadow: 0 !important;' +
'    webkit-text-fill-color: none !important;' +
'    webkit-text-stroke: 0 !important;' +
'}' +
'html > body, html > body *:not([onclick]):not(:link):not(:visited)' +
'{' +
'    background-image: none !important;' +
'}' +
'html > body a:link, html > body a:visited, html > body a:hover, html > body a:active,html > body a:link *, html > body a:visited *, html > body a:hover *,' +
'html > body a:active *' +
'{' +
'    border-bottom: 0 !important;' +
'    text-decoration: underline !important;' +
'}' +
'html > body a:link, html > body a:link *,html > body a:link:hover, html > body a:link:hover *,html > body a:link:active, html > body a:link:active *' +
'{' +
'    color: #42ADDB !important;' +
'}' +
'html > body a:visited, html > body a:visited *,html > body a:visited:hover, html > body a:visited:hover *,html > body a:visited:active, html > body' +
'a:visited:active *' +
'{' +
'    color: #0FF000 !important;' +
'}' +
'html > body, html > body *' +
'{' +
'    font-family: sans-serif !important;' +
'}' +
'html > body code, html > body kbd, html > body listing, html > body plaintext, html > body pre, html > body samp, html > body tt, html > body xmp,html > body' +
'code *, html > body kbd *, html > body listing *, html > body plaintext *, html > body pre *, html > body samp *, html > body tt *, html > body xmp *' +
'{' +
'    font-family: monospace !important;' +
'}' +
'html > body h1, html > body h2, html > body h3, html > body h4, html > body h5, html > body h6,html > body h1 *, html > body h2 *, html > body h3 *, html >' +
'body h4 *, html > body h5 *, html > body h6 *' +
'{' +
'    font-family: serif !important;' +
'}' +
'' +
'' +
'html,body {' +
'    background-color: rgb(15, 15, 15) !important;' +
'}' +
'' +
'' +
' Works in Safari' +
'::selection {' +
'    color: orange;' +
'    background-color: grey;' +
'}';


GM_addStyle(css);