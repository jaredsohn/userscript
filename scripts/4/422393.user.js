// ==UserScript==
// @name       KtxpDeleteElement
// @namespace  http://userscripts.org/scripts/show/422393
// @version    0.3
// @description  主要功能是看本日更新时不用被某些文字刷屏。支持自行添加分支。
// @match      http://bt.ktxp.com/*
// @require    http://code.jquery.com/jquery-1.9.0.min.js
// @copyright  2014.03.22, JMNSY
// ==/UserScript==
$().ready(function(){
    $("a").each(function(){
        if($(this).text().match(/&#32958;$/)){
            $(this).parent().parent().remove();
        }
    });
});
