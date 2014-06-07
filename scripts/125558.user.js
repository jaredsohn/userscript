// ==UserScript==
// @id             dAFriendListHelper
// @name           DeviantArt Friend List Helper
// @version        1.0
// @namespace      http://www.puramaldad.com/dAFLH
// @author         Willy Galleta
// @description    Allows better management of users in dA friend lists.
// @include        http://my.deviantart.com/deviants/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.5.2/jquery.min.js
// @run-at         document-end
// ==/UserScript==
function addClicks()
{
    $("body").append('<style>table.zebra tr:hover{background-color: rgb(231,213,255)} .friend-selected{background-color:rgb(250,200,250) !important}</style>');
    var selectFriend = function() {
        var e;
        var checks = [$(),
                      $("#friend_attr_friend"),
                      $("#friend_attr_deviations"),
                      $("#friend_attr_journals"),
                      $("#friend_attr_forums"),
                      $("#friend_attr_critiques"),
                      $("#friend_attr_scr"+"aps")];
        $("#username").val($(this).find(".u").text());
        for(i in checks)
        {
            if($(this).find("td").eq(i).find(".checkbox").hasClass("checked"))
            {
                e = true;
            } else {
                e = false;
            }
            checks[i].attr("checked",e);
        };
        $(".friend").removeClass("friend-selected");
        $(this).addClass("friend-selected");
    }
    $(".friend").click(selectFriend);
    $("#add-deviant form").submit(function()
    {
        $.post($(this).attr("action"), $(this).serialize(), function() {alert("Actualizado.")});
        return false;
    });
    $("#deviantspager a").click(function()
    {
        $(".friends").unbind("click", selectFriend);
        setTimeout(checkFriends, 500);
    });
}
function checkFriends()
{
    if($(".friend").length>1)
    {
        addClicks();
    } else {
        setTimeout(checkFriends, 200);
    }
}
$(function()
{
    checkFriends();
});