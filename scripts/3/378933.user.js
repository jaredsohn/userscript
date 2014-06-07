// ==UserScript==
// @name        hipda 帖子样式
// @namespace   hipda
// @description hipda 帖子样式
// @include     http://www.hi-pda.com/forum/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @require     http://www.datejs.com/build/date.js
// @version     1
// ==/UserScript==

$("td.author em").each(function() {
    var nowDay = Date.today();
    var threadDay = Date.parse($(this).text());
    var diffDay = (nowDay.getTime() - threadDay.getTime()) / 3600 /1000 /24
    var color = "rgb(161,157,158)"
    if (diffDay == 0) {
        color = "rgb(255,255,255)"
    } else if (diffDay == 1){
        color = "rgb(248,221,228)"
    } else if (diffDay >=2 && diffDay < 5) {
        color = "rgb(238,178,190)"
    } else if (diffDay >=5 && diffDay <= 14) {
        color = "rgb(235,137,160)"
    } else if (diffDay >14 && diffDay <= 30) {
        color = "rgb(187,175,177)"
    }
    $(this).parent().parent().parent().css( "background-color", color );
    
});
