// ==UserScript==
// @name       EasyHuoxing
// @namespace  http://legendmohe.net/
// @version    0.1
// @description  EasyHuoxing
// @match      http://huox.in/
// @require     http://code.jquery.com/jquery-1.10.1.min.js
// @grant       GM_xmlhttpRequest
// @copyright  2012+, You
// ==/UserScript==

var HUOXING_COMMENT_ON = 0;
function processHuoxing() {
    $(document.createElement('botton'))
    .css({float:'right', color:'#2854bb'})
    .text("展开最后一条评论")
    .click(function() {
        if(HUOXING_COMMENT_ON == 0) {
            $(".Announcement ~ .Item").each(function() {
                var url = $(this).find(".ItemContent > .Title").attr('href')
                var $item = $(this);
                GM_xmlhttpRequest({
                    method: 'GET',
                    url: url,
                    onload: function(responseDetails) {
                        var $Comment = $(responseDetails.responseText).find(".DataList > .Item > .Comment").last();
                        
                        $Comment.find(".ProfilePhotoMedium").remove();
                        var $Msg = $Comment.find(".Message");
                        var content = $.trim($Msg.text().substring(0, 139));
                        if (content.length != 0)
                            $Msg.text(content + "...");
                        $Comment.css( {
                            "color": "#999999",
                            "Font-style": "normal",
                            "margin": "1em 0 2em",
                            "padding": ".6em 1em",
                            "background": "#f9f9f9",
                            "border-left": ".4em solid #ddd"
                        });
                        $Comment.find(".Meta > .CommentReply").remove();
                        
                        $Comment.appendTo($item);
                    }
                });
            });
            
            $(this).text("收起最后一条评论");
            HUOXING_COMMENT_ON = 1;
        }else {
            $(".Announcement ~ .Item > .Comment").remove();CommentReply
            $(this).text("展开最后一条评论");
            HUOXING_COMMENT_ON = 0;
        }  
    }).appendTo($(".DiscussionsTabs > ul"));
}

$(document).ready(function() {  
    processHuoxing();
});