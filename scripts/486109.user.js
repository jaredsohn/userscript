// ==UserScript==
// @name       Fix `Show xxx More` in Torrentbutler
// @namespace  http://luizluca.blogspot.com.br/
// @version    0.1
// @description "show xxx more" button in Torrentbutler fails in some cases. This script replaces it with a working version
// @match      http://torrentbutler.eu/*
// @copyright  2014+, Luiz Angelo Daros de Luca <luizluca@gmail.com>
// @require http://code.jquery.com/jquery-latest.js
// ==/UserScript==

updateShowMoreTimeout=setInterval(function(){    
    $(".show_more:not(.alternative_show_more)").each(function (index, element){
        $(this).attr("onclick","$(this).parents('tfoot').siblings('.more').show();$(this).hide();return false;");  
        $(this).addClass("alternative_show_more");                      
    });
},3000);