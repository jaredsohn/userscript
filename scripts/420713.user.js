// ==UserScript==
// @name            Hack Forums -10000 reputation for Froggy
// @namespace       Snorlax
// @description     Removes 10000 reputation from Froggy
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @include         *hackforums.net/*
// @version         1.0
// ==/UserScript==

offset = -10000;

if(window.location.href.indexOf("hackforums.net/showthread.php") >= 1) {
    $('a[href="http://www.hackforums.net/member.php?action=profile&uid=1320406"]').parentsUntil('tbody').find('.post_author_info').find("a[href*='reputation.php']").find("strong").text(function(i,txt) {
        return parseInt(txt, 10) + offset;
    });
    console.log("Thread page");
}

if(window.location.href.indexOf("hackforums.net/member.php?action=profile&uid=1320406") >= 1) {
    $(".reputation_positive").text(function(i,txt) {
        return parseInt(txt, 10) + offset;
    });
    console.log("Profile page");
}

if(window.location.href.indexOf("hackforums.net/reputation.php?uid=1320406") >= 1) {
    $(".repbox").text(function(i,txt) {
        return parseInt(txt, 10) + offset;
    });
    console.log("Reputation page");
}