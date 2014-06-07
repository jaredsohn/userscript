/*global window:true,GM_addStyle:true*/
// The MIT License
// 
// Copyright (c) 2009 Tiago Rodrigues
// 
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, di substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED RISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Hello World", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Facebook cleanup
// @namespace
// @description   Cleanup some annoying stuff from your facebook timeline like people who add new friends, fans and groups. English only. Might have some delay.
// @include       http://*facebook.com/home.php*
// ==/UserScript==

(function() {

var firstNode = false, lastNode = false;
var lock = false;

var getNode = function(node, children){
    if(node){
        var nodes = node.childNodes;
        for(var i=0,l=nodes.length; i<l; i++){
            if(nodes[i].nodeType === 1){
                if(children){
                    return nodes[i].childNodes;
                } else {
                    return nodes[i];
                }
            }
        }
    }
};

var hideNotification = function(item, id, re){
   if(item.innerHTML.search(re) >= 0){
        GM_addStyle("#"+ id +" {display:none;}");
        return true;
    }
    return false;
};

var notificationRegexps = [
    /are now friends/,
    /is now friend/,
    /became a fan/,
    /joined the group/
];

var checkNotification = function(item){
    var items = item.getElementsByClassName("GenericStory_Message");

    for(var i=0,li=items.length; i<li; i++){
        for(var j=0,lj=notificationRegexps.length; j<lj; j++){
            if(hideNotification(items[i], item.id, notificationRegexps[j])){
                return false;
            }
        }
    }
};

var main = function(){
    if(lock) {
        return false;
    }
    lock = true;
    setTimeout(function(){
        lock = false;
    }, 4000);

    var i, j, li, lj, delayedNode, delayedItems;
    var stream = document.getElementById("pagelet_intentional_stream");
    // descend 3 nodes
    var item = getNode(getNode(getNode(stream)));
    if(!item) {
        return false;
    }
    var items = item.childNodes;

    var newFirstNode = items[0];
    var newLastNode = items[items.length-1];

    if(newLastNode.id === "pagelet_delayed_stream"){
        delayedNode = getNode(newLastNode);
        if(!delayedNode) {
            return false;
        }
        delayedItems = delayedNode.childNodes;
        newLastNode = delayedItems[delayedItems.length-1];
    }

    if(firstNode && lastNode){
        if(newFirstNode.id != firstNode.id ||
        newLastNode.id != lastNode.id){
            firstNode = newFirstNode;
            lastNode = newLastNode;
        } else {
            return false;
        }
    } else {
        firstNode = newFirstNode;
        lastNode = newLastNode;
    }

    for(i=0, li=items.length; i<li; i++){
        if(items[i].id === "pagelet_delayed_stream"){
            // descend one node
            delayedNode = getNode(items[i]);
            delayedItems = delayedNode.childNodes;
            // go from 1 because 0 is a separator
            for(j=1, lj=delayedItems.length; j<lj; j++){
                checkNotification(delayedItems[j]);
            }
        } else {
            checkNotification(items[i]);
        }
    }
};
main();
document.addEventListener("mouseover", main);

})();
