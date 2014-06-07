// ==UserScript==
// @name			GM Forum check
// @author                      Tjeerdo (AF: .Arrogant || skypenaam: tjeerdov)
// @description		        Forum check voor TW.nl     
// @version        	        0.1
// @include                     http://nl*.tribalwars.nl/game.php?*&mode=members&screen=ally
// @include                     http://nl*.tribalwars.nl/game.php?*&screenmode=view_forum&forum_id=*&mode=new_thread&screen=forum
// @include                     http://nl*.tribalwars.nl/game.php?*&screenmode=view_thread&thread_id=*&screen=forum

// ==/UserScript==

(function (f) {
    var d = document,
        s = d.createElement('script');
    s.textContent = '$(document).ready(' + f.toString() + ')';
    (d.body || d.head || d.documentElement).appendChild(s);
})(function () {
if(location.href.indexOf("mode=members") > -1 && location.href.indexOf("screen=ally") > -1 && localStorage['ForumCheck_Members'] === undefined) {
    var members = "";
    $("#ally_content tr[class*='row_']").each(function() {
        var temp = $(this).find(".lit-item:first").find('a[href*="&screen=info_player"]').text();
        members += temp + " - ";        
    })
    localStorage['ForumCheck_Members']= JSON.stringify(members);
}
if(location.href.indexOf("screenmode=view_forum") > -1 && location.href.indexOf("mode=new_thread") > -1) {
    $("#message").keyup(function() {
    if($("#message:contains('[check]')").length > 0) {
        var members_temp = JSON.parse(localStorage['ForumCheck_Members']).split(" - "), members = "";
        $.each(members_temp, function(k,v) {
            if(v != "") {
            members += "[*]" + v + "[/*]";
            }
        })
        $("#message").val($("#message").val().replace("[check]" , "[table][**]ForumCheck[/**]"+members+"[/table] Forumcheck makkelijk gemaakt met [url='http://forum.tribalwars.nl/showthread.php?166520']Tjeerdo's forumcheck script[/url]"));
    }
    })
}
if(location.href.indexOf("screenmode=view_thread") > -1 && location.href.indexOf("screen=forum") > -1 && $(".post:first .text .bbcodetable:has(th:contains(\"ForumCheck\"))").length > 0 && $(".post:first .post_thanks_who").length > 0) {
        var temp = new Array;
        var i = 0;
        $.each($(".post:first .post_thanks_who a[href*='screen=info_player']"), function() {
            if($(".post:first .text .bbcodetable:has(s:contains('"+$(this).html()+"'))").length < 1) {
                temp[i] = $.trim($(this).html());
                i++;
            }
        })
        if(temp.length > 0) {
        localStorage['ForumCheck_temp'] = JSON.stringify(temp);
        $("a[href*='edit_post_id']")[0].click();
        }
}
if(location.href.indexOf("screenmode=view_thread") > -1 && location.href.indexOf("edit_post_id=") > -1 && $("#message:contains(\"ForumCheck\")").length > 0) {
    var temp = JSON.parse(localStorage['ForumCheck_temp']);
    $.each(temp, function(i) {
        if($("#message:contains('"+temp[i]+"')").length > 0) {
            $("#message").val($("#message").val().replace(temp[i], "[s]"+temp[i]+"[/s]"));
        }
    })
    $("input[value*='Zenden']").click();
}})