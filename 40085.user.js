// --------------------------------------------------------------------------------
// Copyright (C) 2008  Mingda Cui [cuimingda(at)gmail(dot)com || http://cuimingda.com]
// Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) 
// and GPL (http://www.gnu.org/licenses/) licenses.
//
// ==UserScript==
// @name            Kaixin001 View All Truth
// @namespace       http://cuimingda.com
// @description     In the "Truth Game", add some links in the list, which can be clicked to view all the answers of friends.
// @include         http://www.kaixin001.com/app/app.php?aid=1072&url=list.php*
// @include         http://www.kaixin001.com/app/app.php?aid=1072&url=friend.php*
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// ==/UserScript==
//
// 0.1 @ 2009/01/09 # Initial Release
// --------------------------------------------------------------------------------

;(function() {
    $("a[class=c9][href*=detail.php]").each(function() {
        var tid = $(this).attr("href").match(/tid=(\d+)/)[1];
        var url = "/app/app.php?aid=1072&url=tlist.php&tid=" + tid + "&anticache=" + Math.floor(Math.random()*1000);
        
        $(document.createElement("a"))
            .attr("href", "")
            .text("全部好友")
            .addClass("c9")
            .appendTo($(this).parent())
            .before("&nbsp;┊&nbsp;")
            .click(function(event) {
                event.preventDefault();
                location.href = url;
            });
            
    });
})();