// ==UserScript==
// @name        Custom Username
// @namespace   customusername
// @include     *.rune-server.org/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @grant       none
// ==/UserScript==
var usernames = new Array();

// load cached usernames
if (localStorage.getItem("usernames") !== null) {
    usernames = JSON.parse(localStorage["usernames"]);
}

// usernames database
$.ajax({
    dataType: "json",
    url: "http://dl.dropboxusercontent.com/u/107563907/usernames.json",
    success: function(data) {
        usernames = new Array();
        $.each(data, function(userId, username) {
            usernames[userId] = username;
        });
        // cache usernames
        localStorage["usernames"] = JSON.stringify(usernames);
        // load local usernames
        localUsernames();
    }
});

function localUsernames() {
    // overrides go here
    // new username/username override: usernames[userId] = "New Username";
    // deletion of db entry: delete usernames[userId];
}

// postbit impl
var userIdRegex = new RegExp("userid=(.*?)&");
$(".username_container").each(function() {
    var userId = userIdRegex.exec($(this).find(".siteicon_forum").attr("href"))[1];
    var $usernameElement = $(this).find(".username");
    var username = $usernameElement.text().trim();
    if (usernames[userId] != null) {
        replace($usernameElement, username, usernames[userId]);
    }
    bindTooltip($(this), userId, username);
});

// shoutbox impl
var updating = false;
function updateUsernames() {
    if (updating) {
        return;
    }
    updating = true;
    $("#shoutbox_frame a[onclick*='open_pm_tab']").each(function() {
       var params = $(this).attr("onclick").split("'");
       var userId = params[1].split("_")[1];
       var username = params[3];
       if (usernames[userId] != null) {
           replace($(this), username, usernames[userId]);
       }
       bindTooltip($(this), userId, username);
    });
    updating = false;
}
$("#shoutbox_frame").bind("DOMSubtreeModified", updateUsernames);

// tooltip
$("body").append(
    "<span id='tooltip' style='padding:3px;background:#000;border:1px #FFF solid;color:#FFF;'></span>"
).mousemove(function(e) {
    $("#tooltip").offset({ top: e.pageY + 15, left: e.pageX + 10 });
});
$("#tooltip").hide();

function bindTooltip(element, userId, username) {
    element.mouseenter(function() {
        $("#tooltip").html("#" + userId + " " + username);
        $("#tooltip").show();
    }).mouseleave(function() {
        $("#tooltip").hide();
    });
}

// utility
function replace(element, find, replace) {
    element.html(element.html().replace(find, replace));
}