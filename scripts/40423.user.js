// --------------------------------------------------------------------------------
// Copyright (C) 2008  Mingda Cui [cuimingda(at)gmail(dot)com || http://cuimingda.com]
// Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) 
// and GPL (http://www.gnu.org/licenses/) licenses.
//
// ==UserScript==
// @name            Yeeyan To Douban
// @namespace       http://cuimingda.com
// @description     Recommend yeeyan articles to douban
// @include         http://www.douban.com/recommend/*
// @include         http://www.yeeyan.com/articles/view/*/*
// @exclude         http://www.yeeyan.com/articles/view/*/*/dz
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.min.js
// ==/UserScript==
//
// 0.1 @ 2009/01/14 # Initial Release
// --------------------------------------------------------------------------------

;(function() {

    if(location.href.indexOf("douban.com") !== -1) {
        if($("input[name=type]:first").val() !== "I") return;
        if($("input[name=ref]:first").val().indexOf("yeeyan.com") === -1) return;

        $("textarea[name=comment]:first").val($("input[name=abs]:first").val());
    }
    else {
        $(document.createElement("img"))
            .attr("src", "/img/div.gif")
            .appendTo($("#iwant"));
            
        $(document.createElement("a"))
            .attr("href", "")
            .text("推荐到豆瓣")
            .appendTo($("#iwant"))
            .click(function(event) {
                event.preventDefault();
                
                var url = location.href + "&";
                var title = $(document).attr("title");
                var sel = document.getSelection() !== "" ? document.getSelection() : getDescription();
                
                var recommendUrl = 'http://www.douban.com/recommend/?v=1' + 
                    '&url='   + encodeURIComponent(url) + 
                    '&title=' + encodeURIComponent(title) + 
                    '&sel='   + encodeURIComponent(sel);
                
                if (!window.open(recommendUrl, 'douban', 'toolbar=0,resizable=0,scrollbars=no,status=0,width=450,height=330')) {
                    location.href = recommendUrl + '&r=1'
                }
            });    
    }


        
    function getDescription() {
        return $("#articlebody").prev("div").length === 1 ? $(".inner:first").text() : $("#articlebody p:first").text();
    }
})();