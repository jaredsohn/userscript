// --------------------------------------------------------------------------------
// Copyright (C) 2008  Mingda Cui [cuimingda(at)gmail(dot)com || http://cuimingda.com]
// Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) 
// and GPL (http://www.gnu.org/licenses/) licenses.
//
// ==UserScript==
// @name            Douban Group Last Reply
// @namespace       http://cuimingda.com
// @description     [douban.com] click reply count to view the last reply
// @include         http://www.douban.com/group/
// @include         http://www.douban.com/group/*/
// @include         http://www.douban.com/group/*/discussion*
// @include         http://www.douban.com/group/my_topics
// @include         http://www.douban.com/people/*/group_topics*
// @include         http://www.douban.com/people/*/topics*
// @include         http://www.douban.com/people/*/replied_topics*
// @require         http://jqueryjs.googlecode.com/files/jquery-1.3.min.js
// ==/UserScript==
//
// 0.1 @ 2009/01/16 # Initial Release
// --------------------------------------------------------------------------------

;(function() {
    var replyIndex = $(".olt tr:first td").length - 2;
    
    $(".olt tr:gt(0) td:eq(" + replyIndex +")").each(function() {
        var replyCount = $(this).text() === "" ? 0 : parseInt($(this).text());
        var topic = $(this).parent().find("a[href*=/group/topic/]:first").attr("href");
        
        $(this).html("<a href=\"" + topic + 
            (replyCount<=100 ? "" : ("?start=" + Math.floor((replyCount-1)/100)*100)) + "#last\">" + replyCount + "</a>");
    });
})();