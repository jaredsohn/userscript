// ==UserScript==
// @author         Rohit Patali
// @version        0.1
// @name           Forevergeek Cleaner
// @namespace      patali
// @description    Remove unwanted sidebars and ads!
// @include        http://www.forevergeek.com/*
// ==/UserScript==

var network_features_remove = document.getElementById('network');
if (network_features_remove) {
    network_features_remove.parentNode.removeChild(network_features_remove);
}


var classes= document.evaluate("//*[@class='Header'] | //*[@class='sociable'] | //*[@class='related-posts'] | //*[@class='HeadUn'] | //*[@class='SR'] | //*[@class='col1'] | //*[@class='col2'] | //*[@class='Form'] | //*[@class='Footer'] | //*[@class='bottom-block']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
var item;
for(var i=0;i<classes.snapshotLength;i++) {
		item=classes.snapshotItem(i);
		item.parentNode.removeChild(item);
}