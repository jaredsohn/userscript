// ==UserScript==
// @name       Jumpt2LastPost Plugin (Q2A)
// @namespace  http://forums.academy.telerik.com
// @version    0.9 Beta
// @match      http://forums.academy.telerik.com/*
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @author	   SVGN  
// ==/UserScript==

(function($) {
    $(document).ready(function() {
        var jump2LastPost = localStorage.getItem("jump2LastPost");
        
        if (jump2LastPost) {
            localStorage.removeItem("jump2LastPost");
            var lastPostId = $(".qa-a-list-item").last().attr("id");
            window.location.href = window.location.href + "#" + lastPostId;
    	}
        
        var a = $("<a/>").addClass("jump-to-last-post").text("➲");
        $(".qa-q-item-title").append(a);
        
        $(".jump-to-last-post").hover(function() {
            $(this).css("text-decoration", "none");
            $(this).css("cursor", "pointer");
        });
        
        $(".qa-q-item-title").on("click", ".jump-to-last-post", function() {
            var questionAnswersItem = $(this).parent().parent().parent().find(".qa-a-count-data")[0];
            var questionAnswersCount = parseInt($(questionAnswersItem).html());

            if (questionAnswersCount % 10 == 0) {
            	questionAnswersCount -= 1;
            }

            questionAnswersCount -= questionAnswersCount % 10;

            var questionItem = $(this).parent().find("a")[0];
            var questionHref = $(questionItem).attr("href");
            var questionPath = questionHref.substr(2);

            localStorage.setItem("jump2LastPost", "true");
            
            var url = "http://forums.academy.telerik.com/" + questionPath + "?start=" + questionAnswersCount;
            window.location.href = url;
        })
    });
}(jQuery));