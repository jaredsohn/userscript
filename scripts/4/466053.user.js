// ==UserScript==
// @name           Fakku Reader Prettify
// @description    Makes the Fakku reader easier on the eyes.
// @include        http://*fakku.net/*/read*
// @namespace      https://userscripts.org/users/519069
// ==/UserScript==


var css = "\
body { \
    background-color: #1b1b1b !important; \
    color: #333 !important; \
 \
} \
 \
a, a:link, a:visited, a:active { \
    color: #fff !important; \
} \
 \
.btn{ \
    color:#333 !important; \
} \
 \
#content { \
    border-left: none !important; \
    border-right: none !important; \
    background-color: #181818 !important; \
    box-shadow: 0px 0px 10px #0F0F0F inset; \
    -webkit-border-radius: 5px; \
    -moz-border-radius: 5px; \
    border-radius: 5px; \
    display: block !important; \
    margin-top: 50px !important; \
    padding-top: 8px !important; \
    float: left !important; \
    width: 100% !important; \
} \
 \
.thumb, .thumb:hover { \
    border: none !important; \
    width: 154px !important; \
    height: 210px !important; \
} \
 \
.advertisement { \
    display: none !important; \
} \
";

GM_addStyle(css);