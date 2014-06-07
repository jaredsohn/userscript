// ==UserScript==
// @name        Disliker
// @description Dislikes comments.
// @include     http://disqus.com/embed/comments/?disqus_version=5124972c&base=default&f=*&s_o=desc&l=#2
// @version     1.0
// ==/UserScript==

function dislike()
    {
        $(".vote-down:not(.downvoted)").each(function(){
            $(this).trigger("click");
        });
        $(".alert.realtime").trigger("click");
        $(".btn.small.reveal").trigger("click");
    }
    
setInterval(dislike,1000);