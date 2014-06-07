// ==UserScript==
// @author        Zxw
// @name          Reddit Hide
// @description	  Reddit Hide
// @include       http://*.reddit.com/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// ==/UserScript==


function pausecomp(millis) {
    var date = new Date();var curDate = null;do { curDate = new Date(); } while(curDate-date < millis);
}

var hide_buttons = null;
var hide_button_index = null;

$(document).ready(function() {
    $('.tabmenu').append($('<li><a id="zxw_hide" href="#">hide all</a></li>'));

    $('#zxw_hide').click(function(event) {
        event.preventDefault();
        hide_buttons = $('#siteTable .title.loggedin').closest('.thing').find('.hide-button a');
        hide_button_index = 0;
        f();
    });
});

function f() {
    if (hide_button_index < hide_buttons.length) {
        var hide_button = hide_buttons[hide_button_index];
        hide_button_index += 1;
        $(hide_button).click();
        
    	setTimeout(f, 500);
    } else {
        pausecomp(3000)
        window.location.reload();
    }
}