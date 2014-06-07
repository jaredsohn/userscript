// ==UserScript==
// @name       Hide/Show facebook group pins
// @namespace  http://yadurajiv.com
// @version    0.2
// @description  Hides all facebook pinned posts by default and shows a message that lets you toggle pinned post visibility in facebook groups.
// @match https://www.facebook.com/groups/*
// @copyright  2012+, Yadu Rajiv
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==
var urlThen = window.location.href;
var urlNow = "";
var pinVisible = false;
function addPinHead() {
    if($("#pinhead") != null) {
        $("#pinhead").remove();
    }
    
    var n = 0;
    if($("#pagelet_pinned_posts div.storyContent") != null) {
        n = $("#pagelet_pinned_posts div.storyContent").size();
    }
    if(n > 0) {
        $("#pagelet_pinned_posts").after("<div id=\"pinhead\" style=\"text-align:center;font-weight:bold;\"><a name=\"shp\" id=\"shp\" href=\"javascript:void(0);\">Click here to show/hide pins. " + n + " pinned.</a></div>");
        $("#shp").click(function() {
            if(pinVisible == false) {
                pinVisible = true;
                showPins();
            } else {
                pinVisible = false;
                $("#pinhead").remove();
                hidePins();
            }
        });
    }
}
function hidePins() {
    if(urlNow.search("facebook.com/groups") != -1 && $("#pagelet_pinned_posts").css("display") != "none" && pinVisible == false) {
        $("#pagelet_pinned_posts").css("display","none");
        addPinHead();
        pinVisible = false;
    }
}
function showPins() {
    if(urlNow.search("facebook.com/groups") != -1 && $("#pagelet_pinned_posts").css("display") != "block" && pinVisible == true) {
        $("#pagelet_pinned_posts").css("display","block");
        pinVisible = true;
    }
}
function testPage() {
    urlNow = window.location.href;
    if(pinVisible == false) {
        hidePins();
    } else {
        showPins();
    }
    
    if($("#pinhead") == null) {
        addPinHead();
        pinVisible = false;
        hidePins();
    }
    
    if(urlNow != urlThen) {
        urlThen = urlNow;
        pinVisible = false;
    }
}
setInterval(testPage,500);