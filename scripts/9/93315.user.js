// ==UserScript== 
// @name        Hide Wikia Toolbar
// @author      Michael Soh 
// @namespace   hide_wikia_toolbar_93315
// @description Hids the annoying toolbar at the bottom of all Wikia articles
// @version     0.1
// @license     GPL 3.0 
// @include     http://*.wikia.com/*
//  
// @require     http://usocheckup.redirectme.net/93315.js
// 
// ==/UserScript== 

var nodes = evaluate_xpath(".//*[@id='WikiaFooter']/div");
if (nodes.snapshotLength > 0) {
    nodes.snapshotItem(0).setAttribute("style", "display: none");
}

// =-=-=-=-=- FUNCTIONS -=-=-=-=-= //

function evaluate_xpath(xpath_query) {
     if (debug >= 2) GM_log(xpath_query);
     var nodes = document.evaluate(xpath_query, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null); 
     if (debug >= 1) GM_log('nodes returned: ' + nodes.snapshotLength); 
 
     return nodes; 
}