// ==UserScript==
// @name        Flashless Toypics
// @description Replaces flash-player videos with HTML5 video tags and adds a download link.
// @author      Magi
// @icon        http://www.awkwardcore.com/MopyPack/General%20Forum%20Images/Mopy%27s%20Art%20Compilation/Mopy%20Pixel%20Heart.png
// @include     http://videos.toypics.net/view/*
// @grant       none
// ==/UserScript==

(function() {

    var container = window.document.querySelector("#view-video-content div:nth-child(2)");
    var p = window.parameters;
    var dlHtml = '<p><a href="'+p.src+'">Download Video (Right click, Save as..)</a></p>';
    
    container.style.textAlign = "center";
    
    container.innerHTML = '<img src="'+p.poster+'" style="cursor:pointer"/>' + dlHtml;
    
    window.document.querySelector("#view-video-content div:nth-child(2) img").addEventListener("click", function() {
        container.innerHTML = '<video autoplay src="'+p.src+'" controls></video>' + dlHtml;
    });
})();
