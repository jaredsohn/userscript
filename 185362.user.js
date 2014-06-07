// ==UserScript==
// @name           Pauser Muzzler
// @description    Translates The Pauser's posts into English
// @include        http://hfboards.hockeysfuture.com/*
// @require        http://code.jquery.com/jquery-latest.min.js
// @grant          metadata
// ==/UserScript==

$(document).ready(main);

function main()
{    
     //Kill Pauser's posts
    $(".tborder").each(function() {

        if($(this).children("tbody").children("tr").children(".alt2").children("div").children("a").attr("href") == "member.php?u=40562")
            {
                $(this).children("tbody").children("tr").children("td").each(function(){                    
                    $(this).children(".postbitmessage").html("I am trolling as usual, <a href=http://hfboards.hockeysfuture.com/profile.php?do=addlist&userlist=ignore&u=40562>ignore me.</a>");
                })
            }
    });

    //Kill Quote's of Pauser's posts.
    $(".postbitmessage")
    .children("div:contains('y2kcanucks')")
    .html("<div class=smallfont style=margin-bottom:2px>Quote:</div><table border=0 cellpadding=4 cellspacing=0 width=100%><tbody><tr><td class=alt2 style=\"border:1px inset\"><div>Originally Posted by <strong> Pauser </strong><a href=http://blog.littlebigfund.org/wp-content/uploads/2013/04/facepalm-wallpaper.jpg rel=nofollow><img title=\"View Post\" class=inlineimg src=images/buttons/viewpost.gif alt=\"View Post\" border=0></a></div><div style=font-style:italic><b>Blah Blah Blah</b> Luongo <b>Blah Blah</b> Sedins <b>Blah</b></div></td></tr></tbody></table>");
}