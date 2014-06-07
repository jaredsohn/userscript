// ==UserScript==
// @name           hostAccessCounter
// @namespace      blueiris4
// @description    hostAccessCounter
// @include        http*://*
// ==/UserScript==

blueiris_thisdomain = window.location.host;
blueiris_countNum = GM_getValue(blueiris_thisdomain, 0);
GM_setValue(blueiris_thisdomain, ++blueiris_countNum);

GM_registerMenuCommand("show access counter", 
    function() { alert(blueiris_thisdomain+" : "+GM_getValue(blueiris_thisdomain, 0)); } );
GM_registerMenuCommand("set access counter to 0", 
    function() { if(confirm("Are you sure to set the count of "+blueiris_thisdomain+" to 0 ?"))
                   GM_setValue(blueiris_thisdomain, 0); } );