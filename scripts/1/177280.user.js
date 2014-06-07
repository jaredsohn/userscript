// ==UserScript==
// @name       Hit enter on Papertrail.
// @namespace  http://www.staugler.net/
// @version    20.0
// @description  When I'm watching logs, I like to hit enter.
// @match      https://papertrailapp.com/*
// @copyright  2013+, Mason Staugler
// ==/UserScript==

function hit_enter(event) {
    if (event.keyCode == 13) {
        $('#event_list').append('<li class="event">&nbsp;</li>');
        window.scrollTo(0, document.body.scrollHeight);
    }
}

document.addEventListener('keyup', hit_enter, false);