// ==UserScript==
// @name           RTBF podcast direct URL
// @author         Pirlouwi
// @namespace      http://
// @version        0.2
// @updateURL      https://userscripts.org/scripts/source/170686.user.js
// @download       http://
// @description    RTBF podcast direct URL, adds the direct download URL in the podcast screen
// @include        http://www.rtbf.be/radio/podcast/*
// ==/UserScript==

(function () {
    var url;
    var div;
    
    function url_hook() {
        div = document.getElementById("audioPlayer");        
        addDirectURL(div);
    }
    
    function addDirectURL(div) {
        var obj = div.childNodes[0];
        
        if (obj) {
            var wholeUrl = obj.getAttribute("data");
            var p = wholeUrl.search("mp3=http");
            wholeUrl = wholeUrl.substring(p+4);
            
            if ((!url || 0 === url.length ) && wholeUrl) {
                var h3tag = document.getElementsByTagName("H3")[0];
                url = "" + wholeUrl;
                var container= document.createElement('div');
                container.innerHTML= '<a style="color:orange" href='+ url +'>[Save as mp3] </a>';
                h3tag.insertBefore(container.lastChild, h3tag.firstChild);
            }
        }
    }

    document.addEventListener('DOMContentLoaded', url_hook);
    
})();