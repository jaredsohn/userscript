// ==UserScript==
// @name           GReader
// @namespace      blog.h2ero.cn
// @description  Google Reader增强脚本
// @include        https://www.google.com/reader/*
// @version        1.1
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// ==/UserScript==

GM_addStyle("#gb{display:none;}" +
                        "#entries.list .entry .collapsed { height: 24px; }" +
                        "#open-seach-bar { font-size: 14px; line-height: 15px !important; margin-left: 70px; margin-top: 9px; padding: 6px; }"+
                        "#open-seach-bar:hover{ cursor: pointer !important;}"+
                        ".sina-share{margin-top: 1px; position: absolute;}" );
$(function() {
    //search button
    $('#logo-section #logo-link').append('<a id="open-seach-bar" class="jfk-button-standard">Search</a>');
    $('#open-seach-bar').click(function() {
        $('#gb').slideToggle();
        return false;
    });
    //sina share
    $('.entry-body').live('hover', function() {
        var url=$('.entry-title-link').attr('href')
        var _w = 72, _h = 16;
        var param = {
            url :url,
            type : '3',
            count : '1', /**是否显示分享数，1显示(可选)*/
            appkey : '', /**您申请的应用appkey,显示分享来源(可选)*/
            title : '', /**分享的文字内容(可选，默认为所在页面的title)*/
            pic : '', /**分享图片的路径(可选)*/
            ralateUid : '', /**关联用户的UID，分享微博会@该用户(可选)*/
            language : 'zh_cn', /**设置语言，zh_cn|zh_tw(可选)*/
            rnd : new Date().valueOf()
        }
        var temp = [];
        for(var p in param ) {
            temp.push(p + '=' + encodeURIComponent(param[p] || ''))
        }
        if($(".sina-share").length == 0)
            $('.entry-actions').append('<span class="sina-share"><iframe allowTransparency="true" frameborder="0" scrolling="no" src="http://hits.sinajs.cn/A1/weiboshare.html?' + temp.join('&') + '" width="' + _w + '" height="' + _h + '"></iframe></span>');
    });
}); 