// ==UserScript==
// @name           Ta-da Printing
// @namespace      www.gooli.org/greasemonkey
// @include        http://*.tadalist.com/*
// ==/UserScript==

GM_addStyle("\
@media print {\
    body {\
        font-family: arial, sansserif;\
    }\
    .check {\
        font-size: 16px;\
        line-height: 20px;\
    }\
    #toppromo, #Header, #additem, #non_reorderable, .completed, .Right, #footer {\
        display : none;\
    }\
}")
