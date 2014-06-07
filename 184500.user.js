// ==UserScript==
// @name        Niconico Seiga, コメント全件表示
// @description ニコニコ静画のコメントを全て表示します
// @namespace   http://userscripts.org/user/lpha
// @include     http://seiga.nicovideo.jp/seiga/*
// @version     1.1
// @grant       none
// ==/UserScript==
(function () {
    var window = typeof unsafeWindow == "undefined" ? window : unsafeWindow, document = window.document;
    var $ = window.jQuery;
    $(function () {
        var css = '\
#ko_comment #comment_list { max-height: 469px; overflow-y: auto; padding-top: 3px; }\
#ko_comment .comment_list_item li.text { margin: 3px 0; }\
#ko_comment .comment_list_item li.date,\
#ko_comment .comment_list_item li.id {\
display: none;\
}\
#ko_comment .comment_list_item li.count_new { position: absolute; top: -1px; left: 4px; Opacity: 0.8; }\
#ko_comment .res { position: relative; margin-top: -18px; padding-top:18px; background-color: #fff; z-index: 1001; \
box-shadow:rgb(255, 255, 255) 0px -10px 10px 10px;\
-webkit-box-shadow:rgb(255, 255, 255) 0px -10px 10px 10px;\
-moz-box-shadow:rgb(255, 255, 255) 0px -10px 10px 10px;\
}\
';
        $("head").append($("<style />").text(css));
        
        var vm = window.ko.contextFor($("#ko_comment")[0]).$rawData;
        if (vm.commentShowCount() < vm.commentCount()) {
            vm.reload();
        }
    });
})();