// ==UserScript==
// @name           enrich nicovideo permalink
// @namespace      http://fuba.moarningnerds.org/
// @include        http://www.nicovideo.jp/watch/*
// ==/UserScript==

// this script is inspired from niconicoplayerwrapper.user.js
// http://coderepos.org/share/browser/lang/javascript/userscripts/niconicoplayerwrapper.user.js

(function () {
    var anchor;
    
    function generateAnchor () {
        var player = unsafeWindow.document.getElementById("flvplayer");
        if (player && player.GetVariable && player.GetVariable("ready")) {
            var moved_time = player.GetVariable("moved_time");
            if (typeof(moved_time) != "undefined") {
                anchor.href = location.href.replace(/\#.+$/, '') + "?from=" + moved_time.replace(/\./, '%2E');
            }
        }
    }
    
    var h = document.getElementsByTagName('H1')[0];
    anchor = document.createElement('A');
    anchor.innerHTML = "permalink";
    anchor.addEventListener('mouseover', generateAnchor, true);
    h.appendChild(anchor);
})();
