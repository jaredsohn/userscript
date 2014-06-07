// ==UserScript==
// @name        百度贴吧图片放大[经典模式]
// @namespace   http://sbwtw.cn/
// @description 还原为以前百度的看图模式，新窗口打开，无连续看图，无水印
// @include     http://tieba.baidu.com/p/*
// @include     http://tieba.baidu.com/f?*
// @author      o丨Reborn <sbwtws@gmail.com>
// @updateURL   https://userscripts.org/scripts/source/157402.meta.js
// @downloadURL https://userscripts.org/scripts/source/157402.user.js
// @icon        http://tb.himg.baidu.com/sys/portrait/item/d92f6fd8ad5265626f726ee90f
// @version     13-01-24.1
// ==/UserScript==
window.addEventListener('DOMContentLoaded',function(){
    var $=unsafeWindow.$;
    // 遍历每个图片元素.
    $(".BDE_Image").each(function(){
        // 去掉事件
        $(this).parent().html($(this).parent().html());
    });
    // 右下角的分享
    $(".fav-toolbar").css("padding-left","1px");
    // //连续看图
    $("#pic_to_album_tip").remove();
    // 重新为每个元素绑定事件
    $(".BDE_Image").each(function(){
        // 得到图片ID
        var reg=/\/[a-z0-9]{20,}(?=\.[jpg|gif|png])/;
        var match=$(this).attr("src").match(reg);
        if(!match){return;}
        var picSrc="http://imgsrc.baidu.com/forum/pic/item"+match[0]+".jpg";
	    // 图片资源
        $(this).attr("onclick","window.open('"+picSrc+"');");
    });
},false);

