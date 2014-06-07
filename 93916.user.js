// ==UserScript== 
// @name        Anti-Social Glue
// @author      Michael Soh 
// @namespace   antisocial_glue__93916
// @description Unchecks notification checkboxes for social networks.
// @version     0.1
// @license     GPL 3.0 
// @include     http://getglue.com/*
// @require     http://usocheckup.redirectme.net/93916.js
//  
// 
// ==/UserScript== 

var nodes = evaluate_xpath('.//fieldset/input[@type="checkbox"]');

for (var i = 0; i < nodes.snapshotLength; i++) {
    nodes.snapshotItem(i).removeAttribute('checked');
}

// =-=-=-=-=- FUNCTIONS -=-=-=-=-= //

function evaluate_xpath(xpath_query) {
     if (debug >= 2) GM_log(xpath_query);
     var nodes = document.evaluate(xpath_query, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
     if (debug >= 1) GM_log('number of nodes returned: ' + nodes.snapshotLength);

     return nodes;
}

