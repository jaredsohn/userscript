// ==UserScript==
// @author         and80506@163.com
// @version        0.5
// @name           weibo remake
// @namespace      weibo.com
// @include        http://www.weibo.com/*
// @include        www.weibo.com/*
// @include        http://weibo.com/*
// @run-at         document-end
// @require https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jqauery.min.js
// ==/UserScript==

$(function(){
    //复制下一页按钮到页面上方
    var pollNextButton =  setInterval(checkIfLoadedNextButton,500);
    function checkIfLoadedNextButton(){
        var nextButton = $('.W_pages');
        if (nextButton.length != 0) {
            clearInterval(pollNextButton);
            nextButton.clone().prependTo(nextButton.parent());
            $('<div style="position:fixed;top:45%;left:45%;color: #F60;overflow: hidden;">下一页按钮已加载</div>').appendTo('body').animate({height:0},2000);
        }
    }
    var box = $('#Box_center');
    box[0].addEventListener('DOMSubtreeModified',function(){
        //去除推广广告
        var adTitle = $('legend.S_txt3');
        if(adTitle.text() == '微博推广'){
            adTitle.parents('div[data-mark]').hide();
        }
        //开启微博屏蔽功能
        var linkP = $('a[title="展开屏蔽选项"]');
        linkP.css('visibility','visible');
    },false);
})