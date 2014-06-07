// ==UserScript==
// @name       Redmine Ticket Status Hilighter
// @namespace  http://twitter.com/foldrr‎
// @version    0.1
// @description  Hilight ticket status on ticket list.
// @match      http://*/redmine/projects/*/issues*
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js
// @copyright  2013+, foldrr
// ==/UserScript==

(function(){
    var statusList = $('.status');
    jQuery.each(statusList, function(i, elem){
        text = $(elem).text();
        if(text == "新規") $(elem).css("background-color", "#FAA");
        if(text == "進行中") $(elem).css("background-color", "#FC0");
        if(text == "解決") $(elem).css("background-color", "#AFA");
        if(text == "フィードバック") $(elem).css("background-color", "#B8F");
    });
})();
