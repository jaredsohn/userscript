// ==UserScript==
// @name        imgur.com voter
// @description Up/-Downvote all for imgur.com
// @description Written by Lanjelin
// @include     http://imgur.com/user/*
// @author      Lanjelin
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.js

// @require http://sizzlemctwizzle.com/updater/166358.js
// usoCheckup grant permissions for Greasemonkey 1.x+
// @grant          GM_getValue
// @grant          GM_updatingEnabled
// @grant          GM_registerMenuCommand
// @grant          GM_setValue
// @grant          GM_xmlhttpRequest
// @version        0.3.5

// ==/UserScript==
var no_upvotes = 0;
var no_downvotes = 0;
function downVote() {
    $(".arrows div:nth-child(2)").each(function() {
    //$('div[title="dislike"]').each(function() {
        if ($(this).attr("class") != "arrow down pushed"){
            if ($(this).attr("class") != "arrow down pushed"){
                if ($(this).parent().attr("class") != "rawld"){
                    $(this).click();
                    no_downvotes += 1;
                    getNo();
                }
            }
        }
        $(this).parent().attr("class", "rawld");
        $(this).parent().parent().parent().parent().parent().hide();
        $("#content .left .panel #captions .spacer").hide();
    });
}
function upVote(){
    $(".arrows div:nth-child(1)").each(function() {
    //$('div[title="like"]').each(function() {
        if ($(this).attr("class") != "arrow up pushed"){
            if ($(this).attr("class") != "arrow up pushed"){
                if ($(this).parent().attr("class") != "rawld"){
                    $(this).click();
                    no_upvotes += 1;
                    getNo();
                }
            }
        }
        $(this).parent().attr("class", "rawld");
        $(this).parent().parent().parent().parent().parent().hide();
        $("#content .left .panel #captions .spacer").hide();
    });
}
function getNo(){
    if (no_upvotes > 0 && no_downvotes > 0) {
        theResult = no_upvotes + " upvoted" + " & " + no_downvotes + " downvoted";
    } else if (no_upvotes > 0) {
        theResult = no_upvotes + " upvoted";
    } else if (no_downvotes > 0) {
        theResult = no_downvotes + " downvoted";
    } else {
        theResult = "";
    }
    $('#rawl_vote').html(theResult);
}
$(document).ready(function() {
    $("#main-nav").append('<div id="rawl_menu" style="position:absolute;display:inline;z-index:2;width:auto;"><ul><li id="imup" style="height:52px;"><a>Up</a></li><li id="imdo"><a>Down</a></li></ul></div>');
    $(".left .panel #captions .panel-header").append('<div id="rawl_vote"> </div>');
    $("#imup").click(function(){
        upVote();
    });
    $("#imdo").click(function(){
        downVote();
    });
});