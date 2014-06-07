// ==UserScript==
// @name       Papertrail niceties.
// @namespace  http://www.staugler.net/
// @version    20.0
// @description  Hit enter to add blank lines to the event list. Hit delete to toggle the top bar (now hidden by default).
// @match      https://papertrailapp.com/*
// @copyright  2013+, Mason Staugler
// ==/UserScript==

function masons_key_bindings(event) {
    if (event.keyCode == 13) {
        $('#event_list').append('<li class="event">&nbsp;</li>');
        window.scrollTo(0, document.body.scrollHeight);
    } else if (event.keyCode == 46) {
        var hdr = $('#hdr');
        
        if (hdr.css('display') == 'none') {
            hdr.css('display', 'block');
        } else {
            hdr.css('display', 'none');
        }
    }
}

$('#hdr').css('display', 'none');
document.addEventListener('keyup', masons_key_bindings, false);