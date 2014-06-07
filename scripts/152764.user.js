// ==UserScript==
// @name         vdisk Webhost no code / 威盘免验证码
// @namespace    http://jixun.org/
// @version      0.1
// @description  vDisk no code
// @require      http://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.8.2.min.js
// @include      *://*.vdisk.cn/down/index/*
// @include      *://vdisk.cn/down/index/*
// @copyright    2012+, Jixun
// ==/UserScript==

(function () {
    
    // 模拟: yanzheng_ok
    $('#btnbox').show ();
    $('#yanzhengbox').remove();
    $('#yzmbox').remove();

    // 清理右下角广告
    $('#ShowDIV').remove();

    // 清理乱七八糟的链接
    $('a[href*="http"]').not('[href*="vdisk"]').remove();
    $('script[src^="http"]').remove();
    $('ifarme').remove();
    
    // 空白区域
    $('div[style*="width:728px"][style*="left:50%"]').remove();
    $('div[style*="height:90px"]').remove();

    /*  专用链破解 中的解码代码引用.
     *     -- UserScript ID: 66985
     */
    var tl = $('a[oncontextmenu]');
    tl.attr('href', atob(tl.attr('thunderhref').replace(/(?:thunder|flashget|qqdl):\/\/|&.*|\/$/ig, '')).replace(/^AA|ZZ$|\[FLASHGET\]/g, ''));
    tl.removeAttr('oncontextmenu').removeAttr('onclick');

    /*   Un-comment those if you'd like an AD in the banner xD
     *
     *   $('<a/>', { href: 'http://jixun.org/', target: "_blank", text: 'jixun.org' })
     *       .appendTo('#leftpanel');
     *
     * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
    
}) ();