// ==UserScript==
// @name          jarTT
// @description   Modification for turntable.fm
// @include       *turntable.fm/*
// ==/UserScript==
 
var magic=function() {
                if(document.getElementById('turntable')!=null) {
                                var head = document.head;
                                if ("item" in head) { // check if ref is still a live node list
            if (!head[0]) { // append_to node not yet ready
                setTimeout(magic, 25);
                return;
            }
            head = head[0]; // reassign from live node list ref to pure node ref -- avoids nasty IE bug where changes to DOM invalidate live node lists
        }
                                var scriptElem = document.createElement("script");
        scriptElem.src = 'https://raw.github.com/chrisinajar/jarTT/master/jarTT.js';
        head.insertBefore(scriptElem, head.firstChild);
                } else {
                                setTimeout(magic, 500);
                }
};magic();