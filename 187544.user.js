// ==UserScript==
// @name			Title Title
// @description		This script puts the channel and title of the DI.fm track inside the header title.
// @include			http://*.di.fm/*
// @version			1.0
// @author			Matthew Sanders
// @grant			RestoreSandbox
// @require         http://code.jquery.com/jquery-1.10.2.min.js
// ==/UserScript==

function period() {
    var channel = $("#channel-title").html(),
    	songTitle = $(".title").html(),
        currentArt = $("#art").children("img").attr("src").split("?")[0];
            
    document.title = songTitle != "" ? songTitle+" ("+channel+")" : "Digitally Imported > "+channel;
    
    if($("#dynamicIcon").length != 0) {
        $("#dynamicIcon").remove();
    }
    var link = document.createElement('link');
    link.id = "dynamicIcon";
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = currentArt+"?size=32x32";
    $("head").append(link);
}

setInterval ( period, 2000 );