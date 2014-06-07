// ==UserScript==
// @name       HideMOTD
// @namespace  http://milkbartube.com/
// @version    0.1
// @description  hides message of the day
// @match      http://cytu.be/r/*
// @match      http://milkbartube.com/r/*
// @copyright  2012+, You
// @run-at document-end
// ==/UserScript==
 
var hidden = false;
showHide = $("<li/>").click(function() {
        if (hidden == false) {
        $("#motd").slideUp();
        $("#motdwrap").slideUp();
        hidden = true;
        $("#hideMOTD").text("Show MOTD");
    }
    else if (hidden == true) {
        $("#motd").slideDown();
        $("#motdwrap").slideDown();
        $("#hideMOTD").text("Hide MOTD");
        hidden = false;
    }})
        .html("<a id='hideMOTD' href='javascript:void(0)'>Hide MOTD</a>")
        .appendTo($(".nav")[0]);
 
socket.on("setMotd", keepHidden);
 
function keepHidden() {
    if (hidden == true) {
        $("#motdwrap").slideUp();
        hidden = true;
        $("#hideMOTD").text("Show MOTD");
    }
}