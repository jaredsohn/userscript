// ==UserScript==
// @name           Google Image Proxy
// @namespace      http://qixinglu.com
// @description    Google Image Proxy
// @include        http://localhost/*
// ==/UserScript==

var INTERVAL_RUN_TIME = 5000;
var INTERVAL_RUN_KEY = "i";
var INTERVAL_RUN_URLS = [
    //[match string, select type(0:id,1:class,2:tag), select string]
    ["www.google.com/reader/view/", 0, "current-entry"]
    //["www.google.com/reader/view/", 1, "entry"]
    //["www.google.com/reader/view/", 2, "table"]
];

var intervalInt = null;
var invervalRunUrl = "";
var nodeSelType = 2;
var nodeSelString = "body";

var replaceImage = function(node) {
    prefix = "https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?url=";
    suffix = "&container=focus&gadget=a&no_expand=1&resize_h=0&rewriteMime=image%2F*";
    images = node.getElementsByTagName("img");
    for (var i = 0; i < images.length; i++) {
        if (images[i].src.indexOf(prefix) == -1) {
            images[i].src = prefix + encodeURIComponent(images[i].src) + suffix;
        }
    }
};

var intervalFunc = function() {
    switch (nodeSelType) {
        case 0:
            var node = document.getElementById(nodeSelString);
            if (node != null) {
                //GM_log(nodeSelType + ":" + nodeSelString)
                replaceImage(node);
            }
            break;
        case 1:
            var nodes = document.getElementsByClassName(nodeSelString);
            for (var i=0; i < nodes.length; i++) {
                //GM_log(nodeSelType + ":" + nodeSelString)
                replaceImage(nodes[i]);
            }
            break;
        case 2:
            var nodes = document.getElementsByTagName(nodeSelString);
            for (var i=0; i < nodes.length; i++) {
                //GM_log(nodeSelType + ":" + nodeSelString)
                replaceImage(nodes[i]);
            }
        default:
            // do nothing
    }
}

replaceImage(document);
for (var i = 0; i < INTERVAL_RUN_URLS.length; i++) {
    if (location.href.indexOf(INTERVAL_RUN_URLS[i][0]) != -1) {
        invervalRunUrl = INTERVAL_RUN_URLS[i][0];
        nodeSelType = INTERVAL_RUN_URLS[i][1];
        nodeSelString = INTERVAL_RUN_URLS[i][2];
        intervalInt = window.setInterval(intervalFunc, INTERVAL_RUN_TIME, nodeSelString);
        //GM_log("interval run started")
    }
}

document.addEventListener(
    'keydown',
    function(event) {
        var key = String.fromCharCode(event.keyCode);
        if (key.toLowerCase() == INTERVAL_RUN_KEY) {
            if (intervalInt == null) {
                intervalInt = window.setInterval(intervalFunc, INTERVAL_RUN_TIME, nodeSelString);
                //GM_log("interval run restarted")
            } else {
                window.clearInterval(intervalInt);
                intervalInt = null;
                //GM_log("interval run stoped")
            }
        }
    },
    false
);
