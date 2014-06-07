// ==UserScript==
// @name       Gorillavid Downloader
// @namespace  http://gvid.microo.se/
// @version    1.0
// @description  GorillaVid downloader
// @include      http://*gorillavid.in/*
// @copyright  2012+, Microo
// ==/UserScript==

$(document).ready(function()
{
    function getVideoUrl() {
        var scriptTags = document.getElementsByTagName("script");
        var url = ""
        for(var i = 0; i<scriptTags.length; i++) {
            if(scriptTags[i].innerHTML.indexOf("file:") !== -1) {
                // file: "http://50.7.164.242:8182/2koqqatgvsu4tqukwyf3nttmjq7blnejfqaim26ambmfmvy3ubthzwmyxi/video.mp4"
                var data = scriptTags[i].innerHTML;
                var fileIndex = data.indexOf("file:");
                
                var firstQuote = data.indexOf("\"", fileIndex) + 1;
                var secondQuote = data.indexOf("\"", firstQuote + 1);
                
                url = data.substring(firstQuote, secondQuote);
                break;
            }
        }
        
        return url;
    }
    
    function urlExists() {
        var scriptTags = document.getElementsByTagName("script");
        var exists = false;
        for(var i = 0; i<scriptTags.length; i++) {
            if(scriptTags[i].innerHTML.indexOf("file: http://") !== -1) {
                exists = true;
                break;
            }
        }
        
        return urlExists;
    }
        
    if(urlExists()) {
        var url = getVideoUrl();
        
        var theLink = document.createElement("a");
        theLink.innerHTML = "Download";
        theLink.href = url;
        theLink.download = url.substring(url.lastIndexOf("/")+1, url.length);
        
        var newLI = document.createElement("LI");
        newLI.appendChild(theLink);
        
        var theUl = document.getElementById("menu-main");
        theUl.appendChild(newLI);
    }
});
