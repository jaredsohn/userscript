// ==UserScript==
// @name           tennis-x blog comments refresh
// @namespace      txrefresh
// @description    Renders recent comments without page refresh
// @include        http://www.tennis-x.com/xblog/*
// @require        http://jqueryjs.googlecode.com/files/jquery-1.3.2.js
// ==/UserScript==

var requestURL = this.location.href;
var interval = 60; // in seconds

$(document).ready(function(){
    window.setTimeout(refreshComments, interval * 1000);
    $("td.page").siblings().each(function(){
    	$(this).hide();
    });
});


var refreshComments = function() {
    var $commentsHolder = $(".entrytext:eq(1)");
    var currentCount = $commentsHolder.children().size() - 1;
    $.get(requestURL, function(data) {
        $("div.entrytext:eq(1) div:gt("+currentCount+")", data).appendTo($commentsHolder);
        window.setTimeout(refreshComments, interval * 1000);
    });
}
