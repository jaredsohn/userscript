// --------------------------------------------------------------------------------
// Copyright (C) 2008  Mingda Cui [cuimingda(at)gmail(dot)com || http://cuimingda.com]
// Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) 
// and GPL (http://www.gnu.org/licenses/) licenses.
//
// ==UserScript==
// @name            CCTV TV Space Video Downloader
// @namespace       http://cuimingda.com
// @description     Add download links for space.tv.cctv.com
// @include         http://space.tv.cctv.com/act/video.jsp?videoId=VIDE*
// @include         http://space.tv.cctv.com/act/platform/view/page/composePage.jsp*
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// ==/UserScript==
//
// 0.10 @ 2008/12/30 # Initial Release
// 0.11 @ 2009/01/01 # Fixed some bugs
// --------------------------------------------------------------------------------

;(function() {

    $(document).ready(function() {
        
        switch(page.getType()) {
            case page.video: handler.video(); break;
            case page.list:  handler.list();  break;
            default: break;
        }
          
    });
    
    var page = {
        unknown : 0,
        video   : 1,
        list    : 2,
        
        getType : function() {
            if(location.href.indexOf("video.jsp") !== -1) {
                return this.video;
            } 
            else if(location.href.indexOf("composePage.jsp") !== -1) {
                return this.list;
            }
            else {
                return this.unknown;
            }
        }
    };
    
    var handler = {
        video : function() {
            viewDownloadUrl();
        },
        
        list : function() {
      
            monitor();
        }
    };
    
    var viewDownloadUrl = function() {
        var videoId = location.href.match(/videoId=(.+)$/)[1];
        
        $.getJSON("http://space.tv.cctv.com/playcfg/flv_info_new.jsp?videoId=" + videoId, function(data) {
            if($("#myFlash").attr("downloadlink") === "true") return;
            
            $(document.createElement("textarea"))
                .val(getDownloadUrl(data.video.url))
                .css("width", "460px")
                .css("height", "36px")
                .css("display", "block")
                .css("margin-top", "10px")
                .appendTo($("#myFlash"))
                .click(function() {
                    var textbox = $(this).get(0);
                    var length = textbox.textLength;
                    textbox.setSelectionRange(0, length);
                });
                
            $("#myFlash").attr("downloadlink", "true");
        });
    };
    
    var getDownloadUrl = function(videoUrl) {
        if(videoUrl.indexOf("sobey") !== -1) {
            return "http://v.2008.cctv.com/flv/" + videoUrl;
        }
        else {
            return "http://v.cctv.com/flash/" + videoUrl;
        }
    };
    
    var monitor = function() {
        addDownloadLinks();
        setTimeout(function() { monitor(); }, 1000);
    };
    
    var addDownloadLinks = function() {
        if($(".mh_title:first").attr("downloadlinks") === "true") return;
        
        $("p>a[href*=/act/video.jsp]").each(function() {
            if($(this).attr("downloadlink") === "true") return;
            
            var videoId = $(this).attr("href").match(/videoId=(.+)$/)[1];

            $("<a target='_blank' href='#'>下载</a>").insertAfter($(this)).click(function(event) {
                event.preventDefault();
                
                $.getJSON("http://space.tv.cctv.com/playcfg/flv_info_new.jsp?videoId=" + videoId, function(data) {
                    location.href = getDownloadUrl(data.video.url);
                });
            }).before(" - ");
            
            $(this).attr("downloadlink", "true");
        }); 
        
        $(".mh_title:first").attr("downloadlinks", "true");
        // GM_log((new Date()).toString() + " - Download links added.");
    };
})();