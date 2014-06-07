// ==UserScript==
// @name       Directly download MP3's from dead.net
// @namespace  http://affinitysearch.com/
// @version    0.3
// @description  This script add's a small download icon/button next to any "listen" link in the Grateful Dead Radio Hour or Tapers Section's
// @match      http://dead.net/*
// @match      http://www.dead.net/*
// @copyright  2012+, You
// ==/UserScript==

var $ = unsafeWindow.jQuery;

$(document).ready(function(){
    function getUrlVar(name, url) {
        name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
        var regexS = "[\\?&]" + name.toLowerCase() + "=([^&#]*)";
        var regex = new RegExp(regexS);
        var results = regex.exec(url);
        if (results == null) return "";
        else return decodeURIComponent(results[1].replace(/\+/g, " "));
    }
    
    function downloadAudio(elm) {
        var url = $(elm).prev().attr("onclick").toString().split('","')[0].split('("')[1];
        var fileurl = getUrlVar("url", url);
        var filename = getUrlVar("text", url);
        $(elm).attr("href", fileurl).attr("download", filename + ".mp3").unbind("click").click();
    }
    
    $(".audiotemp").each(function(i){
        $(this).after('<a href="javascript:return false;" id="download-audio-' + i + '" class="download-audiotemp"><img src="data:image/gif;base64,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" style="margin-left: 5px;"></a>')
            
            $("#download-audio-" + i).click(function(){ 
                downloadAudio(this);	
            });
    });
});