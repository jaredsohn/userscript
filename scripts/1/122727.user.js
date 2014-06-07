// ==UserScript==
// @name           隐藏帖自动回复机
// @namespace      https://plus.google.com/u/0/105378903141101735508
// @version        1.1
// @description    自动回复基于discuss论坛的隐藏帖（在用户已经登录且无需验证码时）
// @include        http://*/*
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// @copyright      2011+, 叶虫
// @history        1.1 增加了对验证码的检测，修正了新版discuss论坛主贴下方的快速回复对脚本的影响
// ==/UserScript==

(function($) {
    var default_message = '感谢楼主分享，顶贴支持～';
    
    function autoReply() {
        var fastpost_textarea = $('#fastpostmessage');
        var fastpost_submit = $("#fastpostsubmit");
        var fastpost_refresh = $("#fastpostrefresh");
        var fastpost_verify = $('input[name="seccodeverify"]');

        if (fastpost_textarea.length == 0 || fastpost_submit.length == 0) {
            alert("未找到快速回复表格！");
            return;
        }

        fastpost_refresh.removeAttr("checked");

        var message = getMessage();
        if(message == false){
            return;
        }
        
        fastpost_textarea.text(message);

        if(fastpost_verify.length > 0){
            alert("需要输入验证码！");
            scrollButtom();
            fastpost_verify.focus();
            return;
        }

        fastpost_submit.click();
    }

    function checkSupport() {
        return $('script:contains("replyreload +=")').length > 0;
    }

    function findHidenSection(){
        return $('div.locked').length > 0;
    }

    function scrollButtom(){
        var h = document.body.scrollHeight;
        window.scroll(0, h);
    }

    function getMessage() {
        var reply_message;

        try {
            reply_message = localStorage["auto_reply_message"];
        } catch (err) {
        }

        if (reply_message == null || (reply_message = $.trim(reply_message)).length == 0)
            reply_message = default_message;

        var new_message = prompt('发现隐藏贴，是否要自动回复？', reply_message);
        if (new_message == null)
            return false;

        if ((new_message = $.trim(new_message)).length == 0)
            new_message = default_message;

        try {
            localStorage["auto_reply_message"] = new_message;
        } catch (err) {
        }

        return new_message;
    }

    try {
        if(checkSupport() && findHidenSection()){
            autoReply();
        }
    } catch (err) {
    }
})(jQuery);