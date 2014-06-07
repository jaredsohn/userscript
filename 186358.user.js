// ==UserScript==
// @name       Shanbay Open User Vocabulary Annotation By Default
// @version    1.0
// @description  Shanbay Open User Vocabulary Annotation By Default
// @match      http://www.shanbay.com/bdc/review/*
// @copyright  2013
// ==/UserScript==

$(document).keyup(function(e){
    setTimeout(function(){
        $(".note-user-box-tab").trigger('click');
        if (e.which == 49 || e.which == 50 || e.which == 51){
            console.log("key press");
            var lbo = $('#learning-box').offset();
            $("#note-user-box").bind ("DOMSubtreeModified", function(){
                if (lbo !== null && $(".note-user-box-tab")!== null ){
                    $("html, body").animate({ scrollTop: lbo.top }, 0);
                }
            });
            
            
        }
    }, 200);
});
