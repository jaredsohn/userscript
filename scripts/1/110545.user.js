// ==UserScript==
// @name           Hide New Facebook ticker stream on applications.
// @namespace      Psuken
// @include        http*://*.facebook.com/*
// @version        2
// @run-at         document-end
// ==/UserScript==

if(document.getElementById('pagelet_ticker') != null) { document.getElementById('pagelet_ticker').parentNode.removeChild(document.getElementById('pagelet_ticker'));}
if(document.getElementById('pagelet_ego_pane') != null) { document.getElementById('pagelet_ego_pane').parentNode.removeChild(document.getElementById('pagelet_ego_pane'));}
if(document.getElementById('u2f52_55') != null) { document.getElementById('u2f52_55').parentNode.removeChild(document.getElementById('u2f52_55')); }