// ==UserScript==
// @name          Reddit Mod Nuke Userscript
// @version       0.299.792.458
// @include       htt*://*.reddit.com/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @author        djimbob (dr jimbob)
// @description   This userscript helps reddit moderators delete threads.
// ==/UserScript==

var nuke_button = new Array();

$('body.moderator div.noncollapsed').each(function(i,divel) {
    var author_link = $(divel).find('p.tagline a.author');
    nuke_button[i] = $('&nbsp;<a href="javascript:void(0)" title="Nuke!" id="nuke'+ i +'">[Nuke!]</a>&nbsp;').insertAfter(author_link);
    nuke_button[i].click(function(){ 
    var delete_buttons = $(divel).parent('div.entry').parent('div.comment').find('form input[value=removed]~span.option.error a.yes,a.pretty-button.neutral');
    if (confirm("Are you sure you want to nuke the following " + delete_buttons.length + " comments?")) {
        $.each(
        delete_buttons,
        function(indx, elmnt) {
            setTimeout(
            function() {
                $(elmnt).click();
            }, 1000*indx); // timeout prevents overloading reddit.
        }
        );
    }
    });
});