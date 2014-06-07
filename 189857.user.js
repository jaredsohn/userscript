// ==UserScript==
// @name        Username tooltip for infernoshout by kLeptO
// @namespace   usernametooltip
// @description Displays previous username (if any) as a tooltip while hovering over username in the shoutbox.
// @include     *.rune-server.org/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js 
// @grant       none
// ==/UserScript==
var cachedUsernames = new Array();
var currentlyLoading = -1;
$( document ).ready(function() {
    InfernoShoutbox.update_shouts_orig = InfernoShoutbox.update_shouts;
    InfernoShoutbox.update_shouts = function(shouts) {
        InfernoShoutbox.update_shouts_orig(shouts);
        var shouts = document.getElementById("shoutbox_frame").getElementsByTagName("div");
        $.each(shouts, function(index, parent) {
            $.each(parent.getElementsByTagName("a"), function(i, element) {
                var onclick = new String(element.onclick);
                var index = onclick.indexOf("open_pm_tab");
                if (index != -1) {
                    var userId = onclick.substring(index + 16).split('\'')[0];
                    $(this).hover(function() {
                        setUsernameTooltip(userId, $(this));
                        $("#previousUsername").offset({ top: $(this).offset().top + 10, left: $(this).offset().left + 60})
                    });
                    $(this).mouseout(function() {
                        $("#previousUsername").hide();
                    });
                    return false;
                }
            });
        });
    };
    $("body").append("<ul id='previousUsername' style='width:80px;background:#222;padding:2px;padding-left:5px;padding-right:5px;border:#CCC 1px solid;color:#CCC;'></ul>");
    $("#previousUsername").hide();
});

function setUsernameTooltip(userId, link) {
    $("#previousUsername").show();
    if (cachedUsernames[userId] != null) {
        $("#previousUsername").html(cachedUsernames[userId]);
    } else {
        currentlyLoading = userId;
        $("#previousUsername").text("Loading...");
        $.get("http://www.rune-server.org/member.php?u=" + userId, function( data ) {
            var skip = true;
            var usernames = "";
            $(".historyblock tr", $(data)).each(function () {
                if (skip) {
                    skip = false;
                    return true;
                }
                usernames += "<li>" + $(this).children("td:first").text() + "</li>";
            });
            if (usernames == "") {
                usernames = "N/A";
            }
            cachedUsernames[userId] = usernames;
            if (currentlyLoading == userId) {
                $("#previousUsername").html(usernames);
            }
        });
    }
}