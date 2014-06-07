// ==UserScript==
// @name       Workaround for video unreachable error in Youtube
// @namespace  http://
// @version    0.4
// @author         Pirlouwi
// @description  When youtube returns a video unreachable error, this script may help you by adding a button at the top of your YT page ;-)
// @match      http*://www.youtube.com/watch?v=*
// @updateURL      http://userscripts.org/scripts/show/292130
// @download       http://userscripts.org/scripts/show/292130
// @copyright  2014+, Pirlouwi
// ==/UserScript==

(function () {
    
    var loaded=false;
    
    function loadYTWorkaround(){
        
        if (!loaded) {
            loaded=true;
            button=document.createElement("button");
            div=document.getElementById("page-container");
            div.innerHTML = '<a id="ytworkaround" class="yt-uix-button start yt-uix-sessionlink yt-uix-button-default yt-uix-button-size-default" \
								onclick= "document.location.href = \'https://youtube.googleapis.com/v/\' + document.location.href.substring(document.location.href.indexOf(\'=\')+1, 100) + \'?autoplay=1&fs=1\'" \
							 > <span class="yt-uix-button-content">Open this video with GoogleApis</span> </a>' + div.innerHTML;
        }
    }
        
    document.addEventListener('DOMNodeInserted', loadYTWorkaround);
    
})();