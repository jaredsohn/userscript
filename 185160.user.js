// ==UserScript==
// @name       EasyJandan
// @namespace  http://legendmohe.net/
// @version    0.41  
// @description  EasyJandan
// @match      http://jandan.net/*
// @require     http://code.jquery.com/jquery-1.10.1.min.js
// @grant       GM_xmlhttpRequest
// @copyright  2012+, You
// ==/UserScript==

function processClean() {
    $("#content > .title").remove();
    var sidebar = $("#sidebar");
    var $sponsors = sidebar.find("h3:contains('Sponsors')");
    $sponsors.each(function() {
        $(this).next().remove();
    });
    $sponsors.remove();
}

function processPage($parent){
    var url = $parent.find("h2 > a").attr("href");
    console.log(url);
    $.ajax({
        url: url,
        success: function(responseText) {
            if(responseText == "") {
                console.log("no content");
                return;
            }
            var $body = $(responseText);
            //console.log(responseText);
            var $rbody = $body.find("#content > .post.f:eq(0)");
            
            var scrollTop = $(document).scrollTop();
            
            $rbody
            .find("h3:eq(0)").remove().end()
            .find("script:eq(0)").remove().end()
            .find("br:eq(0)").remove().end();
            
            $(document.createElement('hr'))
            .appendTo($rbody);
            $body.find(".hotcomment > .in")
            .appendTo($rbody).end()
            .find(".acv_comment").css("width", "100%");
            
            var closeButton = $(document.createElement('botton'))
            .css({float:'right', color:'#2854bb'})
            .text("收起")
            .click(function() {
                $rbody.fadeToggle("fast", function(){
                    $(this).replaceWith($parent.hide());
                    $parent.fadeToggle();
                    $rbody = null;
                });
                
                $(document).scrollTop(scrollTop);
                $parent.find(".expand_button").click(function(){
                    processPage($parent);
                });
            });
            
            closeButton.insertBefore($rbody.find(".break"));
            closeButton.clone(true).insertAfter($rbody.find(".time_s")); //设置clone(true):withDataAndEvents 
            
            console.log($rbody.html());
            
            $parent.fadeToggle("fast", function(){
                $(this).replaceWith($rbody.hide());
                $rbody.fadeToggle();
            });
        }
    });
}

function processExpand() {
    $("#content > .post.f").each(function(index,element) {
        $(document.createElement('botton'))
        .appendTo($(element).find(".indexs"))
        .css({float:'right', color:'#2854bb', "margin": "1em"})
        .attr({"class":'expand_button', "index":index})
        .text("展开")
        .click(function(){
            processPage($(element));
        });
    });
}

$(document).ready(function() {  
    processClean();
    
    var url = window.location.href;
    if(/jandan\.net\/$/.test(url)) {
        processExpand();
    }
});