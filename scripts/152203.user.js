// ==UserScript==
// @name          jarPlug
// @description   Modification for plug.dj
// @include       *plug.dj/*
// ==/UserScript==
 
var magic=function() {
                if(document.getElementById('user-container')!=null) {
                                var head = document.head;
                                if ("item" in head) { // check if ref is still a live node list
            if (!head[0]) { // append_to node not yet ready
                setTimeout(magic, 25);
                return;
            }
            head = head[0]; // reassign from live node list ref to pure node ref -- avoids nasty IE bug where changes to DOM invalidate live node lists
        }
                                var scriptElem = document.createElement("script");
        scriptElem.src = 'https://raw.github.com/chrisinajar/jarPlug/master/init.js';
        head.insertBefore(scriptElem, head.firstChild);
                } else {
                                setTimeout(magic, 500);
                }
};magic();