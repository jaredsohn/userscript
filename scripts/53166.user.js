// ==UserScript==
// @name           compact_twitter
// @namespace      http://radiofreak.jugem.cc/
// @include        http://twitter.com/*
// ==/UserScript==

var d = document;
var s = d.createElement('style');
s.innerHTML = "#container                      { width:900px !important; } "
            + "#content                        { width:650px !important; } "
            + "ol.statuses                     { font-size:1em !important; } "
            + "ol.statuses .thumb              { height:20px !important; width:20px !important; } "
            + "ol.statuses .thumb img          { height:18px !important; width:18px !important; } "
            + "ol.statuses span.status-body    { min-height:0px !important; width:600px !important; } "
            + "#timeline .status-body .meta    { display:inline !important; } ";
d.body.appendChild(s);
